import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LOCALE_COOKIE = 'NEXT_LOCALE';

const i18n = {
  defaultLocale: 'zh',
  locales: ['zh', 'en'],
} as const;

function getLocaleFromAcceptLanguage(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');

  if (acceptLanguage) {
    const languages = acceptLanguage
      .split(',')
      .map(lang => {
        const [code, priority] = lang.split(';q=');
        const parsedPriority = priority ? parseFloat(priority) : 1.0;
        return {
          code: code.trim().split('-')[0],
          priority: isNaN(parsedPriority) ? 0 : parsedPriority
        };
      })
      .sort((a, b) => b.priority - a.priority);

    for (const lang of languages) {
      if (i18n.locales.includes(lang.code as typeof i18n.locales[number])) {
        return lang.code;
      }
    }
  }

  return i18n.defaultLocale;
}

function getLocale(request: NextRequest): string {
  // 1. Cookie has highest priority - respects user's explicit choice
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && i18n.locales.includes(cookieLocale as typeof i18n.locales[number])) {
    return cookieLocale;
  }

  // 2. Fallback to Accept-Language header
  return getLocaleFromAcceptLanguage(request);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Extract the locale from the path and save it to cookie
    const localeInPath = pathname.split('/')[1] as typeof i18n.locales[number];
    const response = NextResponse.next();
    // Update cookie to match the current path locale
    response.cookies.set(LOCALE_COOKIE, localeInPath, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    });
    return response;
  }

  // No locale in path — detect and redirect
  const locale = getLocale(request);

  const response = NextResponse.redirect(
    new URL(`/${locale}${pathname}`, request.url)
  );
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|logo.png|project-images|standards).*)'],
};
