// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  console.log("🔍 Middleware activé pour :", pathname);

  const publicPaths = ['/', '/login', '/register', '/forgot-password', '/reset-password'];
  const isPublic = publicPaths.some((path) => pathname === path || pathname.startsWith(path + '/'));

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (isPublic && token && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
