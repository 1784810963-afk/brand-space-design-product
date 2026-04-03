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
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img
              src="/logo.png"
              alt="品牌标识"
              width={48}
              height={48}
              className="flex-shrink-0"
            />
          </Link>

          {/* 导航菜单 */}
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
            <div className="ml-4">
              <LanguageSwitcher currentLocale={locale} />
            </div>
          </div>

          {/* 移动端菜单按钮 */}
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
