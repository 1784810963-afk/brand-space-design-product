import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define i18n config directly to avoid dynamic imports in middleware
const i18n = {
  defaultLocale: 'zh',
  locales: ['zh', 'en'],
} as const;

function getLocale(request: NextRequest): string {
  // Get language from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');

  if (acceptLanguage) {
    // Parse accept-language header (e.g., "en-US,en;q=0.9,zh;q=0.8")
    const languages = acceptLanguage
      .split(',')
      .map(lang => {
        const [code, priority] = lang.split(';q=');
        return {
          code: code.trim().split('-')[0], // Get base language code
          priority: priority ? parseFloat(priority) : 1.0
        };
      })
      .sort((a, b) => b.priority - a.priority);

    // Find first matching locale
    for (const lang of languages) {
      if (i18n.locales.includes(lang.code as any)) {
        return lang.code;
      }
    }
  }

  return i18n.defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if pathname already has a locale
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Detect preferred language
  const locale = getLocale(request);

  // Redirect to /{locale}{pathname}
  return NextResponse.redirect(
    new URL(`/${locale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|logo.png).*)'],
};
