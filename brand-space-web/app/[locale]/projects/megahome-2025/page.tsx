'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronRight, MapPin, Ruler, Calendar } from 'lucide-react';

interface TimelineItem {
  phase: string;
  duration: string;
  description: string;
}

const timelineItems: TimelineItem[] = [
  { phase: '概念设计', duration: '第 1-5 天', description: '"飞屋环游季" 主题构思与视觉规划' },
  { phase: '创意制作', duration: '第 6-15 天', description: '设计方案细化、物料采购、内容制作' },
  { phase: '生产制造', duration: '第 16-20 天', description: '展台结构搭建、材料加工、质量检测' },
  { phase: '现场布置', duration: '第 21-22 天', description: '运输安装、灯光调试、最终验收' },
];

const cityEvents = [
  { city: '北京', location: '蓝色港湾', date: '2025年春' },
  { city: '上海', location: '武康路', date: '2025年初夏' },
  { city: '深圳', location: '万象天地', date: '2025年夏' },
  { city: '青岛', location: '万象城', date: '2025年夏末' },
];

const galleryImages = [
  { id: 1, src: '/project-images/2f175aab-8e37-4e18-8ed3-65b965996223.jpg', alt: '北京蓝色港湾展区' },
  { id: 2, src: '/project-images/8164c2fb-09b7-4a09-8be7-ed6fac28c94c.jpg', alt: '展台主体结构' },
  { id: 3, src: '/project-images/daa9681c-f19e-4ddc-88a3-8bbd56e3b83d.jpg', alt: '创意装置细节' },
  { id: 4, src: '/project-images/074211ad-947f-42a3-9ecd-8ad92bb3a442.jpg', alt: '灯光效果展示' },
  { id: 5, src: '/project-images/b14c75c8-060e-4ac1-a90f-63a41d967866.jpg', alt: '空间布局' },
  { id: 6, src: '/project-images/35d2e2df-31cc-4cc8-89cd-5a74a9442798.jpg', alt: '互动区域' },
  { id: 7, src: '/project-images/0d266c9f-8c43-4739-a710-e65fe7028e99.jpg', alt: '品牌展示' },
  { id: 8, src: '/project-images/84bf1abb-a218-4d25-a22e-fcde51d643f6.jpg', alt: '落地效果' },
  { id: 9, src: '/project-images/0cf19814-b277-4b75-8226-7617264c34b1.jpg', alt: '细节设计' },
  { id: 10, src: '/project-images/763ef566-c2fe-4f65-8f66-d55309f32afb.jpg', alt: '整体呈现' },
  { id: 11, src: '/project-images/5e66bfeb-d2c9-4498-8f78-e9bb8a805af3.jpg', alt: '夜间效果' },
  { id: 12, src: '/project-images/7443d81d-ed18-40f6-9bfe-218839da8efe.jpg', alt: '访客体验' },
];

export default function MegaHome2025Page() {
  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);
  const [activeCity, setActiveCity] = useState(0);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Navigation Spacer */}
      <div className="h-16" />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/project-images/2f175aab-8e37-4e18-8ed3-65b965996223.jpg"
            alt="2025款双旗舰巡展"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
            <span className="text-white text-sm font-medium">2025 理想同学环游季</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-light text-white mb-6 tracking-tight">
            飞屋
            <br />
            <span className="font-extralight">环游季</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
            一场跨越四城的创意巡展。理想同学化身"飞屋"，带着生活灵感与朋友相聚，在物理世界中开启初次远行。
          </p>

          <motion.a
            href="#details"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-slate-900 rounded-full font-medium cursor-pointer transition-all hover:shadow-xl"
          >
            探索项目
            <ChevronRight className="w-4 h-4" />
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
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

      {/* Details Section */}
      <section id="details" className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-slate-900 dark:text-white">
              项目概览
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              2025 款双旗舰巡展以"理想同学环游季"为主题，打造一场贯穿四座城市的创意体验。通过"飞屋"装置，连接北京、上海、深圳、青岛四地，为用户呈现生活灵感与品牌故事的完美融合。
            </p>
          </div>

          {/* Key Specs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="border-t border-slate-200 dark:border-slate-700 pt-6"
            >
              <div className="flex items-start gap-4">
                <Ruler className="w-5 h-5 text-slate-900 dark:text-white flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">展示面积</p>
                  <p className="text-2xl font-light text-slate-900 dark:text-white">150 ㎡</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="border-t border-slate-200 dark:border-slate-700 pt-6"
            >
              <div className="flex items-start gap-4">
                <Calendar className="w-5 h-5 text-slate-900 dark:text-white flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">建设周期</p>
                  <p className="text-2xl font-light text-slate-900 dark:text-white">22 天</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">制作 20 天 + 搭建 2 天</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="border-t border-slate-200 dark:border-slate-700 pt-6"
            >
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-slate-900 dark:text-white flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">巡展城市</p>
                  <p className="text-2xl font-light text-slate-900 dark:text-white">4 座</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Cities Section */}
      <section className="py-20 px-4 md:px-8 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light mb-16 text-slate-900 dark:text-white"
          >
            环游四城
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cityEvents.map((event, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setActiveCity(index)}
                className={`p-6 rounded-lg border-2 transition-all cursor-pointer ${
                  activeCity === index
                    ? 'border-slate-900 dark:border-white bg-white dark:bg-slate-900'
                    : 'border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:border-slate-400 dark:hover:border-slate-600'
                }`}
              >
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">城市站点</p>
                <p className="text-2xl font-light text-slate-900 dark:text-white mb-3">{event.city}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{event.location}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">{event.date}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-light mb-16 text-slate-900 dark:text-white"
        >
          制作时间线
        </motion.h2>

        <div className="space-y-8">
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-8"
            >
              {/* Timeline dot */}
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-slate-900 dark:bg-white mt-2" />
                {index !== timelineItems.length - 1 && (
                  <div className="w-0.5 h-20 bg-slate-200 dark:bg-slate-700 mt-2" />
                )}
              </div>

              {/* Content */}
              <div className="pb-8">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                  {item.duration}
                </p>
                <h3 className="text-xl font-light text-slate-900 dark:text-white mb-2">
                  {item.phase}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 md:px-8 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light mb-12 text-slate-900 dark:text-white"
          >
            项目图集
          </motion.h2>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8 rounded-lg overflow-hidden"
          >
            <div className="relative w-full h-96 md:h-[600px]">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-cover"
                quality={90}
              />
            </div>
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {galleryImages.map((image, index) => (
              <motion.button
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: (index % 6) * 0.05 }}
                viewport={{ once: true }}
                onClick={() => setSelectedImage(image)}
                className={`relative h-24 md:h-32 rounded-lg overflow-hidden cursor-pointer transition-all ${
                  selectedImage.id === image.id
                    ? 'ring-2 ring-slate-900 dark:ring-white scale-105'
                    : 'hover:scale-105'
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  quality={75}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Concept Section */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-light mb-8 text-slate-900 dark:text-white">
            创意概念
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-light text-slate-900 dark:text-white mb-4">
                理想同学环游季
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                本次巡展以"理想同学环游季"为主题，理想同学化身"飞屋"，承载着生活灵感与品牌故事，在物理世界中开启初次远行。飞屋连接北京、上海、深圳、青岛四座城市，不断延申"家"的边界，在每座城市学习当地生活灵感，结识更多朋友。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              >
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">核心理念</p>
                <p className="text-slate-700 dark:text-slate-300">
                  通过创意装置，展现理想同学品牌对"家的边界延申"的诠释，让访客在沉浸式体验中感受品牌温度。
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              >
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">体验设计</p>
                <p className="text-slate-700 dark:text-slate-300">
                  集设计、互动、光影于一体，为每个城市的访客打造独特的品牌接触点，强化品牌认知与忠诚度。
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              >
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">社群价值</p>
                <p className="text-slate-700 dark:text-slate-300">
                  打造线下社交体验，连接理想同学与用户，在虚拟与现实的融合中扩展品牌影响力。
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 md:px-8 bg-slate-900 dark:bg-slate-950 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            想要了解更多？
          </h2>
          <p className="text-lg text-white/70 mb-10">
            我们很乐意为您分享更多关于这次巡展的设计理念与执行细节。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-slate-900 rounded-full font-medium cursor-pointer"
            >
              获取完整案例
            </motion.button>
            <Link
              href="/projects"
              className="px-8 py-3 border border-white/30 text-white rounded-full font-medium cursor-pointer hover:bg-white/10 transition-colors"
            >
              查看其他项目
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer Spacer */}
      <div className="h-20" />
    </div>
  );
}
