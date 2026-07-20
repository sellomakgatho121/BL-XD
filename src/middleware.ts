import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/", "/services", "/portfolio", "/pricing", "/process", "/blog", "/contact", "/login", "/register", "/reset-password", "/lab"];
const publicApiPaths = ["/api/blog", "/api/team", "/api/portfolio", "/api/contact", "/api/ping"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public paths and static assets
  if (
    publicPaths.some((p) => pathname === p || pathname.startsWith(p + "/")) ||
    publicApiPaths.some((p) => pathname === p || pathname.startsWith(p + "/")) ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/auth/") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/images/")
  ) {
    return NextResponse.next();
  }

  // Check for session cookie to determine auth
  const hasSession = req.cookies.has("next-auth.session-token") ||
                     req.cookies.has("__Secure-next-auth.session-token");

  // Protected API routes
  if (pathname.startsWith("/api/")) {
    if (!hasSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // Admin routes
  if (pathname.startsWith("/admin")) {
    if (!hasSession) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // Portal routes
  if (pathname.startsWith("/portal")) {
    if (!hasSession) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
