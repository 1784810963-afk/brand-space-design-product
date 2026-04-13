'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project } from '@/data/projects';
import { Locale, getLocalizedValue } from '@/lib/i18n';

interface ProjectCardProps {
  project: Project;
  index?: number;
  featured?: boolean;
  locale: Locale;
  viewDetailsText: string;
}

export default function ProjectCard({ project, index = 0, locale, viewDetailsText }: ProjectCardProps) {
  return (
    <Link href={`/${locale}/projects/${project.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08, duration: 0.5 }}
        viewport={{ once: true }}
        whileHover={{ y: -4 }}
        className="group bg-white rounded-2xl overflow-hidden border border-[#d2d2d7] hover:border-[#86868b] hover:shadow-xl transition-all duration-300"
      >
        {/* 图片区 - 在上方 */}
        <div className="overflow-hidden aspect-video bg-[#f5f5f7]">
          {project.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image}
              alt={getLocalizedValue(project.title, locale) as unknown as string}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="w-full h-full bg-[#f5f5f7]" />
          )}
        </div>

        {/* 文字区 - 在下方 */}
        <div className="p-6">
          {/* 分类 */}
          <p className="text-xs font-medium tracking-widest uppercase text-[#86868b] mb-2">
            {getLocalizedValue(project.category, locale) as unknown as string}
          </p>

          {/* 标题 */}
          <h3 className="text-base font-semibold text-[#1d1d1f] mb-2 leading-snug group-hover:text-[#3a3a3c] transition-colors line-clamp-2">
            {getLocalizedValue(project.title, locale) as unknown as string}
          </h3>

          {/* 标签 */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0, 3).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-2.5 py-0.5 bg-[#f5f5f7] text-[#6e6e73] rounded-full text-xs"
              >
                {getLocalizedValue(tag, locale) as unknown as string}
              </span>
            ))}
          </div>

          {/* 查看详情 */}
          <div className="flex items-center gap-1.5 text-sm font-medium text-[#1d1d1f] group-hover:text-[#6e6e73] transition-colors">
            <span>{viewDetailsText}</span>
            <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
