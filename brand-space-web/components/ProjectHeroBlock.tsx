'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/data/projects';
import { getLocalizedValue } from '@/lib/i18n';
import { Locale } from '@/lib/i18n';

interface ProjectHeroBlockProps {
  project: Project;
  index: number;
  imagePosition?: 'left' | 'right';
  locale: Locale;
}

export default function ProjectHeroBlock({
  project,
  index,
  imagePosition = index % 2 === 0 ? 'right' : 'left',
  locale
}: ProjectHeroBlockProps) {
  // 交替背景色
  const bgColor = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';

  // 图片容器
  const ImageContainer = () => (
    <motion.div
      className="relative w-full h-full overflow-hidden rounded-2xl"
      initial={{ opacity: 0, scale: 1.2 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {project.image ? (
        <Image
          src={project.image}
          alt={getLocalizedValue(project.title, locale) as unknown as string}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={false}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
          <div className="text-6xl">📐</div>
        </div>
      )}
    </motion.div>
  );

  // 文案容器
  const ContentContainer = () => (
    <motion.div
      className="flex flex-col justify-center space-y-6"
      initial={{ opacity: 0, x: imagePosition === 'left' ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {/* 分类标签 */}
      <div className="flex items-center gap-3">
        <span className="px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-200">
          {getLocalizedValue(project.category, locale) as unknown as string}
        </span>
        {project.tags && project.tags.slice(0, 2).map((tag, idx) => (
          <span key={idx} className="text-sm text-gray-500">
            {getLocalizedValue(tag, locale) as unknown as string}
          </span>
        ))}
      </div>

      {/* 标题 */}
      <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
        {getLocalizedValue(project.title, locale) as unknown as string}
      </h2>

      {/* 描述 */}
      <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
        {getLocalizedValue(project.description, locale) as unknown as string}
      </p>

      {/* CTA 按钮 */}
      <div className="flex items-center gap-4 pt-4">
        <Link href={`/projects/${project.id}`}>
          <motion.button
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            查看详情
          </motion.button>
        </Link>
        <motion.div
          className="text-gray-500 text-sm font-medium flex items-center gap-2 group cursor-pointer"
          whileHover={{ x: 8 }}
        >
          <span>了解更多</span>
          <span className="group-hover:translate-x-2 transition-transform">→</span>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <section
      className={`${bgColor} flex items-center justify-center min-h-screen py-20`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* 左侧：图片或文案 */}
          {imagePosition === 'left' ? (
            <>
              <ImageContainer />
              <ContentContainer />
            </>
          ) : (
            <>
              <ContentContainer />
              <ImageContainer />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
