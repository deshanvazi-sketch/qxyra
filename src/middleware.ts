import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionTokenEdge, ADMIN_COOKIE_NAME } from '@/lib/token-utils';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Intercept all /admin routes EXCEPT the login page itself
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const adminToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const session = await verifySessionTokenEdge(adminToken);

    // If no valid cryptographic session token is found, redirect to login portal
    if (!session) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      const response = NextResponse.redirect(loginUrl);
      if (adminToken) {
        response.cookies.delete(ADMIN_COOKIE_NAME);
      }
      return response;
    }
  }

  // If already logged in with a valid cryptographic token and accessing /admin/login, redirect to /admin
  if (pathname === '/admin/login') {
    const adminToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const session = await verifySessionTokenEdge(adminToken);
    if (session) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  const response = NextResponse.next();

  // Attach strong security headers to admin area to prevent clickjacking and inspection
  if (pathname.startsWith('/admin')) {
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
