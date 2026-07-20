import { auth } from "@/lib/auth/config";
import { NextResponse } from "next/server";

const publicPaths = ["/", "/services", "/portfolio", "/pricing", "/process", "/blog", "/contact", "/login", "/register", "/reset-password", "/lab"];
const publicApiPaths = ["/api/blog", "/api/team", "/api/portfolio", "/api/contact"];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  // Public API routes — no auth required
  if (publicApiPaths.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return;
  }

  // Protected API routes — require auth
  if (pathname.startsWith("/api/") && !pathname.startsWith("/api/auth/") && !pathname.startsWith("/api/contact") && !pathname.startsWith("/api/blog") && !pathname.startsWith("/api/team") && !pathname.startsWith("/api/portfolio")) {
    if (!isLoggedIn) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Admin routes — require auth
  if (pathname.startsWith("/admin") && !isLoggedIn) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return Response.redirect(loginUrl);
  }

  // Portal routes — require auth
  if (pathname.startsWith("/portal") && !isLoggedIn) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return Response.redirect(loginUrl);
  }

  // Public marketing pages — allow
  if (publicPaths.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return;
  }
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
