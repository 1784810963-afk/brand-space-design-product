'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Locale } from '@/lib/i18n';

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();

  const switchLanguage = () => {
    const newLocale = currentLocale === 'zh' ? 'en' : 'zh';
    const newPathname = pathname.replace(new RegExp(`^/${currentLocale}(/|$)`), `/${newLocale}$1`);
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    window.location.href = newPathname;
  };

  return (
    <motion.button
      onClick={switchLanguage}
      whileHover={{ opacity: 0.7 }}
      whileTap={{ scale: 0.97 }}
      className="text-sm font-medium text-[#1d1d1f] hover:text-[#6e6e73] transition-colors"
      aria-label={currentLocale === 'zh' ? 'Switch to English' : '切换到中文'}
    >
      {currentLocale === 'zh' ? 'EN' : '中文'}
    </motion.button>
  );
}
