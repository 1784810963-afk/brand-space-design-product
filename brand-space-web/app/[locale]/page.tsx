import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';
import { standards } from '@/data/standards';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getDictionary, Locale } from '@/lib/i18n';
import ClientMotionDiv from '@/components/ClientMotionDiv';

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  // 过滤代表性项目案例（首页展示）
  const representativeProjects = projects.filter(p => p.isRepresentative);

  const aiFeatures = [
    {
      icon: '🎯',
      title: dict.home.aiAssistant.features.trends.title,
      description: dict.home.aiAssistant.features.trends.description
    },
    {
      icon: '📚',
      title: dict.home.aiAssistant.features.consultation.title,
      description: dict.home.aiAssistant.features.consultation.description
    },
    {
      icon: '📂',
      title: dict.home.aiAssistant.features.cases.title,
      description: dict.home.aiAssistant.features.cases.description
    }
  ];

  return (
    <main className="w-full bg-white">
      {/* 英雄区块 */}
      <Hero dict={dict.home.hero} />

      {/* 项目展示部分 */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          {/* 标题 */}
          <ClientMotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {dict.home.projects.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {dict.home.projects.subtitle}
            </p>
          </ClientMotionDiv>

          {/* 项目卡片网格 - 2列展示 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {representativeProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                featured={true}
                locale={locale as Locale}
                viewDetailsText={dict.home.projects.viewDetails}
              />
            ))}
          </div>

          {/* 查看全部按钮 */}
          <ClientMotionDiv
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href={`/${locale}/projects`}
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              {dict.home.projects.viewAll}
            </Link>
          </ClientMotionDiv>
        </div>
      </section>

      {/* 设计标准部分 */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* 标题 */}
          <ClientMotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {dict.home.standards.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {dict.home.standards.subtitle}
            </p>
          </ClientMotionDiv>

          {/* 标准模块网格 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {standards.map((standard, index) => (
              <ClientMotionDiv
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
                  {standard.content.length} {dict.home.standards.itemsCount}
                </div>
              </ClientMotionDiv>
            ))}
          </div>

          {/* 查看标准按钮 */}
          <ClientMotionDiv
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              href={`/${locale}/standards`}
              className="inline-block px-8 py-4 bg-teal-600 text-white rounded-full font-medium hover:bg-teal-700 transition-colors"
            >
              {dict.home.standards.viewAll}
            </Link>
          </ClientMotionDiv>
        </div>
      </section>

      {/* AI 助手部分 */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          {/* 标题 */}
          <ClientMotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {dict.home.aiAssistant.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {dict.home.aiAssistant.subtitle}
            </p>
          </ClientMotionDiv>

          {/* AI 功能卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {aiFeatures.map((item, index) => (
              <ClientMotionDiv
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
              </ClientMotionDiv>
            ))}
          </div>

          {/* 开启 AI 助手按钮 */}
          <ClientMotionDiv
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              href={`/${locale}/ai-chat`}
              className="inline-block px-8 py-4 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors"
            >
              {dict.home.aiAssistant.viewAll}
            </Link>
          </ClientMotionDiv>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="w-full bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            {dict.home.footer.copyright}
          </p>
        </div>
      </footer>
    </main>
  );
}
