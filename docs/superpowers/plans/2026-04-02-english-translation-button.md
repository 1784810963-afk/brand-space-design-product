# English Translation Button Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add English translation functionality to the brand space design platform with a language switcher button in the navigation bar.

**Architecture:** Uses Next.js App Router's dynamic `[locale]` routing with dictionary files for translations. Middleware handles language detection and redirects. Components receive locale prop and load appropriate translations.

**Tech Stack:** Next.js 16.1.7, React 19, TypeScript, Framer Motion, Tailwind CSS

---

## File Structure Overview

### New Files to Create
- `lib/i18n.ts` - i18n configuration and dictionary loader
- `middleware.ts` - Language detection and URL rewriting
- `dictionaries/zh.json` - Chinese translations
- `dictionaries/en.json` - English translations
- `components/LanguageSwitcher.tsx` - Language toggle button
- `app/[locale]/layout.tsx` - Locale-specific layout wrapper
- `app/[locale]/page.tsx` - Home page (migrated)
- `app/[locale]/projects/page.tsx` - Projects list (migrated)
- `app/[locale]/projects/[id]/page.tsx` - Project detail (migrated)
- `app/[locale]/standards/page.tsx` - Standards page (migrated)
- `app/[locale]/ai-chat/page.tsx` - AI chat page (migrated)
- `app/[locale]/ai-chat/design-news/page.tsx` - Design news (migrated)
- `app/[locale]/not-found.tsx` - 404 page with i18n
- `app/[locale]/loading.tsx` - Loading state

### Files to Modify
- `components/Navbar.tsx` - Add locale and dict props, integrate LanguageSwitcher
- `components/Hero.tsx` - Accept dict prop for translations
- `components/ProjectCard.tsx` - Accept locale prop
- `data/projects.ts` - Add English fields to project objects
- `data/standards.ts` - Add English fields to standard objects
- `app/layout.tsx` - Minimal modification (root layout)

### Files to Delete (after migration)
- `app/page.tsx` (after moving to `app/[locale]/page.tsx`)
- `app/projects/page.tsx` (after moving to `app/[locale]/projects/page.tsx`)
- `app/projects/[id]/page.tsx` (after moving)
- `app/standards/page.tsx` (after moving)
- `app/ai-chat/page.tsx` (after moving)
- `app/ai-chat/design-news/page.tsx` (after moving)

---

## Task 1: Create i18n Configuration

**Files:**
- Create: `brand-space-web/lib/i18n.ts`

**Purpose:** Define supported locales and provide dictionary loader function.

- [ ] **Step 1: Create i18n configuration file**

Create `brand-space-web/lib/i18n.ts`:

```typescript
export const i18n = {
  defaultLocale: 'zh',
  locales: ['zh', 'en'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

export async function getDictionary(locale: Locale) {
  return import(`@/dictionaries/${locale}.json`).then(
    (module) => module.default
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd brand-space-web && npm run build`
Expected: No TypeScript errors related to i18n.ts

- [ ] **Step 3: Commit**

```bash
git add brand-space-web/lib/i18n.ts
git commit -m "feat: add i18n configuration and dictionary loader

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 2: Create Middleware for Language Detection

**Files:**
- Create: `brand-space-web/middleware.ts`

**Purpose:** Detect user's language preference and redirect to appropriate locale path.

- [ ] **Step 1: Create middleware file**

Create `brand-space-web/middleware.ts`:

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './lib/i18n';

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
```

- [ ] **Step 2: Verify middleware compiles**

Run: `cd brand-space-web && npm run build`
Expected: No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add brand-space-web/middleware.ts
git commit -m "feat: add middleware for language detection and routing

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 3: Create Empty Dictionary Files

**Files:**
- Create: `brand-space-web/dictionaries/zh.json`
- Create: `brand-space-web/dictionaries/en.json`

**Purpose:** Create placeholder dictionary files (will be populated later).

- [ ] **Step 1: Create Chinese dictionary**

Create `brand-space-web/dictionaries/zh.json`:

```json
{
  "nav": {
    "home": "首页",
    "projects": "项目案例",
    "standards": "设计标准",
    "aiChat": "AI 助手"
  }
}
```

- [ ] **Step 2: Create English dictionary**

Create `brand-space-web/dictionaries/en.json`:

```json
{
  "nav": {
    "home": "Home",
    "projects": "Projects",
    "standards": "Standards",
    "aiChat": "AI Assistant"
  }
}
```

- [ ] **Step 3: Test dictionary loading**

Create temporary test file `brand-space-web/test-dict.ts`:

```typescript
import { getDictionary } from './lib/i18n';

async function test() {
  const zhDict = await getDictionary('zh');
  const enDict = await getDictionary('en');
  console.log('ZH:', zhDict.nav.home);
  console.log('EN:', enDict.nav.home);
}

test();
```

Run: `cd brand-space-web && npx tsx test-dict.ts`
Expected output:
```
ZH: 首页
EN: Home
```

- [ ] **Step 4: Delete test file**

```bash
rm brand-space-web/test-dict.ts
```

- [ ] **Step 5: Commit**

```bash
git add brand-space-web/dictionaries/zh.json brand-space-web/dictionaries/en.json
git commit -m "feat: add initial dictionary files for i18n

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 4: Create LanguageSwitcher Component

**Files:**
- Create: `brand-space-web/components/LanguageSwitcher.tsx`

**Purpose:** Button component for toggling between languages.

- [ ] **Step 1: Create LanguageSwitcher component**

Create `brand-space-web/components/LanguageSwitcher.tsx`:

```typescript
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Locale } from '@/lib/i18n';

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLanguage = () => {
    const newLocale = currentLocale === 'zh' ? 'en' : 'zh';

    // Replace current locale in pathname
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);

    router.push(newPathname);
  };

  return (
    <motion.button
      onClick={switchLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
      aria-label={currentLocale === 'zh' ? 'Switch to English' : '切换到中文'}
    >
      <span>🌐</span>
      <span>{currentLocale === 'zh' ? 'EN' : '中文'}</span>
    </motion.button>
  );
}
```

- [ ] **Step 2: Verify component compiles**

Run: `cd brand-space-web && npm run build`
Expected: No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add brand-space-web/components/LanguageSwitcher.tsx
git commit -m "feat: add LanguageSwitcher component for language toggle

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 5: Create Locale Layout Structure

**Files:**
- Create: `brand-space-web/app/[locale]/layout.tsx`

**Purpose:** Locale-specific layout that wraps all localized pages.

- [ ] **Step 1: Create locale layout**

Create `brand-space-web/app/[locale]/layout.tsx`:

```typescript
import { Locale, i18n, getDictionary } from '@/lib/i18n';
import Navbar from '@/components/Navbar';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: Locale;
  };
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: LocaleLayoutProps) {
  const dict = await getDictionary(locale);

  return (
    <>
      <Navbar locale={locale} dict={dict.nav} />
      <div className="pt-16">
        {children}
      </div>
    </>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}
```

- [ ] **Step 2: Verify layout compiles**

Run: `cd brand-space-web && npm run build`
Expected: Build fails with error about Navbar not accepting locale/dict props (expected, will fix later)

- [ ] **Step 3: Commit**

```bash
git add brand-space-web/app/[locale]/layout.tsx
git commit -m "feat: add locale-specific layout structure

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 6: Update Navbar Component

**Files:**
- Modify: `brand-space-web/components/Navbar.tsx`

**Purpose:** Update Navbar to accept locale and dict props, integrate LanguageSwitcher.

- [ ] **Step 1: Read current Navbar implementation**

Run: `cat brand-space-web/components/Navbar.tsx`
(Review current implementation to understand structure)

- [ ] **Step 2: Update Navbar to accept locale and dict**

Replace the entire content of `brand-space-web/components/Navbar.tsx` with:

```typescript
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import { Locale } from '@/lib/i18n';

interface NavbarProps {
  locale: Locale;
  dict: {
    home: string;
    projects: string;
    standards: string;
    aiChat: string;
  };
}

export default function Navbar({ locale, dict }: NavbarProps) {
  const pathname = usePathname();

  const navItems = [
    { label: dict.home, href: `/${locale}` },
    { label: dict.projects, href: `/${locale}/projects` },
    { label: dict.standards, href: `/${locale}/standards` },
    { label: dict.aiChat, href: `/${locale}/ai-chat` }
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200/50 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center hover:opacity-80 transition-opacity">
            <img
              src="/logo.png"
              alt="Logo"
              width={48}
              height={48}
              className="flex-shrink-0"
            />
          </Link>

          {/* Navigation items */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    className={`px-4 py-2 rounded-md relative ${
                      isActive ? 'text-blue-600' : 'text-gray-700 hover:text-gray-900'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                        layoutId="navbar-indicator"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}

            {/* Language Switcher */}
            <div className="ml-4">
              <LanguageSwitcher currentLocale={locale} />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher currentLocale={locale} />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 3: Verify Navbar compiles**

Run: `cd brand-space-web && npm run build`
Expected: Build may still fail if pages haven't been migrated yet, but Navbar itself should have no TypeScript errors

- [ ] **Step 4: Commit**

```bash
git add brand-space-web/components/Navbar.tsx
git commit -m "feat: update Navbar to support i18n and add LanguageSwitcher

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 7: Migrate Home Page

**Files:**
- Create: `brand-space-web/app/[locale]/page.tsx`
- Read: `brand-space-web/app/page.tsx` (current implementation)

**Purpose:** Move home page to locale routing structure.

- [ ] **Step 1: Read current home page**

Run: `cat brand-space-web/app/page.tsx`
(Review current implementation)

- [ ] **Step 2: Create localized home page**

Create `brand-space-web/app/[locale]/page.tsx`:

```typescript
import { Locale, getDictionary } from '@/lib/i18n';
import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';
import { standards } from '@/data/standards';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface HomePageProps {
  params: {
    locale: Locale;
  };
}

export async function generateMetadata({ params: { locale } }: HomePageProps) {
  const dict = await getDictionary(locale);
  return {
    title: dict.nav.home + ' - Brand Space Design Platform',
    description: 'Comprehensive brand space design standards and project showcase',
  };
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  const dict = await getDictionary(locale);
  const representativeProjects = projects.filter(p => p.isRepresentative);

  return (
    <main className="w-full bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Projects Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {locale === 'zh' ? '代表性项目案例' : 'Representative Projects'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {locale === 'zh' ? '精选各类别的代表性项目案例 →' : 'Selected representative project cases from various categories →'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {representativeProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                featured={true}
                locale={locale}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href={`/${locale}/projects`}
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              {locale === 'zh' ? '查看全部项目 →' : 'View All Projects →'}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Standards Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {locale === 'zh' ? '完整的设计标准体系' : 'Complete Design Standards System'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {locale === 'zh'
                ? '9 大模块组成的系统性设计标准，保证项目的一致性和规范性'
                : 'Systematic design standards comprising 9 major modules, ensuring project consistency and standardization'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {standards.map((standard, index) => (
              <motion.div
                key={standard.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl font-bold text-blue-600">
                    {standard.number}
                  </span>
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {standard.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {standard.description}
                </p>
                <div className="text-sm text-gray-500">
                  {standard.content.length} {locale === 'zh' ? '个主要内容' : 'main contents'}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              href={`/${locale}/standards`}
              className="inline-block px-8 py-4 bg-teal-600 text-white rounded-full font-medium hover:bg-teal-700 transition-colors"
            >
              {locale === 'zh' ? '查看完整标准 →' : 'View Complete Standards →'}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {locale === 'zh' ? 'AI 设计助手' : 'AI Design Assistant'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {locale === 'zh'
                ? '智能化的设计咨询和案例获取工具，帮助您快速了解和应用设计标准'
                : 'Intelligent design consultation and case retrieval tool to help you quickly understand and apply design standards'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: '🎯',
                titleZh: '设计趋势分析',
                titleEn: 'Design Trend Analysis',
                descZh: '分析最新的设计趋势和市场动向，为您的项目提供参考',
                descEn: 'Analyze the latest design trends and market dynamics to provide references for your projects'
              },
              {
                icon: '📚',
                titleZh: '设计标准咨询',
                titleEn: 'Design Standards Consultation',
                descZh: '快速查询和解答关于设计标准的各种问题',
                descEn: 'Quickly query and answer various questions about design standards'
              },
              {
                icon: '📂',
                titleZh: '案例获取',
                titleEn: 'Case Retrieval',
                descZh: '智能推荐相关的成功案例和最佳实践',
                descEn: 'Intelligently recommend relevant successful cases and best practices'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="p-8 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {locale === 'zh' ? item.titleZh : item.titleEn}
                </h3>
                <p className="text-gray-600">
                  {locale === 'zh' ? item.descZh : item.descEn}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              href={`/${locale}/ai-chat`}
              className="inline-block px-8 py-4 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors"
            >
              {locale === 'zh' ? '开启 AI 助手 →' : 'Launch AI Assistant →'}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            {locale === 'zh'
              ? '© 2026 品牌空间设计平台. 所有权利保留。'
              : '© 2026 Brand Space Design Platform. All rights reserved.'}
          </p>
        </div>
      </footer>
    </main>
  );
}

export async function generateStaticParams() {
  return [{ locale: 'zh' as const }, { locale: 'en' as const }];
}
```

- [ ] **Step 3: Test dev server**

Run: `cd brand-space-web && npm run dev`
Visit: http://localhost:3000
Expected: Middleware redirects to /zh/ or /en/ based on browser language

- [ ] **Step 4: Delete old home page**

```bash
rm brand-space-web/app/page.tsx
```

- [ ] **Step 5: Commit**

```bash
git add brand-space-web/app/[locale]/page.tsx
git add brand-space-web/app/page.tsx
git commit -m "feat: migrate home page to locale routing

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 8: Update ProjectCard Component

**Files:**
- Modify: `brand-space-web/components/ProjectCard.tsx`

**Purpose:** Add locale prop to display localized content.

- [ ] **Step 1: Read current ProjectCard**

Run: `cat brand-space-web/components/ProjectCard.tsx`

- [ ] **Step 2: Add locale prop to ProjectCard interface**

Modify `brand-space-web/components/ProjectCard.tsx` - find the interface and add locale:

```typescript
import { Locale } from '@/lib/i18n';

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    category: string;
    location: string;
    area: string;
    description: string;
    coverImage: string;
    tags: string[];
    year: number;
    isRepresentative?: boolean;
  };
  index: number;
  featured?: boolean;
  locale: Locale;  // ADD THIS
}
```

- [ ] **Step 3: Update Link to include locale**

Find the Link component in ProjectCard and update href:

```typescript
<Link
  href={`/${locale}/projects/${project.id}`}  // Changed from /projects/${project.id}
  className="block group"
>
```

- [ ] **Step 4: Verify component compiles**

Run: `cd brand-space-web && npm run build`
Expected: No TypeScript errors

- [ ] **Step 5: Commit**

```bash
git add brand-space-web/components/ProjectCard.tsx
git commit -m "feat: add locale support to ProjectCard component

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 9: Migrate Projects List Page

**Files:**
- Create: `brand-space-web/app/[locale]/projects/page.tsx`

**Purpose:** Move projects list page to locale routing.

- [ ] **Step 1: Create projects directory**

```bash
mkdir -p brand-space-web/app/[locale]/projects
```

- [ ] **Step 2: Create localized projects page**

Create `brand-space-web/app/[locale]/projects/page.tsx`:

```typescript
import { Locale, getDictionary } from '@/lib/i18n';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';
import { motion } from 'framer-motion';

interface ProjectsPageProps {
  params: {
    locale: Locale;
  };
}

export async function generateMetadata({ params: { locale } }: ProjectsPageProps) {
  const dict = await getDictionary(locale);
  return {
    title: (locale === 'zh' ? '项目案例' : 'Projects') + ' - Brand Space Design Platform',
    description: locale === 'zh'
      ? '品牌空间设计项目案例展示'
      : 'Brand space design project showcase',
  };
}

export default async function ProjectsPage({ params: { locale } }: ProjectsPageProps) {
  return (
    <main className="w-full bg-white pt-20">
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {locale === 'zh' ? '项目案例' : 'Projects'}
            </h1>
            <p className="text-lg text-gray-600">
              {locale === 'zh'
                ? '探索我们的设计项目作品集'
                : 'Explore our design project portfolio'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  return [{ locale: 'zh' as const }, { locale: 'en' as const }];
}
```

- [ ] **Step 3: Test projects page**

Run: `cd brand-space-web && npm run dev`
Visit: http://localhost:3000/zh/projects
Expected: Projects page displays with Chinese text

Visit: http://localhost:3000/en/projects
Expected: Projects page displays with English text

- [ ] **Step 4: Delete old projects page**

```bash
rm brand-space-web/app/projects/page.tsx
```

- [ ] **Step 5: Commit**

```bash
git add brand-space-web/app/[locale]/projects/page.tsx
git add brand-space-web/app/projects/page.tsx
git commit -m "feat: migrate projects list page to locale routing

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 10: Migrate Project Detail Page

**Files:**
- Create: `brand-space-web/app/[locale]/projects/[id]/page.tsx`

**Purpose:** Move project detail page to locale routing.

- [ ] **Step 1: Create project detail directory**

```bash
mkdir -p brand-space-web/app/[locale]/projects/[id]
```

- [ ] **Step 2: Read current project detail page**

Run: `cat brand-space-web/app/projects/[id]/page.tsx`

- [ ] **Step 3: Create localized project detail page**

Create `brand-space-web/app/[locale]/projects/[id]/page.tsx`:

```typescript
import { notFound } from 'next/navigation';
import { Locale, getDictionary } from '@/lib/i18n';
import { projects } from '@/data/projects';
import AppleStyleProjectDetail from '@/components/AppleStyleProjectDetail';

interface ProjectDetailPageProps {
  params: {
    locale: Locale;
    id: string;
  };
}

export async function generateMetadata({ params: { locale, id } }: ProjectDetailPageProps) {
  const project = projects.find(p => p.id === id);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title + ' - Brand Space Design Platform',
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params: { locale, id }
}: ProjectDetailPageProps) {
  const project = projects.find(p => p.id === id);

  if (!project) {
    notFound();
  }

  return <AppleStyleProjectDetail project={project} locale={locale} />;
}

export async function generateStaticParams() {
  const params = [];

  for (const locale of ['zh', 'en'] as const) {
    for (const project of projects) {
      params.push({
        locale,
        id: project.id,
      });
    }
  }

  return params;
}
```

- [ ] **Step 4: Update AppleStyleProjectDetail component**

Modify `brand-space-web/components/AppleStyleProjectDetail.tsx` to accept locale prop:

Find the interface and add:
```typescript
import { Locale } from '@/lib/i18n';

interface AppleStyleProjectDetailProps {
  project: Project;
  locale: Locale;  // ADD THIS
}
```

Update the "返回列表" button to use locale:
```typescript
<Link
  href={`/${locale}/projects`}  // Changed from /projects
  className="..."
>
```

- [ ] **Step 5: Test project detail page**

Run: `cd brand-space-web && npm run dev`
Visit: http://localhost:3000/zh/projects/megahome-2025
Expected: Project detail page displays

- [ ] **Step 6: Delete old project detail page**

```bash
rm -r brand-space-web/app/projects
```

- [ ] **Step 7: Commit**

```bash
git add brand-space-web/app/[locale]/projects/[id]/page.tsx
git add brand-space-web/components/AppleStyleProjectDetail.tsx
git add brand-space-web/app/projects
git commit -m "feat: migrate project detail page to locale routing

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 11: Migrate Standards Page

**Files:**
- Create: `brand-space-web/app/[locale]/standards/page.tsx`

**Purpose:** Move standards page to locale routing.

- [ ] **Step 1: Create standards directory**

```bash
mkdir -p brand-space-web/app/[locale]/standards
```

- [ ] **Step 2: Read current standards page**

Run: `cat brand-space-web/app/standards/page.tsx`

- [ ] **Step 3: Create localized standards page**

Create `brand-space-web/app/[locale]/standards/page.tsx`:

```typescript
import { Locale, getDictionary } from '@/lib/i18n';
import { standards } from '@/data/standards';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface StandardsPageProps {
  params: {
    locale: Locale;
  };
}

export async function generateMetadata({ params: { locale } }: StandardsPageProps) {
  return {
    title: (locale === 'zh' ? '设计标准' : 'Design Standards') + ' - Brand Space Design Platform',
    description: locale === 'zh'
      ? '完整的品牌空间设计标准体系'
      : 'Complete brand space design standards system',
  };
}

export default async function StandardsPage({ params: { locale } }: StandardsPageProps) {
  return (
    <main className="w-full bg-white pt-20">
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {locale === 'zh' ? '设计标准体系' : 'Design Standards System'}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {locale === 'zh'
                ? '9 大模块组成的系统性设计标准，保证项目的一致性和规范性'
                : 'Systematic design standards comprising 9 major modules, ensuring project consistency and standardization'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {standards.map((standard, index) => (
              <motion.div
                key={standard.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-xl transition-all duration-300 border border-gray-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl font-bold text-blue-600">
                    {standard.number}
                  </span>
                  <span className="text-3xl">📋</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {standard.title}
                </h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {standard.description}
                </p>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-700">
                    {locale === 'zh' ? '包含内容：' : 'Contents:'}
                  </h4>
                  <ul className="space-y-1">
                    {standard.content.map((item, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link
              href={`/${locale}`}
              className="inline-block px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              {locale === 'zh' ? '返回首页' : 'Back to Home'}
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  return [{ locale: 'zh' as const }, { locale: 'en' as const }];
}
```

- [ ] **Step 4: Test standards page**

Run: `cd brand-space-web && npm run dev`
Visit: http://localhost:3000/zh/standards
Expected: Standards page displays in Chinese

- [ ] **Step 5: Delete old standards page**

```bash
rm -r brand-space-web/app/standards
```

- [ ] **Step 6: Commit**

```bash
git add brand-space-web/app/[locale]/standards/page.tsx
git add brand-space-web/app/standards
git commit -m "feat: migrate standards page to locale routing

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 12: Migrate AI Chat Pages

**Files:**
- Create: `brand-space-web/app/[locale]/ai-chat/page.tsx`
- Create: `brand-space-web/app/[locale]/ai-chat/design-news/page.tsx`

**Purpose:** Move AI chat pages to locale routing.

- [ ] **Step 1: Create ai-chat directories**

```bash
mkdir -p brand-space-web/app/[locale]/ai-chat/design-news
```

- [ ] **Step 2: Create localized AI chat main page**

Create `brand-space-web/app/[locale]/ai-chat/page.tsx`:

```typescript
import { Locale, getDictionary } from '@/lib/i18n';
import Link from 'next/link';

interface AIChatPageProps {
  params: {
    locale: Locale;
  };
}

export async function generateMetadata({ params: { locale } }: AIChatPageProps) {
  return {
    title: (locale === 'zh' ? 'AI 助手' : 'AI Assistant') + ' - Brand Space Design Platform',
    description: locale === 'zh'
      ? 'AI 驱动的设计咨询和案例获取工具'
      : 'AI-driven design consultation and case retrieval tool',
  };
}

export default async function AIChatPage({ params: { locale } }: AIChatPageProps) {
  return (
    <main className="w-full min-h-screen bg-white pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          {locale === 'zh' ? 'AI 设计助手' : 'AI Design Assistant'}
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          {locale === 'zh'
            ? '智能化的设计咨询和案例获取工具'
            : 'Intelligent design consultation and case retrieval tool'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href={`/${locale}/ai-chat/design-news`}
            className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-lg transition-all duration-300 border border-blue-200"
          >
            <div className="text-4xl mb-4">📰</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {locale === 'zh' ? '设计资讯' : 'Design News'}
            </h3>
            <p className="text-gray-600">
              {locale === 'zh'
                ? '获取最新的设计趋势和行业资讯'
                : 'Get the latest design trends and industry news'}
            </p>
          </Link>

          <div className="p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 opacity-50 cursor-not-allowed">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {locale === 'zh' ? 'AI 对话' : 'AI Chat'}
            </h3>
            <p className="text-gray-600">
              {locale === 'zh' ? '即将推出' : 'Coming Soon'}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return [{ locale: 'zh' as const }, { locale: 'en' as const }];
}
```

- [ ] **Step 3: Create localized design news page**

Create `brand-space-web/app/[locale]/ai-chat/design-news/page.tsx`:

Copy the entire content from `brand-space-web/app/ai-chat/design-news/page.tsx` and modify:

1. Add locale to interface:
```typescript
interface DesignNewsPageProps {
  params: {
    locale: Locale;
  };
}
```

2. Update all text to check locale:
```typescript
<h1>{locale === 'zh' ? '设计资讯' : 'Design News'}</h1>
```

3. Add generateMetadata and generateStaticParams as in previous tasks

- [ ] **Step 4: Test AI chat pages**

Run: `cd brand-space-web && npm run dev`
Visit: http://localhost:3000/zh/ai-chat
Visit: http://localhost:3000/zh/ai-chat/design-news

- [ ] **Step 5: Delete old AI chat pages**

```bash
rm -r brand-space-web/app/ai-chat
```

- [ ] **Step 6: Commit**

```bash
git add brand-space-web/app/[locale]/ai-chat/
git add brand-space-web/app/ai-chat
git commit -m "feat: migrate AI chat pages to locale routing

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 13: Add 404 and Loading Pages

**Files:**
- Create: `brand-space-web/app/[locale]/not-found.tsx`
- Create: `brand-space-web/app/[locale]/loading.tsx`

**Purpose:** Provide localized 404 and loading states.

- [ ] **Step 1: Create 404 page**

Create `brand-space-web/app/[locale]/not-found.tsx`:

```typescript
import { Locale } from '@/lib/i18n';
import Link from 'next/link';

export default function NotFound() {
  // Note: We can't get locale from params in not-found.tsx
  // Using Chinese as default with English fallback
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          页面未找到 / Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          您访问的页面不存在 / The page you're looking for doesn't exist
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/zh"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            返回首页
          </Link>
          <Link
            href="/en"
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create loading page**

Create `brand-space-web/app/[locale]/loading.tsx`:

```typescript
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">加载中 / Loading...</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Test 404 page**

Run: `cd brand-space-web && npm run dev`
Visit: http://localhost:3000/zh/nonexistent
Expected: 404 page displays with bilingual content

- [ ] **Step 4: Commit**

```bash
git add brand-space-web/app/[locale]/not-found.tsx brand-space-web/app/[locale]/loading.tsx
git commit -m "feat: add localized 404 and loading pages

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 14: Populate Complete Dictionary Files

**Files:**
- Modify: `brand-space-web/dictionaries/zh.json`
- Modify: `brand-space-web/dictionaries/en.json`

**Purpose:** Add all UI text translations to dictionary files.

- [ ] **Step 1: Update Chinese dictionary**

Replace entire content of `brand-space-web/dictionaries/zh.json` with:

```json
{
  "nav": {
    "home": "首页",
    "projects": "项目案例",
    "standards": "设计标准",
    "aiChat": "AI 助手"
  },
  "meta": {
    "title": "品牌空间设计平台 - 完整的设计标准体系展示",
    "description": "展示品牌空间设计标准、落地项目案例和 AI 驱动的设计助手"
  },
  "home": {
    "hero": {
      "tag": "品牌空间设计平台",
      "title": "品牌设计空间产品",
      "titleHighlight": "标准体系",
      "subtitle": "全面展示设计标准、落地项目案例以及 AI 驱动的设计助手",
      "ctaPrimary": "浏览项目案例",
      "ctaSecondary": "查看设计标准"
    },
    "projects": {
      "title": "代表性项目案例",
      "subtitle": "精选各类别的代表性项目案例 →",
      "viewAll": "查看全部项目 →"
    },
    "standards": {
      "title": "完整的设计标准体系",
      "subtitle": "9 大模块组成的系统性设计标准，保证项目的一致性和规范性",
      "itemCount": "个主要内容",
      "viewAll": "查看完整标准 →"
    },
    "aiAssistant": {
      "title": "AI 设计助手",
      "subtitle": "智能化的设计咨询和案例获取工具，帮助您快速了解和应用设计标准",
      "cta": "开启 AI 助手 →"
    }
  },
  "projects": {
    "title": "项目案例",
    "subtitle": "探索我们的设计项目作品集",
    "viewDetail": "查看详情",
    "backToList": "返回列表"
  },
  "standards": {
    "title": "设计标准体系",
    "subtitle": "9 大模块组成的系统性设计标准，保证项目的一致性和规范性",
    "contents": "包含内容："
  },
  "aiChat": {
    "title": "AI 设计助手",
    "subtitle": "智能化的设计咨询和案例获取工具",
    "designNews": "设计资讯",
    "designNewsDesc": "获取最新的设计趋势和行业资讯",
    "chat": "AI 对话",
    "comingSoon": "即将推出"
  },
  "common": {
    "backToHome": "返回首页",
    "loading": "加载中...",
    "notFound": "页面未找到",
    "notFoundDesc": "您访问的页面不存在"
  },
  "footer": {
    "copyright": "© 2026 品牌空间设计平台. 所有权利保留。"
  }
}
```

- [ ] **Step 2: Update English dictionary**

Replace entire content of `brand-space-web/dictionaries/en.json` with:

```json
{
  "nav": {
    "home": "Home",
    "projects": "Projects",
    "standards": "Standards",
    "aiChat": "AI Assistant"
  },
  "meta": {
    "title": "Brand Space Design Platform - Complete Design Standards System",
    "description": "Showcasing brand space design standards, implemented project cases, and AI-driven design assistant"
  },
  "home": {
    "hero": {
      "tag": "Brand Space Design Platform",
      "title": "Brand Design Space Product",
      "titleHighlight": "Standards System",
      "subtitle": "Comprehensive showcase of design standards, implemented project cases, and AI-driven design assistant",
      "ctaPrimary": "Browse Projects",
      "ctaSecondary": "View Standards"
    },
    "projects": {
      "title": "Representative Projects",
      "subtitle": "Selected representative project cases from various categories →",
      "viewAll": "View All Projects →"
    },
    "standards": {
      "title": "Complete Design Standards System",
      "subtitle": "Systematic design standards comprising 9 major modules, ensuring project consistency and standardization",
      "itemCount": "main contents",
      "viewAll": "View Complete Standards →"
    },
    "aiAssistant": {
      "title": "AI Design Assistant",
      "subtitle": "Intelligent design consultation and case retrieval tool to help you quickly understand and apply design standards",
      "cta": "Launch AI Assistant →"
    }
  },
  "projects": {
    "title": "Projects",
    "subtitle": "Explore our design project portfolio",
    "viewDetail": "View Details",
    "backToList": "Back to List"
  },
  "standards": {
    "title": "Design Standards System",
    "subtitle": "Systematic design standards comprising 9 major modules, ensuring project consistency and standardization",
    "contents": "Contents:"
  },
  "aiChat": {
    "title": "AI Design Assistant",
    "subtitle": "Intelligent design consultation and case retrieval tool",
    "designNews": "Design News",
    "designNewsDesc": "Get the latest design trends and industry news",
    "chat": "AI Chat",
    "comingSoon": "Coming Soon"
  },
  "common": {
    "backToHome": "Back to Home",
    "loading": "Loading...",
    "notFound": "Page Not Found",
    "notFoundDesc": "The page you're looking for doesn't exist"
  },
  "footer": {
    "copyright": "© 2026 Brand Space Design Platform. All rights reserved."
  }
}
```

- [ ] **Step 3: Test dictionary loading**

Run: `cd brand-space-web && npm run dev`
Visit both language versions and verify all text displays correctly

- [ ] **Step 4: Commit**

```bash
git add brand-space-web/dictionaries/zh.json brand-space-web/dictionaries/en.json
git commit -m "feat: populate complete translation dictionaries

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 15: Add English Fields to Projects Data

**Files:**
- Modify: `brand-space-web/data/projects.ts`

**Purpose:** Add English translations for all project content.

- [ ] **Step 1: Read current projects data**

Run: `cat brand-space-web/data/projects.ts`

- [ ] **Step 2: Update Project interface**

Find the Project interface and add English fields:

```typescript
export interface Project {
  id: string;
  title: string;
  titleEn: string;
  category: string;
  categoryEn: string;
  location: string;
  locationEn?: string;
  area: string;
  description: string;
  descriptionEn: string;
  coverImage: string;
  images: string[];
  tags: string[];
  tagsEn: string[];
  year: number;
  isRepresentative?: boolean;
  highlights?: string[];
  highlightsEn?: string[];
}
```

- [ ] **Step 3: Add English fields to all projects**

For each project in the projects array, add English translations. Example for first project:

```typescript
{
  id: 'megahome-2025',
  title: '麦加美家零售空间',
  titleEn: 'MEGAHOME Retail Space',
  category: '零售空间',
  categoryEn: 'Retail Space',
  location: '中国·深圳',
  locationEn: 'Shenzhen, China',
  area: '2000㎡',
  description: '现代简约风格的家居零售空间，强调产品展示和用户体验。通过开放式布局和精心设计的动线，创造舒适的购物环境。',
  descriptionEn: 'Modern minimalist home retail space emphasizing product display and user experience. Creating a comfortable shopping environment through open layout and carefully designed circulation.',
  coverImage: '/projects/megahome/cover.jpg',
  images: [
    '/projects/megahome/1.jpg',
    '/projects/megahome/2.jpg',
    '/projects/megahome/3.jpg'
  ],
  tags: ['零售', '家居', '现代', '简约'],
  tagsEn: ['Retail', 'Home', 'Modern', 'Minimalist'],
  year: 2025,
  isRepresentative: true,
  highlights: [
    '开放式产品展示区',
    '自然采光设计',
    '舒适的客户休息区'
  ],
  highlightsEn: [
    'Open product display area',
    'Natural lighting design',
    'Comfortable customer lounge'
  ]
}
```

Repeat this pattern for all projects in the array.

- [ ] **Step 4: Verify TypeScript compiles**

Run: `cd brand-space-web && npm run build`
Expected: No TypeScript errors

- [ ] **Step 5: Commit**

```bash
git add brand-space-web/data/projects.ts
git commit -m "feat: add English translations to project data

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 16: Add English Fields to Standards Data

**Files:**
- Modify: `brand-space-web/data/standards.ts`

**Purpose:** Add English translations for all standards content.

- [ ] **Step 1: Read current standards data**

Run: `cat brand-space-web/data/standards.ts`

- [ ] **Step 2: Update Standard interface**

Find the Standard interface and add English fields:

```typescript
export interface Standard {
  id: string;
  number: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  content: string[];
  contentEn: string[];
}
```

- [ ] **Step 3: Add English fields to all standards**

For each standard in the standards array, add English translations. Example:

```typescript
{
  id: 'brand-identity',
  number: '01',
  title: '品牌标识系统',
  titleEn: 'Brand Identity System',
  description: '品牌视觉识别的核心要素和应用规范',
  descriptionEn: 'Core elements and application guidelines for brand visual identity',
  content: [
    'Logo 设计规范',
    '色彩系统',
    '字体系统',
    '图形元素',
    '应用指南'
  ],
  contentEn: [
    'Logo Design Guidelines',
    'Color System',
    'Typography System',
    'Graphic Elements',
    'Application Guide'
  ]
}
```

Repeat for all standards.

- [ ] **Step 4: Verify TypeScript compiles**

Run: `cd brand-space-web && npm run build`
Expected: No TypeScript errors

- [ ] **Step 5: Commit**

```bash
git add brand-space-web/data/standards.ts
git commit -m "feat: add English translations to standards data

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 17: Update Components to Use Localized Data

**Files:**
- Modify: `brand-space-web/components/ProjectCard.tsx`
- Modify: `brand-space-web/components/AppleStyleProjectDetail.tsx`

**Purpose:** Update components to display appropriate language based on locale.

- [ ] **Step 1: Update ProjectCard to use localized fields**

Modify `brand-space-web/components/ProjectCard.tsx`:

Find where project fields are used and update:

```typescript
// Change from:
<h3>{project.title}</h3>
<p>{project.description}</p>

// To:
<h3>{locale === 'en' && project.titleEn ? project.titleEn : project.title}</h3>
<p>{locale === 'en' && project.descriptionEn ? project.descriptionEn : project.description}</p>

// For tags:
{(locale === 'en' && project.tagsEn ? project.tagsEn : project.tags).map(tag => (
  <span key={tag}>{tag}</span>
))}
```

- [ ] **Step 2: Update AppleStyleProjectDetail**

Modify `brand-space-web/components/AppleStyleProjectDetail.tsx`:

Apply same pattern for all displayed fields:
- title / titleEn
- description / descriptionEn
- category / categoryEn
- location / locationEn
- tags / tagsEn
- highlights / highlightsEn

- [ ] **Step 3: Test localized content**

Run: `cd brand-space-web && npm run dev`
Visit project pages in both languages and verify content displays correctly

- [ ] **Step 4: Commit**

```bash
git add brand-space-web/components/ProjectCard.tsx brand-space-web/components/AppleStyleProjectDetail.tsx
git commit -m "feat: update components to display localized project data

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 18: Add SEO Metadata with hreflang

**Files:**
- Modify: `brand-space-web/app/[locale]/layout.tsx`

**Purpose:** Add proper SEO tags including hreflang for language alternatives.

- [ ] **Step 1: Update locale layout with SEO metadata**

Modify `brand-space-web/app/[locale]/layout.tsx`:

```typescript
import { Locale, i18n, getDictionary } from '@/lib/i18n';
import Navbar from '@/components/Navbar';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: Locale;
  };
}

export async function generateMetadata({ params: { locale } }: LocaleLayoutProps) {
  const dict = await getDictionary(locale);

  return {
    title: {
      default: dict.meta.title,
      template: '%s - Brand Space Design Platform',
    },
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'zh': '/zh',
        'en': '/en',
        'x-default': '/zh',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: LocaleLayoutProps) {
  const dict = await getDictionary(locale);

  return (
    <html lang={locale}>
      <body>
        <Navbar locale={locale} dict={dict.nav} />
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}
```

- [ ] **Step 2: Verify metadata in build**

Run: `cd brand-space-web && npm run build`
Expected: Build completes successfully

- [ ] **Step 3: Check generated HTML**

Run: `cd brand-space-web && npm run build && npm run start`
Visit: http://localhost:3000/zh
View page source and verify:
- `<html lang="zh">`
- `<link rel="alternate" hreflang="en" ...>`
- `<link rel="alternate" hreflang="zh" ...>`

- [ ] **Step 4: Commit**

```bash
git add brand-space-web/app/[locale]/layout.tsx
git commit -m "feat: add SEO metadata with hreflang tags

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 19: Update Root Layout

**Files:**
- Modify: `brand-space-web/app/layout.tsx`

**Purpose:** Simplify root layout since Navbar moved to locale layout.

- [ ] **Step 1: Update root layout**

Modify `brand-space-web/app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brand Space Design Platform",
  description: "Complete design standards system showcase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `cd brand-space-web && npm run build`
Expected: Build completes successfully

- [ ] **Step 3: Commit**

```bash
git add brand-space-web/app/layout.tsx
git commit -m "refactor: simplify root layout after locale migration

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 20: Final Testing and Verification

**Purpose:** Comprehensive testing of all functionality.

- [ ] **Step 1: Build production bundle**

Run: `cd brand-space-web && npm run build`
Expected: Build completes with no errors

- [ ] **Step 2: Test Chinese version**

Run: `cd brand-space-web && npm run start`

Test these URLs:
- http://localhost:3000/ (redirects to /zh/)
- http://localhost:3000/zh/ (home page)
- http://localhost:3000/zh/projects (projects list)
- http://localhost:3000/zh/projects/megahome-2025 (project detail)
- http://localhost:3000/zh/standards (standards)
- http://localhost:3000/zh/ai-chat (AI chat)

Verify:
- All text is in Chinese
- Navigation works
- Language switcher shows "🌐 EN"
- Clicking language switcher navigates to /en/

- [ ] **Step 3: Test English version**

Test these URLs:
- http://localhost:3000/en/ (home page)
- http://localhost:3000/en/projects
- http://localhost:3000/en/projects/megahome-2025
- http://localhost:3000/en/standards
- http://localhost:3000/en/ai-chat

Verify:
- All text is in English
- Navigation works
- Language switcher shows "🌐 中文"
- Clicking language switcher navigates to /zh/

- [ ] **Step 4: Test language switching**

From each page, click the language switcher and verify:
- URL changes from /zh/* to /en/* (or vice versa)
- Page reloads with correct language
- User stays on the same page (e.g., /zh/projects → /en/projects)

- [ ] **Step 5: Test 404 page**

Visit: http://localhost:3000/zh/nonexistent
Visit: http://localhost:3000/en/nonexistent
Verify: 404 page displays with bilingual content

- [ ] **Step 6: Test browser language detection**

Clear browser cache and cookies
Set browser language to English
Visit: http://localhost:3000/
Expected: Redirects to /en/

Set browser language to Chinese
Visit: http://localhost:3000/
Expected: Redirects to /zh/

- [ ] **Step 7: Verify SEO metadata**

View page source for /zh/ and /en/
Verify presence of:
- `<html lang="zh">` or `<html lang="en">`
- `<link rel="alternate" hreflang="zh" ...>`
- `<link rel="alternate" hreflang="en" ...>`
- `<link rel="alternate" hreflang="x-default" ...>`

- [ ] **Step 8: Test mobile responsiveness**

Open Chrome DevTools
Toggle device toolbar (mobile view)
Test language switcher visibility and functionality on mobile

- [ ] **Step 9: Document any issues**

If any issues found, create separate commits to fix them before final commit.

- [ ] **Step 10: Final commit**

```bash
git add -A
git commit -m "test: complete English translation feature testing

All functionality verified:
- Language switching works correctly
- All pages display in both languages
- SEO metadata properly configured
- Browser language detection functional
- Mobile responsive

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Self-Review Checklist

Before marking this plan complete, verify:

**Spec Coverage:**
- [ ] i18n configuration created (Task 1)
- [ ] Middleware for language detection (Task 2)
- [ ] Dictionary files populated (Tasks 3, 14)
- [ ] LanguageSwitcher component (Task 4)
- [ ] All pages migrated to [locale] routing (Tasks 5-12)
- [ ] Components updated for i18n (Tasks 6, 8, 17)
- [ ] SEO metadata with hreflang (Task 18)
- [ ] Data translated (Tasks 15, 16)
- [ ] 404 and loading pages (Task 13)
- [ ] Testing completed (Task 20)

**Placeholders:**
- [ ] No "TBD" or "TODO" in any task
- [ ] All code blocks contain actual code
- [ ] All commands have expected outputs
- [ ] No "similar to Task N" without showing code

**Type Consistency:**
- [ ] Locale type used consistently across all files
- [ ] getDictionary function signature matches usage
- [ ] Project and Standard interfaces match component usage
- [ ] All component prop interfaces are consistent

**File Paths:**
- [ ] All paths start with `brand-space-web/`
- [ ] All paths use forward slashes
- [ ] No relative paths (../) used

---

## Execution Complete

Implementation plan saved. All tasks are ready for execution following TDD principles where applicable, with frequent commits and comprehensive testing.
