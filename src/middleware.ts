import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Intercept all /admin routes EXCEPT the login page itself
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const adminSessionCookie = request.cookies.get('qxyra_admin_session');

    // If no valid session cookie is found, redirect immediately to login portal
    if (!adminSessionCookie?.value) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If already logged in and accessing /admin/login, redirect to /admin dashboard
  if (pathname === '/admin/login') {
    const adminSessionCookie = request.cookies.get('qxyra_admin_session');
    if (adminSessionCookie?.value) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
