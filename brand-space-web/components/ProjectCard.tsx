'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index?: number;
  featured?: boolean; // 首页代表性项目的大卡片样式，使用图片背景+文字覆盖设计
}

export default function ProjectCard({ project, index = 0, featured = false }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        className={`group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 border border-gray-100 ${
          featured ? 'min-h-96' : 'h-64'
        }`}
      >
        {/* 图片背景 - 绝对定位填充整个卡片 */}
        <div className="absolute inset-0 w-full h-full">
          {project.image ? (
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-gray-100 to-gray-50 flex items-center justify-center">
              <div className="text-gray-300 text-4xl">📐</div>
            </div>
          )}
        </div>

        {/* 渐变覆盖层 - 从下方透明渐变到黑色，保证文字可读性 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

        {/* 文字内容 - 叠加在图片和渐变层上方 */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8">
          {/* 分类标签 */}
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
              {project.category}
            </span>
          </div>

          {/* 内容区域 - 靠下方 */}
          <div className="flex flex-col space-y-3">
            {/* 标题 */}
            <h3 className={`font-bold text-white group-hover:text-blue-300 transition-colors ${
              featured ? 'text-xl md:text-2xl line-clamp-2' : 'text-sm line-clamp-2'
            }`}>
              {project.title}
            </h3>

            {/* 标签 - 关键词 */}
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, featured ? 3 : 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-white/20 text-white rounded text-xs backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* 查看详情链接 */}
            <div className="pt-2 flex items-center gap-2 text-blue-300 font-medium text-sm group-hover:gap-3 transition-all">
              查看详情
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
