import { getDictionary, Locale } from '@/lib/i18n';
import ClientMotionDiv from '@/components/ClientMotionDiv';
import ProjectsListClient from '@/components/ProjectsListClient';

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }>; }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <main className="min-h-screen bg-white">
      {/* 页面顶部 */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <ClientMotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {dict.projects.title}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {dict.projects.subtitle}
            </p>
          </ClientMotionDiv>
        </div>
      </section>

      <ProjectsListClient
        locale={locale as Locale}
        dict={{
          allProjects: dict.projects.allProjects,
          noResults: dict.projects.noResults,
          viewDetails: dict.home.projects.viewDetails,
        }}
      />
    </main>
  );
}
