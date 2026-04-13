import Hero from '@/components/Hero';
import { projects } from '@/data/projects';
import { standards } from '@/data/standards';
import Link from 'next/link';
import { getDictionary, Locale, getLocalizedValue } from '@/lib/i18n';
import ClientMotionDiv from '@/components/ClientMotionDiv';

// 首页展示的四个分类，按用户指定顺序
const SHOWCASE_CATEGORIES = [
  { zh: '零售空间', en: 'Retail Space' },
  { zh: '活动空间', en: 'Event Space' },
  { zh: '配套空间', en: 'Supporting Space' },
  { zh: '创意专项', en: 'Creative Projects' },
] as const;

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  // 每个分类取第一个 isRepresentative 项目
  const showcaseProjects = SHOWCASE_CATEGORIES.map(cat => ({
    category: locale === 'en' ? cat.en : cat.zh,
    categoryEn: cat.en,
    project: projects.find(
      p => p.isRepresentative && p.category.zh === cat.zh
    ) ?? null,
  })).filter(item => item.project !== null);

  // Hero 背景图：用零售空间代表项目的图片
  const heroImage = showcaseProjects[0]?.project?.image ?? '';

  return (
    <main className="w-full bg-white">
      {/* Hero - 全屏背景图 */}
      <Hero locale={locale as Locale} backgroundImage={heroImage} dict={dict.home.hero} />

      {/* 代表性案例 - 文字在上、图片居中在下 */}
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-8">
          {/* 区块标题 */}
          <ClientMotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <p className="text-xs font-medium tracking-widest uppercase text-[#6e6e73] mb-3">
              {locale === 'en' ? 'Featured Work' : '代表案例'}
            </p>
            <h2 className="text-4xl sm:text-5xl font-semibold text-[#1d1d1f] tracking-tight">
              {dict.home.projects.title}
            </h2>
          </ClientMotionDiv>
        </div>

        {/* 四个分类纵向排列 */}
        <div className="space-y-0">
          {showcaseProjects.map((item, index) => {
            const project = item.project!;
            return (
              <ClientMotionDiv
                key={item.categoryEn}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true, margin: '-60px' }}
                className="border-t border-[#d2d2d7]"
              >
                {/* 文字区 - 居中，图片上方 */}
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 text-center">
                  <div className="flex justify-center mb-5">
                    <span className="inline-block px-4 py-1.5 bg-[#1d1d1f] text-white text-xs font-medium rounded-full tracking-widest">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-semibold text-[#1d1d1f] tracking-tight mb-4 leading-snug">
                    {getLocalizedValue(project.title, locale as Locale) as unknown as string}
                  </h3>
                  <p className="text-base text-[#6e6e73] leading-relaxed mb-8 max-w-xl mx-auto">
                    {getLocalizedValue(project.description, locale as Locale) as unknown as string}
                  </p>
                  <Link
                    href={`/${locale}/projects/${project.id}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#1d1d1f] group"
                  >
                    <span className="border-b border-[#1d1d1f] pb-px group-hover:text-[#6e6e73] group-hover:border-[#6e6e73] transition-colors">
                      {dict.home.projects.viewDetails}
                    </span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>

                {/* 图片 - 居中，带边距，不满铺 */}
                <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
                  <div className="overflow-hidden rounded-2xl bg-[#f5f5f7]" style={{ aspectRatio: '16/9' }}>
                    {project.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.image}
                        alt={getLocalizedValue(project.title, locale as Locale) as unknown as string}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#f5f5f7]" />
                    )}
                  </div>
                </div>
              </ClientMotionDiv>
            );
          })}
          <div className="border-t border-[#d2d2d7]" />
        </div>

        {/* 查看全部按钮 */}
        <div className="py-16 text-center">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1d1d1f] border border-[#d2d2d7] px-7 py-3 rounded-full hover:bg-[#f5f5f7] transition-colors"
          >
            {dict.home.projects.viewAll}
          </Link>
        </div>
      </section>

      {/* 设计标准 */}
      <section className="w-full py-24 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ClientMotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-xs font-medium tracking-widest uppercase text-[#6e6e73] mb-3">
              {locale === 'en' ? 'Design System' : '设计标准'}
            </p>
            <h2 className="text-4xl sm:text-5xl font-semibold text-[#1d1d1f] tracking-tight">
              {dict.home.standards.title}
            </h2>
            <p className="mt-4 text-lg text-[#6e6e73] max-w-xl">
              {dict.home.standards.subtitle}
            </p>
          </ClientMotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {standards.map((standard, index) => (
              <ClientMotionDiv
                key={standard.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 border border-[#d2d2d7] hover:border-[#86868b] hover:shadow-lg transition-all duration-300"
              >
                <p className="text-xs font-medium tracking-widest uppercase text-[#86868b] mb-4">
                  {standard.number.toString().padStart(2, '0')}
                </p>
                <h3 className="text-xl font-semibold text-[#1d1d1f] mb-3">
                  {getLocalizedValue(standard.title, locale as Locale)}
                </h3>
                <p className="text-sm text-[#6e6e73] leading-relaxed mb-6">
                  {getLocalizedValue(standard.description, locale as Locale)}
                </p>
                <ul className="space-y-2 mb-8">
                  {standard.content.slice(0, 4).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[#6e6e73]">
                      <span className="w-[1px] h-4 bg-[#d2d2d7] flex-shrink-0 mt-0.5" />
                      {getLocalizedValue(item, locale as Locale)}
                    </li>
                  ))}
                  {standard.content.length > 4 && (
                    <li className="text-xs text-[#86868b] pl-4">
                      +{standard.content.length - 4} {dict.home.standards.moreItems}
                    </li>
                  )}
                </ul>
                <a
                  href={standard.pdfUrl}
                  download
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#1d1d1f] border border-[#d2d2d7] px-5 py-2.5 rounded-full hover:bg-[#f5f5f7] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {dict.home.standards.downloadPdf}
                </a>
              </ClientMotionDiv>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href={`/${locale}/standards`}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#1d1d1f] border border-[#d2d2d7] px-7 py-3 rounded-full hover:bg-white transition-colors"
            >
              {dict.home.standards.viewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="w-full bg-[#f5f5f7] border-t border-[#d2d2d7] py-10 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-[#86868b]">
            {dict.home.footer.copyright}
          </p>
        </div>
      </footer>
    </main>
  );
}
