# English Translation Button Design Specification

**Date:** 2026-04-02
**Project:** Brand Space Design Platform
**Feature:** English Translation Button and Internationalization System

## Executive Summary

This specification outlines the design and implementation of an English translation feature for the brand space design platform. The solution uses Next.js App Router's internationalization capabilities to provide a seamless bilingual experience with optimal SEO and maintainability.

## Requirements

### User Requirements
- Add a translation button to switch the website between Chinese and English
- All pages should be translatable (Home, Projects, Standards, AI Chat)
- Professional translation quality suitable for a design portfolio website
- SEO-friendly implementation for international discoverability

### Design Decisions Made

Through collaborative brainstorming with visual mockups, the following decisions were finalized:

1. **Button Position:** Navigation bar right side
2. **Button Style:** Solid blue button with globe icon (🌐 EN / 🌐 中文)
3. **Translation Mechanism:** Language version switching (page refresh with pre-translated content)
4. **URL Structure:** Path prefix approach (`/zh/` and `/en/`)
5. **Translation Scope:** All pages including Home, Projects, Standards, and AI Chat
6. **Implementation Approach:** Next.js App Router with dynamic locale routing and dictionary files

## Architecture Overview

### System Architecture

```
┌─────────────────────────────────────────────────────┐
│                    User Browser                      │
│  URL: /zh/projects  or  /en/projects                │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│                  Middleware.ts                       │
│  - Detect browser language preference                │
│  - Redirect to appropriate locale                    │
│  - Handle missing locale in URL                      │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│            App Router: [locale]/page.tsx             │
│  - Receive locale parameter from URL                 │
│  - Load appropriate dictionary                       │
│  - Render with localized content                     │
└─────────────────────┬───────────────────────────────┘
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
┌──────────────────┐    ┌──────────────────┐
│ dictionaries/    │    │  data/           │
│ - zh.json        │    │  - projects.ts   │
│ - en.json        │    │  - standards.ts  │
│                  │    │  (with en fields)│
└──────────────────┘    └──────────────────┘
```

## Directory Structure

### New File Structure

```
brand-space-web/
├── app/
│   ├── [locale]/                           # Dynamic locale routing
│   │   ├── layout.tsx                      # Locale-specific layout
│   │   ├── page.tsx                        # Home page
│   │   ├── projects/
│   │   │   ├── page.tsx                    # Projects list
│   │   │   └── [id]/
│   │   │       └── page.tsx                # Project detail
│   │   ├── standards/
│   │   │   └── page.tsx                    # Design standards
│   │   └── ai-chat/
│   │       ├── page.tsx                    # AI assistant
│   │       └── design-news/
│   │           └── page.tsx                # Design news
│   ├── api/                                # API routes (unchanged)
│   ├── layout.tsx                          # Root layout
│   └── globals.css
│
├── middleware.ts                           # NEW: Language detection
│
├── dictionaries/                           # NEW: Translation files
│   ├── zh.json                            # Chinese translations
│   └── en.json                            # English translations
│
├── lib/
│   └── i18n.ts                            # NEW: i18n utilities
│
├── components/
│   ├── Navbar.tsx                         # MODIFIED: Pass locale
│   ├── LanguageSwitcher.tsx               # NEW: Language toggle button
│   ├── Hero.tsx                           # MODIFIED: Accept dict prop
│   ├── ProjectCard.tsx                    # MODIFIED: Accept locale
│   └── ... (other components)
│
└── data/
    ├── projects.ts                        # MODIFIED: Add English fields
    └── standards.ts                       # MODIFIED: Add English fields
```

### Migration from Current Structure

**Current:**
```
app/
├── page.tsx
├── projects/
│   ├── page.tsx
│   └── [id]/page.tsx
├── standards/page.tsx
└── ai-chat/page.tsx
```

**After Migration:**
```
app/
├── [locale]/
│   ├── page.tsx                   # Moved from app/page.tsx
│   ├── projects/
│   │   ├── page.tsx              # Moved from app/projects/page.tsx
│   │   └── [id]/page.tsx         # Moved from app/projects/[id]/page.tsx
│   ├── standards/page.tsx        # Moved from app/standards/page.tsx
│   └── ai-chat/page.tsx          # Moved from app/ai-chat/page.tsx
└── layout.tsx                     # Root layout (modified)
```

## Core Components Design

### 1. i18n Configuration

**File: `lib/i18n.ts`**

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

**Responsibilities:**
- Define supported locales
- Provide type-safe locale types
- Load dictionary files dynamically
- Cache dictionary content (handled by Next.js)

### 2. Middleware for Language Detection

**File: `middleware.ts`**

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './lib/i18n';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if pathname already has a locale
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Detect preferred language from Accept-Language header
  const locale = getLocale(request) || i18n.defaultLocale;

  // Redirect to /{locale}{pathname}
  return NextResponse.redirect(
    new URL(`/${locale}${pathname}`, request.url)
  );
}

function getLocale(request: NextRequest): string | undefined {
  const acceptLanguage = request.headers.get('accept-language');
  // Parse accept-language and return best match
  // Default to 'zh' if no match
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

**Behavior:**
- URLs without locale (e.g., `/projects`) → redirect to `/zh/projects` (or `/en/` based on browser language)
- URLs with locale (e.g., `/zh/projects`) → pass through unchanged
- API routes, static files, and images are excluded from middleware

### 3. Language Switcher Component

**File: `components/LanguageSwitcher.tsx`**

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
    >
      <span>🌐</span>
      <span>{currentLocale === 'zh' ? 'EN' : '中文'}</span>
    </motion.button>
  );
}
```

**Features:**
- Displays appropriate label based on current language
- Smooth hover/tap animations using Framer Motion
- Client-side navigation for instant feedback
- Maintains current page path when switching languages

**Visual Design:**
- Background: Blue (#3b82f6) - matches brand color
- Padding: 8px vertical, 16px horizontal
- Border radius: 8px (rounded corners)
- Font: 14px, medium weight
- Icon: Globe emoji (🌐)
- Hover effect: Darker blue (#1e40af), slight scale increase

### 4. Modified Navbar Component

**File: `components/Navbar.tsx`**

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
            <img src="/logo.png" alt="Logo" width={48} height={48} className="flex-shrink-0" />
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
            {/* Existing mobile menu button */}
          </div>
        </div>
      </div>
    </nav>
  );
}
```

**Changes from Original:**
- Added `locale` and `dict` props
- Navigation links now include locale prefix: `/${locale}/projects`
- Labels come from dictionary instead of hardcoded strings
- LanguageSwitcher added to the right of navigation items
- Mobile view also includes LanguageSwitcher

## Translation Dictionary Structure

### Dictionary Organization

**File: `dictionaries/zh.json`**

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
      "subtitle": "精选各类别的代表性项目案例",
      "viewAll": "查看全部项目"
    },
    "standards": {
      "title": "完整的设计标准体系",
      "subtitle": "9 大模块组成的系统性设计标准，保证项目的一致性和规范性",
      "itemCount": "个主要内容",
      "viewAll": "查看完整标准"
    },
    "aiAssistant": {
      "title": "AI 设计助手",
      "subtitle": "智能化的设计咨询和案例获取工具，帮助您快速了解和应用设计标准",
      "features": {
        "trends": {
          "title": "设计趋势分析",
          "description": "分析最新的设计趋势和市场动向，为您的项目提供参考"
        },
        "consultation": {
          "title": "设计标准咨询",
          "description": "快速查询和解答关于设计标准的各种问题"
        },
        "cases": {
          "title": "案例获取",
          "description": "智能推荐相关的成功案例和最佳实践"
        }
      },
      "cta": "开启 AI 助手"
    }
  },
  "projects": {
    "title": "项目案例",
    "allProjects": "全部项目",
    "representative": "代表性案例",
    "viewDetail": "查看详情",
    "backToList": "返回列表",
    "filters": {
      "all": "全部",
      "retail": "零售",
      "office": "办公",
      "hospitality": "酒店"
    }
  },
  "standards": {
    "title": "设计标准",
    "subtitle": "系统性的设计标准体系",
    "modules": "个模块"
  },
  "aiChat": {
    "title": "AI 设计助手",
    "placeholder": "请输入您的问题...",
    "send": "发送",
    "examples": {
      "title": "试试问我：",
      "items": [
        "最新的零售空间设计趋势是什么？",
        "如何选择合适的品牌色彩？",
        "推荐一些成功的办公空间案例"
      ]
    }
  },
  "footer": {
    "copyright": "© 2026 品牌空间设计平台. 所有权利保留。"
  }
}
```

**File: `dictionaries/en.json`**

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
      "subtitle": "Selected representative project cases from various categories",
      "viewAll": "View All Projects"
    },
    "standards": {
      "title": "Complete Design Standards System",
      "subtitle": "Systematic design standards comprising 9 major modules, ensuring project consistency and standardization",
      "itemCount": "main contents",
      "viewAll": "View Complete Standards"
    },
    "aiAssistant": {
      "title": "AI Design Assistant",
      "subtitle": "Intelligent design consultation and case retrieval tool to help you quickly understand and apply design standards",
      "features": {
        "trends": {
          "title": "Design Trend Analysis",
          "description": "Analyze the latest design trends and market dynamics to provide references for your projects"
        },
        "consultation": {
          "title": "Design Standards Consultation",
          "description": "Quickly query and answer various questions about design standards"
        },
        "cases": {
          "title": "Case Retrieval",
          "description": "Intelligently recommend relevant successful cases and best practices"
        }
      },
      "cta": "Launch AI Assistant"
    }
  },
  "projects": {
    "title": "Projects",
    "allProjects": "All Projects",
    "representative": "Representative Cases",
    "viewDetail": "View Details",
    "backToList": "Back to List",
    "filters": {
      "all": "All",
      "retail": "Retail",
      "office": "Office",
      "hospitality": "Hospitality"
    }
  },
  "standards": {
    "title": "Design Standards",
    "subtitle": "Systematic Design Standards System",
    "modules": "modules"
  },
  "aiChat": {
    "title": "AI Design Assistant",
    "placeholder": "Enter your question...",
    "send": "Send",
    "examples": {
      "title": "Try asking:",
      "items": [
        "What are the latest retail space design trends?",
        "How to choose appropriate brand colors?",
        "Recommend some successful office space cases"
      ]
    }
  },
  "footer": {
    "copyright": "© 2026 Brand Space Design Platform. All rights reserved."
  }
}
```

**Dictionary Structure Principles:**
- Organized by page and feature (hierarchical structure)
- Clear, descriptive keys (avoid abbreviations)
- Consistent naming convention (camelCase for keys)
- All UI text is extracted, no hardcoded strings in components

## Data Content Localization

### Project Data Structure

**File: `data/projects.ts`**

Current structure needs to be extended with English fields:

```typescript
export interface Project {
  id: string;
  title: string;
  titleEn: string;                    // NEW
  category: string;
  categoryEn: string;                 // NEW
  location: string;
  locationEn?: string;                // NEW (optional, some locations don't need translation)
  area: string;
  description: string;
  descriptionEn: string;              // NEW
  coverImage: string;
  images: string[];
  tags: string[];
  tagsEn: string[];                   // NEW
  year: number;
  isRepresentative: boolean;
  highlights?: string[];
  highlightsEn?: string[];            // NEW
}

// Example:
export const projects: Project[] = [
  {
    id: 'megahome-2025',
    title: '麦加美家零售空间',
    titleEn: 'MEGAHOME Retail Space',
    category: '零售空间',
    categoryEn: 'Retail Space',
    location: '中国·深圳',
    locationEn: 'Shenzhen, China',
    area: '2000㎡',
    description: '现代简约风格的家居零售空间，强调产品展示和用户体验',
    descriptionEn: 'Modern minimalist home retail space emphasizing product display and user experience',
    // ... other fields
  },
  // ... more projects
];
```

### Standards Data Structure

**File: `data/standards.ts`**

```typescript
export interface Standard {
  id: string;
  number: string;
  title: string;
  titleEn: string;                    // NEW
  description: string;
  descriptionEn: string;              // NEW
  content: string[];
  contentEn: string[];                // NEW
}

// Example:
export const standards: Standard[] = [
  {
    id: 'brand-identity',
    number: '01',
    title: '品牌标识系统',
    titleEn: 'Brand Identity System',
    description: '品牌视觉识别的核心要素和应用规范',
    descriptionEn: 'Core elements and application guidelines for brand visual identity',
    content: ['Logo 设计规范', '色彩系统', '字体系统'],
    contentEn: ['Logo Design Guidelines', 'Color System', 'Typography System'],
  },
  // ... more standards
];
```

### Component Usage Pattern

Components will receive `locale` and select appropriate field:

```typescript
// In a component:
interface ProjectCardProps {
  project: Project;
  locale: Locale;
}

export default function ProjectCard({ project, locale }: ProjectCardProps) {
  const title = locale === 'en' ? project.titleEn : project.title;
  const description = locale === 'en' ? project.descriptionEn : project.description;

  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
```

## Page Implementation Pattern

### Example: Home Page

**File: `app/[locale]/page.tsx`**

```typescript
import { Locale, getDictionary } from '@/lib/i18n';
import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';
import { standards } from '@/data/standards';

interface HomePageProps {
  params: {
    locale: Locale;
  };
}

export async function generateMetadata({ params: { locale } }: HomePageProps) {
  const dict = await getDictionary(locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  const dict = await getDictionary(locale);
  const representativeProjects = projects.filter(p => p.isRepresentative);

  return (
    <main className="w-full bg-white">
      <Hero dict={dict.home.hero} locale={locale} />

      {/* Projects Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {dict.home.projects.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {dict.home.projects.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {representativeProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                locale={locale}
                index={index}
                featured={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Standards, AI Assistant sections... */}
    </main>
  );
}

// Generate static params for both locales
export async function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }];
}
```

**Key Patterns:**
1. Accept `locale` from route params
2. Load dictionary with `getDictionary(locale)`
3. Pass `dict` and `locale` to child components
4. Use `generateStaticParams` to pre-render both languages
5. Use `generateMetadata` for localized SEO

### Example: Projects List Page

**File: `app/[locale]/projects/page.tsx`**

```typescript
import { Locale, getDictionary } from '@/lib/i18n';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';

interface ProjectsPageProps {
  params: {
    locale: Locale;
  };
}

export async function generateMetadata({ params: { locale } }: ProjectsPageProps) {
  const dict = await getDictionary(locale);
  return {
    title: `${dict.projects.title} - ${dict.meta.title}`,
    description: dict.meta.description,
  };
}

export default async function ProjectsPage({ params: { locale } }: ProjectsPageProps) {
  const dict = await getDictionary(locale);

  return (
    <main className="w-full bg-white pt-20">
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-12">
            {dict.projects.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                locale={locale}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }];
}
```

## SEO and Metadata

### Language Alternate Links

**File: `app/[locale]/layout.tsx`**

```typescript
import { Locale, i18n } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import { getDictionary } from '@/lib/i18n';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: Locale;
  };
}

export default async function LocaleLayout({ children, params: { locale } }: LocaleLayoutProps) {
  const dict = await getDictionary(locale);

  return (
    <html lang={locale}>
      <head>
        {/* Language alternate links for SEO */}
        {/* Replace with actual production domain */}
        <link rel="alternate" hrefLang="zh" href={`${process.env.NEXT_PUBLIC_SITE_URL}/zh`} />
        <link rel="alternate" hrefLang="en" href={`${process.env.NEXT_PUBLIC_SITE_URL}/en`} />
        <link rel="alternate" hrefLang="x-default" href={`${process.env.NEXT_PUBLIC_SITE_URL}/zh`} />
      </head>
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

**Benefits:**
- `hreflang` tags tell search engines about language variants
- `x-default` specifies the default version for unmatched languages
- Prevents duplicate content penalties
- Improves international SEO

### Sitemap Generation

Create a sitemap that includes all language versions:

```xml
<!-- Replace example.com with your actual production domain -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://example.com/zh/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://example.com/en/" />
    <xhtml:link rel="alternate" hreflang="zh" href="https://example.com/zh/" />
  </url>
  <url>
    <loc>https://example.com/en/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://example.com/en/" />
    <xhtml:link rel="alternate" hreflang="zh" href="https://example.com/zh/" />
  </url>
  <!-- Repeat for all pages -->
</urlset>
```

## Error Handling and Edge Cases

### 1. Missing Translations

Create a helper function that falls back to Chinese when English translation is missing:

```typescript
// lib/i18n.ts
export function getTranslation(
  value: string | undefined,
  valueEn: string | undefined,
  locale: Locale
): string {
  if (locale === 'en') {
    return valueEn || `${value} (Translation pending)`;
  }
  return value || '';
}

// Usage:
const title = getTranslation(project.title, project.titleEn, locale);
```

### 2. 404 Page

**File: `app/[locale]/not-found.tsx`**

```typescript
import { Locale, getDictionary } from '@/lib/i18n';
import Link from 'next/link';

interface NotFoundProps {
  params: {
    locale: Locale;
  };
}

export default async function NotFound({ params: { locale } }: NotFoundProps) {
  const dict = await getDictionary(locale);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          {locale === 'zh' ? '页面未找到' : 'Page Not Found'}
        </p>
        <Link
          href={`/${locale}`}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          {locale === 'zh' ? '返回首页' : 'Back to Home'}
        </Link>
      </div>
    </div>
  );
}
```

### 3. Loading States

For pages that load dictionaries asynchronously, provide loading UI:

```typescript
// app/[locale]/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}
```

## Performance Optimization

### 1. Static Generation

Use `generateStaticParams` to pre-render all locale versions at build time:

```typescript
export async function generateStaticParams() {
  const locales = i18n.locales;

  // For dynamic routes like [id], generate all combinations
  const paths = [];
  for (const locale of locales) {
    for (const project of projects) {
      paths.push({ locale, id: project.id });
    }
  }

  return paths;
}
```

**Benefits:**
- Pages are generated at build time
- No server computation needed at runtime
- Fastest possible load times
- Better SEO (fully rendered HTML)

### 2. Dictionary Caching

Next.js automatically caches imported modules, including dictionary files:

```typescript
// lib/i18n.ts
const dictionaries = {
  zh: () => import('@/dictionaries/zh.json').then(m => m.default),
  en: () => import('@/dictionaries/en.json').then(m => m.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();  // Cached by Next.js
};
```

### 3. Code Splitting

Dictionary files are automatically code-split:
- Chinese dictionary only loaded for `/zh/*` pages
- English dictionary only loaded for `/en/*` pages
- Reduces initial bundle size

### 4. Image Optimization

Continue using Next.js Image component for automatic optimization:

```typescript
import Image from 'next/image';

<Image
  src={project.coverImage}
  alt={locale === 'en' ? project.titleEn : project.title}
  width={800}
  height={600}
  className="rounded-lg"
/>
```

## Migration Strategy

To ensure a smooth transition, the implementation will be done in phases:

### Phase 1: Infrastructure Setup (Day 1-2)
**Goal:** Set up the foundation without affecting existing functionality

Tasks:
1. Create `lib/i18n.ts` configuration
2. Create `middleware.ts` for language detection
3. Create empty dictionary files (`dictionaries/zh.json`, `dictionaries/en.json`)
4. Create `LanguageSwitcher` component (not yet integrated)
5. Set up `.gitignore` to include `.superpowers/` directory

**Testing:** Middleware should redirect properly, but no pages exist yet

### Phase 2: Page Migration (Day 3-5)
**Goal:** Move existing pages to `[locale]` structure

Tasks:
1. Create `app/[locale]/layout.tsx`
2. Move `app/page.tsx` → `app/[locale]/page.tsx`
3. Update page to accept `locale` prop and load dictionary
4. Repeat for all other pages:
   - `projects/page.tsx`
   - `projects/[id]/page.tsx`
   - `standards/page.tsx`
   - `ai-chat/page.tsx`
   - `ai-chat/design-news/page.tsx`
5. Delete old page files

**Testing:** Chinese version (`/zh/*`) should work identically to before

### Phase 3: Component Updates (Day 6-7)
**Goal:** Update components to accept `locale` and `dict` props

Tasks:
1. Update `Navbar` to accept `locale` and `dict`
2. Integrate `LanguageSwitcher` into Navbar
3. Update `Hero` to accept `dict`
4. Update `ProjectCard` to accept `locale`
5. Update other components as needed

**Testing:** Components render correctly with dictionary values

### Phase 4: Translation Content (Day 8-12)
**Goal:** Populate dictionary files and data with English translations

Tasks:
1. Extract all UI text to `dictionaries/zh.json`
2. Translate all text to English in `dictionaries/en.json`
3. Add `*En` fields to `projects.ts`
4. Add `*En` fields to `standards.ts`
5. Translate all project and standard content

**Testing:** English version (`/en/*`) displays properly

### Phase 5: SEO and Polish (Day 13-14)
**Goal:** Optimize for search engines and refine user experience

Tasks:
1. Add `hreflang` tags to layouts
2. Generate sitemap with all language versions
3. Add proper meta descriptions for all pages
4. Test language switching on all pages
5. Verify 404 and error pages work in both languages
6. Test mobile responsive design

**Testing:** SEO audit passes, smooth language switching

### Phase 6: Final Testing and Deployment (Day 15)
**Goal:** Comprehensive testing and production deployment

Tasks:
1. Test all pages in both languages
2. Test language switching from every page
3. Test browser language detection
4. Test direct URL access (e.g., `/en/projects`)
5. Verify build process completes without errors
6. Deploy to production

## Testing Checklist

### Functional Testing

- [ ] Middleware redirects `/` to `/zh` (or `/en` based on browser language)
- [ ] Middleware passes through localized URLs unchanged
- [ ] Language switcher appears on all pages
- [ ] Clicking language switcher navigates to correct URL
- [ ] Current language is correctly reflected in switcher label
- [ ] All navigation links include locale prefix
- [ ] All pages render in Chinese when accessing `/zh/*`
- [ ] All pages render in English when accessing `/en/*`
- [ ] Project cards display correct language content
- [ ] Standard cards display correct language content
- [ ] Footer displays correct copyright text
- [ ] 404 page displays in correct language

### SEO Testing

- [ ] Each page has correct `<title>` tag in both languages
- [ ] Each page has correct `<meta description>` in both languages
- [ ] `<html lang>` attribute is set correctly (`zh` or `en`)
- [ ] `hreflang` tags are present and correct
- [ ] Sitemap includes all language versions
- [ ] Google Search Console shows no duplicate content warnings

### Performance Testing

- [ ] Build completes without errors
- [ ] Static generation produces all locale versions
- [ ] Page load time is acceptable (< 3s)
- [ ] Dictionary files are code-split correctly
- [ ] No unnecessary re-renders when switching languages

### Accessibility Testing

- [ ] Language switcher is keyboard accessible
- [ ] Language switcher has proper ARIA labels
- [ ] Screen readers announce language correctly
- [ ] All text meets contrast requirements
- [ ] Focus indicators are visible

### Browser Testing

- [ ] Works in Chrome
- [ ] Works in Safari
- [ ] Works in Firefox
- [ ] Works in Edge
- [ ] Works on iOS Safari
- [ ] Works on Android Chrome

### Mobile Testing

- [ ] Language switcher visible and accessible on mobile
- [ ] Navigation menu includes language switcher
- [ ] All pages are responsive in both languages
- [ ] Touch targets are appropriately sized

## Future Enhancements

### Additional Languages

The architecture supports adding more languages easily:

1. Add new locale to `i18n.locales`: `['zh', 'en', 'ja', 'ko']`
2. Create new dictionary file: `dictionaries/ja.json`
3. Add corresponding fields to data: `titleJa`, `descriptionJa`
4. Run build to generate static pages

### Language Preference Persistence

Add a cookie or localStorage to remember user's language choice:

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  // Check for saved preference first
  const savedLocale = request.cookies.get('preferred-locale')?.value;

  if (savedLocale && i18n.locales.includes(savedLocale)) {
    // Use saved preference
  } else {
    // Fall back to browser language detection
  }
}
```

### Translation Management

For larger scale projects, consider:
- Integration with translation management platforms (e.g., Phrase, Lokalise)
- Automated translation workflows
- Translation memory for consistency

### RTL Language Support

If supporting RTL languages (Arabic, Hebrew) in the future:

```typescript
// lib/i18n.ts
export const i18n = {
  defaultLocale: 'zh',
  locales: ['zh', 'en', 'ar'],
  rtlLocales: ['ar'],
} as const;

// In layout:
<html lang={locale} dir={i18n.rtlLocales.includes(locale) ? 'rtl' : 'ltr'}>
```

## Conclusion

This design provides a robust, maintainable, and SEO-friendly internationalization solution for the brand space design platform. Key benefits:

- **User Experience:** Smooth language switching with minimal page load
- **Maintainability:** Centralized translations, clear separation of concerns
- **Performance:** Static generation, code splitting, caching
- **SEO:** Proper hreflang tags, unique URLs per language
- **Scalability:** Easy to add more languages in the future
- **Developer Experience:** Type-safe locales, clear patterns, idiomatic Next.js

The phased migration approach ensures that the existing Chinese site remains functional throughout the implementation process, minimizing risk and allowing for thorough testing at each stage.
