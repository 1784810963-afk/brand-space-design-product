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

    // Replace current locale in pathname
    const newPathname = pathname.replace(new RegExp(`^/${currentLocale}(/|$)`), `/${newLocale}$1`);

    // Use hard navigation to ensure full re-render with new locale
    window.location.href = newPathname;
  };

  return (
    <motion.button
      onClick={switchLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
      aria-label={currentLocale === 'zh' ? 'Switch to English' : '切换到中文'}
    >
      <span aria-hidden="true">🌐</span>
      <span>{currentLocale === 'zh' ? 'EN' : '中文'}</span>
    </motion.button>
  );
}
