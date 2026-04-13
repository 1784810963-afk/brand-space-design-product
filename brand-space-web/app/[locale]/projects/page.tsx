import { getDictionary, Locale } from '@/lib/i18n';
import ClientMotionDiv from '@/components/ClientMotionDiv';
import ProjectsListClient from '@/components/ProjectsListClient';

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }>; }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <main className="min-h-screen bg-white">
      {/* 页面顶部 */}
      <section className="w-full pt-24 pb-12 px-6 lg:px-8 border-b border-[#d2d2d7]">
        <div className="max-w-7xl mx-auto">
          <ClientMotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-medium tracking-widest uppercase text-[#6e6e73] mb-3">
              {locale === 'en' ? 'Our Work' : '项目案例'}
            </p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-[#1d1d1f] tracking-tight mb-3">
              {dict.projects.title}
            </h1>
            <p className="text-lg text-[#6e6e73]">
              {dict.projects.subtitle}
            </p>
          </ClientMotionDiv>
        </div>
      </section>

      <ProjectsListClient
        locale={locale as Locale}
        dict={{
          allProjects: dict.projects.allProjects,
          allRegions: dict.projects.allRegions,
          noResults: dict.projects.noResults,
          viewDetails: dict.projects.viewDetails,
          searchPlaceholder: dict.projects.searchPlaceholder,
          resultCount: dict.projects.resultCount,
        }}
      />
    </main>
  );
}
