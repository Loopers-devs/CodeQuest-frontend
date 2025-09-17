

import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard', '/admin'];

// Helper para quitar el prefijo de idioma
function getPathWithoutLocale(pathname: string) {
  const match = pathname.match(/^\/[a-zA-Z]{2}(\/.*|$)/);
  if (match) {
    return pathname.replace(/^\/[a-zA-Z]{2}/, '') || '/';
  }
  return pathname;
}

// Unifica validación y refresco de sesión y gestiona la cookie
async function validateOrRefreshSession(request: NextRequest, accessToken?: string) {
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (accessToken) {
      headers['Cookie'] = `refresh=${accessToken}`;
    }

    const resp = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3000/api'}/auth/refresh`, {
      method: 'POST',
      headers,
      credentials: 'include',
    });

    const setCookie = resp.headers.get('set-cookie');
    return { valid: resp.ok, setCookie };
  } catch {
    return { valid: false, setCookie: null };
  }
}



export async function middleware(request: NextRequest) {
  const intlResponse = createIntlMiddleware(routing)(request);
  const { pathname } = request.nextUrl;
  const shortPath = getPathWithoutLocale(pathname);
  const isAuthRoute = shortPath.startsWith('/auth');
  const refreshToken = request.cookies.get('refresh')?.value;

  const isProtected = protectedRoutes.some(route => shortPath.startsWith(route));

  // Unifica validación y refresco de sesión
  let sessionValid = true;
  let setCookie: string | null = null;
  if (refreshToken || isProtected) {
    const result = await validateOrRefreshSession(request, refreshToken);

    sessionValid = result.valid;
    setCookie = result.setCookie;
    if (!sessionValid) {
      // Solo borra la cookie access si la sesión es inválida
      const url = request.nextUrl.clone();
      url.pathname = pathname.replace(/(\/[a-zA-Z]{2})\/.*/, '$1/auth/login');
      const response = NextResponse.redirect(url);
      response.cookies.set('access', '', { maxAge: 0, path: '/' });
      response.cookies.set('refresh', '', { maxAge: 0, path: '/' });
      return response;
    }
  }

  // Si está autenticado y va a /auth, redirige a /dashboard (con idioma)
  if (isAuthRoute && refreshToken && sessionValid) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/\/auth.*/, '/dashboard');
    return NextResponse.redirect(url);
  }

  // Si se refrescó la sesión y hay nuevas cookies, establecerlas en la respuesta
  const response = intlResponse || NextResponse.next();
  if (setCookie) {
    // Puede venir como string separado por coma o como array
    const cookiesArr = Array.isArray(setCookie) ? setCookie : setCookie.split(/,(?=\s*\w+=)/);
    for (const cookieStr of cookiesArr) {
      // Extrae nombre y valor de la cookie
      const cookieMatch = cookieStr.match(/^(\w+)=([^;]+);/);
      if (cookieMatch) {
        const name = cookieMatch[1];
        const value = cookieMatch[2];
        response.cookies.set(name, value, { path: '/' });
      }
    }
  }
  return response;
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};