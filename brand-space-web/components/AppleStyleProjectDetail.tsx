'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronRight, MapPin, Ruler, Calendar, ArrowLeft, ChevronLeft, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Project } from '@/data/projects';

interface AppleStyleProjectDetailProps {
  project: Project;
}

export default function AppleStyleProjectDetail({ project }: AppleStyleProjectDetailProps) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  // 获取项目的所有图片
  const allImages = project.images || (project.image ? [project.image] : []);

  // 横向展示的图片（使用所有图片）
  const horizontalShowcaseImages = allImages;

  // 项目图册的图片（剩余的或全部）
  const galleryImages = allImages;

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % horizontalShowcaseImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + horizontalShowcaseImages.length) % horizontalShowcaseImages.length);
  };

  // 打开轮播模态框
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  // 切换到下一张图片
  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % allImages.length);
  };

  // 切换到上一张图片
  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // 键盘导航
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextLightboxImage();
    if (e.key === 'ArrowLeft') prevLightboxImage();
    if (e.key === 'Escape') setIsLightboxOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 返回按钮 */}
      <motion.button
        onClick={() => router.back()}
        className="fixed top-20 left-4 z-40 md:top-20 md:left-8 p-2 rounded-full bg-white border border-slate-200 hover:bg-slate-50 transition"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowLeft className="w-5 h-5 text-slate-900" />
      </motion.button>

      {/* Hero 英雄区 - 满屏 */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-50">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={allImages[0] || project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        {/* Hero 文案 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-light text-white mb-6 tracking-tight">
            {project.title}
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
            {project.description}
          </p>
        </motion.div>

        {/* 向下滚动指示器 */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 z-10"
        >
          <div className="text-white/50 text-xs">向下滚动</div>
          <div className="h-6 border-l border-white/30 flex justify-center">
            <div className="w-0.5 h-2 bg-white/50" />
          </div>
        </motion.div>
      </section>

      {/* 案例介绍部分 */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* 项目信息卡片 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light mb-12 text-slate-900">
              项目信息
            </h2>

            {/* 信息卡片网格 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* 面积卡片 */}
              {project.area && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="border-t border-slate-200 pt-6"
                >
                  <div className="flex items-start gap-4">
                    <Ruler className="w-5 h-5 text-slate-900 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-slate-500 mb-1">展示面积</p>
                      <p className="text-2xl font-light text-slate-900">{project.area}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 位置卡片 */}
              {project.location && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="border-t border-slate-200 pt-6"
                >
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-slate-900 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-slate-500 mb-1">项目位置</p>
                      <p className="text-2xl font-light text-slate-900">{project.location}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 周期卡片 */}
              {project.buildingTime && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="border-t border-slate-200 pt-6"
                >
                  <div className="flex items-start gap-4">
                    <Calendar className="w-5 h-5 text-slate-900 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-slate-500 mb-1">时间</p>
                      <p className="text-2xl font-light text-slate-900">{project.buildingTime}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* 完整方案介绍 */}
            {project.details && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="border-t border-slate-200 pt-12"
              >
                <h3 className="text-2xl font-light mb-6 text-slate-900">
                  方案介绍
                </h3>
                <div className="space-y-6">
                  {project.details.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-lg text-slate-600 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* 项目图册 */}
      {galleryImages.length > 0 && (
        <section className="py-20 px-4 md:px-8 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-light mb-12 text-slate-900"
            >
              项目图册
            </motion.h2>

            {/* 图片网格 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
                  viewport={{ once: true }}
                  onClick={() => openLightbox(index)}
                  className="relative h-64 md:h-72 rounded-lg overflow-hidden bg-slate-200 hover:shadow-lg transition-shadow cursor-pointer group"
                >
                  <Image
                    src={image}
                    alt={`项目图片 ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    quality={80}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA 按钮区域 */}
      <section className="py-24 px-4 md:px-8 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-8 text-slate-900">
            浏览更多项目
          </h2>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors cursor-pointer"
          >
            查看其他项目
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      {/* 图片轮播模态框 */}
      {isLightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setIsLightboxOpen(false)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* 关闭按钮 */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 z-60 text-white hover:text-gray-300 transition"
          >
            <X size={32} />
          </button>

          {/* 左箭头 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevLightboxImage();
            }}
            className="absolute left-4 z-60 text-white hover:text-gray-300 transition"
          >
            <ChevronLeft size={48} />
          </button>

          {/* 右箭头 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextLightboxImage();
            }}
            className="absolute right-4 z-60 text-white hover:text-gray-300 transition"
          >
            <ChevronRight size={48} />
          </button>

          {/* 图片容器 */}
          <motion.div
            key={lightboxIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-7xl max-h-[90vh] w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={allImages[lightboxIndex]}
              alt={`${project.title} - 图片 ${lightboxIndex + 1}`}
              width={1920}
              height={1080}
              className="w-full h-auto max-h-[90vh] object-contain"
            />
          </motion.div>

          {/* 图片计数器 */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
            {lightboxIndex + 1} / {allImages.length}
          </div>
        </motion.div>
      )}

      {/* Footer Spacer */}
      <div className="h-20" />
    </div>
  );
}
