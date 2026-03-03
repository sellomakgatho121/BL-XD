import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  // First check Supabase auth for portal/admin routes
  if (request.nextUrl.pathname.startsWith('/portal') || request.nextUrl.pathname.startsWith('/admin')) {
    return await updateSession(request);
  }

  // Check if password protection is enabled
  const isPasswordProtected = process.env.NEXT_PUBLIC_PASSWORD_PROTECTED === 'true';
  const sitePassword = process.env.SITE_PASSWORD || 'blacklight2026';

  if (!isPasswordProtected) {
    return NextResponse.next();
  }

  // Check for password in cookie
  const passwordCookie = request.cookies.get('site_access')?.value;
  
  // If password is correct, allow access
  if (passwordCookie === sitePassword) {
    return NextResponse.next();
  }

  // Check if this is the password entry page or auth API
  const url = request.nextUrl.clone();
  if (
    url.pathname === '/auth' || 
    url.pathname === '/api/auth' ||
    url.pathname.startsWith('/_next') || 
    url.pathname.startsWith('/api/auth')
  ) {
    return NextResponse.next();
  }

  // Redirect to password page
  url.pathname = '/auth';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    '/portal/:path*',
    '/admin/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
