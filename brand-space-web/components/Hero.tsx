'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeroProps {
  dict: {
    title: string;
    subtitle: string;
    description: string;
  };
}

export default function Hero({ dict }: HeroProps) {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'zh';

  return (
    <section className="relative w-full h-screen bg-white flex items-center justify-center overflow-hidden">
      {/* 背景渐变 - Apple风格 */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white" />

      {/* 背景装饰层 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 蓝色渐变圆形 */}
        <motion.div
          className="absolute -top-32 -right-48 w-96 h-96 bg-gradient-to-b from-blue-300/10 via-blue-200/5 to-transparent rounded-full blur-3xl"
          style={{ willChange: 'transform' }}
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* 紫色渐变圆形 */}
        <motion.div
          className="absolute -bottom-48 -left-48 w-96 h-96 bg-gradient-to-t from-indigo-300/8 via-indigo-200/3 to-transparent rounded-full blur-3xl"
          style={{ willChange: 'transform' }}
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* 细网格 */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* 主内容 */}
      <div className="relative z-10 w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* 标签 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-block"
          >
            <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              {dict.title}
            </span>
          </motion.div>

          {/* 主标题 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
          >
            {dict.subtitle}
          </motion.h1>

          {/* 副标题 */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            {dict.description}
          </motion.p>

          {/* 按钮组 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href={`/${locale}/projects`}
              className="group px-8 py-4 bg-blue-600 text-white rounded-full font-medium text-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
            >
              {locale === 'zh' ? '浏览项目案例' : 'Browse Projects'}
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link
              href={`/${locale}/standards`}
              className="group px-8 py-4 bg-gray-100 text-gray-900 rounded-full font-medium text-lg transition-all duration-300 hover:bg-gray-200"
            >
              {locale === 'zh' ? '查看设计标准' : 'View Standards'}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* 底部滚动指示 */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-gray-400 rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
}
