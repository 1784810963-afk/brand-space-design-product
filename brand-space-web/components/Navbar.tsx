'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import SearchModal from './SearchModal';
import { Locale } from '@/lib/i18n';

interface NavbarProps {
  locale: Locale;
  dict: {
    home: string;
    projects: string;
    standards: string;
    search: {
      placeholder: string;
      projectsSection: string;
      standardsSection: string;
      noResults: string;
      close: string;
    };
  };
}

export default function Navbar({ locale, dict }: NavbarProps) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems = [
    { label: dict.home, href: `/${locale}` },
    { label: dict.projects, href: `/${locale}/projects` },
    { label: dict.standards, href: `/${locale}/standards` }
  ];

  return (
    <>
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl border-b border-[#d2d2d7]/60 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center hover:opacity-75 transition-opacity">
              <img
                src="/logo.png"
                alt="Brand Space"
                width={36}
                height={36}
                className="flex-shrink-0"
              />
            </Link>

            {/* 导航菜单 */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative text-sm font-medium transition-colors ${
                      isActive ? 'text-[#1d1d1f]' : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-[1px] left-0 right-0 h-[1.5px] bg-[#1d1d1f]"
                        layoutId="navbar-indicator"
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* 右侧工具区 */}
            <div className="hidden md:flex items-center gap-6">
              <motion.button
                whileHover={{ opacity: 0.7 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSearchOpen(true)}
                className="text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
                aria-label="搜索"
              >
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </motion.button>
              <LanguageSwitcher currentLocale={locale} />
            </div>

            {/* 移动端 */}
            <div className="md:hidden flex items-center gap-4">
              <motion.button
                whileHover={{ opacity: 0.7 }}
                onClick={() => setSearchOpen(true)}
                className="text-[#6e6e73]"
                aria-label="搜索"
              >
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </motion.button>
              <LanguageSwitcher currentLocale={locale} />
            </div>
          </div>
        </div>
      </nav>

      {searchOpen && (
        <SearchModal
          locale={locale}
          dict={dict.search}
          onClose={() => setSearchOpen(false)}
        />
      )}
    </>
  );
}
