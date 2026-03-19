'use client';

import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';
import { standards } from '@/data/standards';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  // 过滤代表性项目案例（首页展示）
  const representativeProjects = projects.filter(p => p.isRepresentative);

  return (
    <main className="w-full bg-white">
      {/* 英雄区块 */}
      <Hero />

      {/* 项目展示部分 */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          {/* 标题 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              代表性项目案例
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              精选各类别的代表性项目案例 →
            </p>
          </motion.div>

          {/* 项目卡片网格 - 2列展示 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {representativeProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} featured={true} />
            ))}
          </div>

          {/* 查看全部按钮 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/projects"
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              查看全部项目 →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 设计标准部分 */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* 标题 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              完整的设计标准体系
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              9 大模块组成的系统性设计标准，保证项目的一致性和规范性
            </p>
          </motion.div>

          {/* 标准模块网格 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {standards.map((standard, index) => (
              <motion.div
                key={standard.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl font-bold text-blue-600">
                    {standard.number}
                  </span>
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {standard.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {standard.description}
                </p>
                <div className="text-sm text-gray-500">
                  {standard.content.length} 个主要内容
                </div>
              </motion.div>
            ))}
          </div>

          {/* 查看标准按钮 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              href="/standards"
              className="inline-block px-8 py-4 bg-teal-600 text-white rounded-full font-medium hover:bg-teal-700 transition-colors"
            >
              查看完整标准 →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* AI 助手部分 */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          {/* 标题 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              AI 设计助手
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              智能化的设计咨询和案例获取工具，帮助您快速了解和应用设计标准
            </p>
          </motion.div>

          {/* AI 功能卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: '🎯',
                title: '设计趋势分析',
                description: '分析最新的设计趋势和市场动向，为您的项目提供参考'
              },
              {
                icon: '📚',
                title: '设计标准咨询',
                description: '快速查询和解答关于设计标准的各种问题'
              },
              {
                icon: '📂',
                title: '案例获取',
                description: '智能推荐相关的成功案例和最佳实践'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="p-8 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* 开启 AI 助手按钮 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              href="/ai-chat"
              className="inline-block px-8 py-4 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors"
            >
              开启 AI 助手 →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="w-full bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2026 品牌空间设计平台. 所有权利保留。
          </p>
        </div>
      </footer>
    </main>
  );
}
