import "server-only";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { store } from "@/lib/db/store";

// Ensure seed
import "@/lib/db/store";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const password = credentials.password as string;

        // Demo credentials for now
        if (email === "sellomakgatho121@gmail.com" && password === "Ph@r@0h777") {
          const profile = Array.from(store.profiles.values()).find(
            (p) => p.email === email
          );
          if (profile) {
            return {
              id: profile.id,
              email: profile.email,
              name: profile.fullName,
              role: profile.role,
            };
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.userId;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});
