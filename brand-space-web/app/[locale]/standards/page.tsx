import { standards } from '@/data/standards';
import { getDictionary, Locale, getLocalizedValue } from '@/lib/i18n';
import ClientMotionDiv from '@/components/ClientMotionDiv';

export default async function StandardsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <main className="min-h-screen bg-white">
      {/* 页面顶部 */}
      <section className="w-full pt-24 pb-12 px-6 lg:px-8 border-b border-[#d2d2d7]">
        <div className="max-w-5xl mx-auto">
          <ClientMotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-medium tracking-widest uppercase text-[#6e6e73] mb-3">
              {locale === 'en' ? 'Design Standards' : '设计标准'}
            </p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-[#1d1d1f] tracking-tight mb-3">
              {dict.standards.title}
            </h1>
            <p className="text-lg text-[#6e6e73]">
              {dict.standards.subtitle}
            </p>
          </ClientMotionDiv>
        </div>
      </section>

      {/* 标准内容 */}
      <section className="w-full px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-6">
            {standards.map((standard, index) => (
              <ClientMotionDiv
                key={standard.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-[#d2d2d7] hover:border-[#86868b] hover:shadow-lg transition-all duration-300 p-10"
              >
                {/* 编号 + 标题行 */}
                <div className="flex items-start gap-8 mb-6">
                  <span className="text-4xl font-semibold text-[#d2d2d7] flex-shrink-0 leading-none mt-1">
                    {standard.number.toString().padStart(2, '0')}
                  </span>
                  <div>
                    <h2 className="text-2xl font-semibold text-[#1d1d1f] tracking-tight mb-2">
                      {getLocalizedValue(standard.title, locale as Locale)}
                    </h2>
                    <p className="text-base text-[#6e6e73] leading-relaxed">
                      {getLocalizedValue(standard.description, locale as Locale)}
                    </p>
                  </div>
                </div>

                {/* 分隔线 */}
                <div className="border-t border-[#f5f5f7] mb-6" />

                {/* 内容列表 */}
                <div className="mb-8">
                  <p className="text-xs font-medium tracking-widest uppercase text-[#86868b] mb-4">
                    {dict.standards.mainContent}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {standard.content.map((item, idx) => (
                      <ClientMotionDiv
                        key={idx}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04, duration: 0.3 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3 py-2"
                      >
                        <span className="w-[1px] h-4 bg-[#d2d2d7] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-[#6e6e73]">
                          {getLocalizedValue(item, locale as Locale)}
                        </span>
                      </ClientMotionDiv>
                    ))}
                  </div>
                </div>

                {/* PDF 下载按钮 */}
                <div className="pt-6 border-t border-[#d2d2d7]">
                  <a
                    href={standard.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#1d1d1f] border border-[#d2d2d7] px-6 py-3 rounded-full hover:bg-[#f5f5f7] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {dict.standards.downloadPdf}
                  </a>
                </div>
              </ClientMotionDiv>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
