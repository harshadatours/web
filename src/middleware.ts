import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isLoginRoute = request.nextUrl.pathname === '/admin/login';
  
  if (isAdminRoute && !isLoginRoute) {
    const adminToken = request.cookies.get('admin_token');
    
    if (!adminToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Allow authenticated users to bypass login page if already logged in
  if (isLoginRoute) {
    const adminToken = request.cookies.get('admin_token');
    if (adminToken) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
