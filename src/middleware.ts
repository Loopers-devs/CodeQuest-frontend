import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard', '/admin'];

// Helper para quitar el prefijo de idioma
function getPathWithoutLocale(pathname: string) {
  // Asume que el idioma siempre es un prefijo de dos letras después del slash
  // Ejemplo: /es/dashboard -> /dashboard
  const match = pathname.match(/^\/[a-zA-Z]{2}(\/.*|$)/);
  if (match) {
    return pathname.replace(/^\/[a-zA-Z]{2}/, '') || '/';
  }
  return pathname;
}

export function middleware(request: NextRequest) {
  const intlResponse = createIntlMiddleware(routing)(request);

  const { pathname } = request.nextUrl;
  const shortPath = getPathWithoutLocale(pathname);
  const isAuthRoute = shortPath.startsWith('/auth');
  const accessToken = request.cookies.get('access')?.value;

  // 1. Si está autenticado y va a /auth, redirige a /dashboard (con idioma)
  if (isAuthRoute && accessToken) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/\/auth.*/, '/dashboard'); // /es/auth/login -> /es/dashboard
    return NextResponse.redirect(url);
  }

  // 2. Si va a una ruta protegida sin sesión, redirige a /auth/login (con idioma)
  const isProtected = protectedRoutes.some(route => shortPath.startsWith(route));
  if (isProtected && !accessToken) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/(\/[a-zA-Z]{2})\/.*/, '$1/auth/login'); // /es/profile -> /es/auth/login
    return NextResponse.redirect(url);
  }

  if (intlResponse) return intlResponse;
  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};