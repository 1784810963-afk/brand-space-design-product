'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { projects } from '@/data/projects';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const projectId = params.id as string;
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <p className="text-xl text-gray-500">项目未找到</p>
        </div>
      </div>
    );
  }

  const projectImages = project.images || [project.image];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* 英雄区块 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-96 md:h-[500px] overflow-hidden bg-gradient-to-b from-gray-100 to-white"
      >
        <img
          src={projectImages[selectedImage]}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10 flex items-end">
          <div className="w-full px-6 md:px-12 pb-12 text-white">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              {project.title}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl opacity-90"
            >
              {project.description}
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* 项目详情内容 */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        {/* 基本信息 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 pb-12 border-b border-gray-200"
        >
          {project.area && (
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-2">项目面积</span>
              <span className="text-2xl font-bold text-blue-600">{project.area}</span>
            </div>
          )}
          {project.location && (
            <div className="flex flex-col md:col-span-2">
              <span className="text-sm text-gray-500 mb-2">项目位置</span>
              <span className="text-base text-gray-800">{project.location}</span>
            </div>
          )}
          {project.buildingTime && (
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-2">建设周期</span>
              <span className="text-base text-gray-800">{project.buildingTime}</span>
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 mb-2">项目分类</span>
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium w-fit">
              {project.category}
            </span>
          </div>
        </motion.div>

        {/* 项目描述 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-12 pb-12 border-b border-gray-200"
        >
          <h2 className="text-2xl font-bold mb-6">项目介绍</h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            {project.details}
          </p>
        </motion.div>

        {/* 项目亮点 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-12 pb-12 border-b border-gray-200"
        >
          <h2 className="text-2xl font-bold mb-6">项目亮点</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg"
              >
                <p className="text-gray-800 font-semibold text-center">{highlight}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 标签 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-12 pb-12 border-b border-gray-200"
        >
          <h2 className="text-2xl font-bold mb-6">标签</h2>
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-300 transition"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* 图片库 */}
        {projectImages.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6">项目图片</h2>

            {/* 主图 */}
            <div className="mb-6 rounded-lg overflow-hidden bg-gray-100">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={projectImages[selectedImage]}
                alt={`${project.title} - 图片 ${selectedImage + 1}`}
                className="w-full h-auto max-h-96 object-cover"
              />
            </div>

            {/* 缩略图列表 */}
            {projectImages.length > 1 && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {projectImages.map((img, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedImage(index)}
                    className={`relative rounded-lg overflow-hidden h-24 transition ${
                      selectedImage === index ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <img
                      src={img}
                      alt={`缩略图 ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className={`absolute inset-0 ${
                        selectedImage === index ? 'bg-blue-500/20' : 'bg-black/0'
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* 返回按钮 */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() => router.back()}
          className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          返回列表
        </motion.button>
      </div>

      {/* 页脚 */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-6 md:px-12 text-center text-gray-600">
          <p>© 2025 品牌空间设计体系. 所有权利保留。</p>
        </div>
      </footer>
    </div>
  );
}
