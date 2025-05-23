// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  console.log("🔍 Middleware activé pour :", pathname);

  // ✅ Liste des routes publiques
  const publicPaths = ['/', '/login', '/register', '/forgot-password', '/reset-password'];

  // On vérifie si la route actuelle est dans la liste
  const isPublic = publicPaths.some((path) => pathname === path || pathname.startsWith(path + '/'));

  // Si ce n’est pas une page publique et que l’utilisateur n’a pas de token => rediriger
  if (!isPublic && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // ✅ Applique le middleware à toutes les routes sauf les fichiers statiques
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
