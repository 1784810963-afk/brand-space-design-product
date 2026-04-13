'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Locale } from '@/lib/i18n';

interface HeroProps {
  locale: Locale;
  backgroundImage: string;
  dict: {
    title: string;
    subtitle: string;
    description: string;
    browseProjects: string;
    viewStandards: string;
  };
}

export default function Hero({ locale, backgroundImage, dict }: HeroProps) {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景图片 */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={backgroundImage}
          alt=""
          className="w-full h-full object-cover"
        />
        {/* 深色遮罩 - 让文字可读 */}
        <div className="absolute inset-0 bg-black/55" />
        {/* 底部渐变 - 过渡到下方白色内容 */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* 主内容 */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-6"
        >
          {/* 小标签 */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="text-sm font-medium tracking-widest uppercase text-white/70"
          >
            {dict.title}
          </motion.p>

          {/* 主标题 */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.08] tracking-tight whitespace-pre-line"
          >
            {dict.subtitle}
          </motion.h1>

          {/* 副标题 */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.9 }}
            className="text-lg sm:text-xl text-white/75 max-w-xl mx-auto leading-relaxed font-light"
          >
            {dict.description}
          </motion.p>

          {/* 按钮组 */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 justify-center pt-2"
          >
            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center justify-center px-7 py-3 bg-white text-[#1d1d1f] rounded-full text-sm font-medium hover:bg-white/90 transition-colors"
            >
              {dict.browseProjects}
            </Link>
            <Link
              href={`/${locale}/standards`}
              className="inline-flex items-center justify-center px-7 py-3 bg-transparent text-white rounded-full text-sm font-medium border border-white/50 hover:bg-white/10 transition-colors"
            >
              {dict.viewStandards}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* 底部滚动指示 */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/60 to-transparent mx-auto" />
      </motion.div>
    </section>
  );
}
