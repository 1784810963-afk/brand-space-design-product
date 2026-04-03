'use client';

import { standards } from '@/data/standards';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function StandardsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 页面顶部 */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              设计标准体系
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              9 大模块的系统性设计标准，保证项目的一致性和规范性
            </p>
          </motion.div>
        </div>
      </section>

      {/* 标准内容 */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {standards.map((standard, index) => (
              <motion.div
                key={standard.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
                className="group bg-white rounded-xl border-2 border-gray-200 p-8 hover:border-teal-500 hover:shadow-xl transition-all duration-300"
              >
                {/* 标题行 */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg flex items-center justify-center group-hover:from-teal-100 group-hover:to-teal-200 transition-colors">
                    <span className="text-2xl font-bold text-teal-700">
                      {standard.number}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-teal-600 transition-colors">
                      {standard.title}
                    </h3>
                    <p className="text-gray-600">
                      {standard.description}
                    </p>
                  </div>
                </div>

                {/* 内容列表 */}
                <div className="mt-6 space-y-2">
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    主要内容：
                  </p>
                  <ul className="space-y-2">
                    {standard.content.map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.3 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 text-gray-600"
                      >
                        <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* 查看详情 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  viewport={{ once: true }}
                  className="mt-6 pt-6 border-t border-gray-200"
                >
                  <button className="text-teal-600 font-medium text-sm group-hover:text-teal-700 flex items-center gap-2 transition-colors">
                    了解更多
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 调用 AI 助手 */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              对设计标准有疑问？
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              使用 AI 助手快速查询和解答关于设计标准的各种问题
            </p>
            <Link
              href="/ai-chat?mode=standard"
              className="inline-block px-8 py-4 bg-teal-600 text-white rounded-full font-medium hover:bg-teal-700 transition-colors"
            >
              启动 AI 标准咨询 →
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
