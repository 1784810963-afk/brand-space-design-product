import { projects } from '@/data/projects';
import { getDictionary, Locale } from '@/lib/i18n';

// Apple 风格详情页 - 用于所有项目
import AppleStyleProjectPage from '@/components/AppleStyleProjectDetail';

export default async function ProjectDetailPage({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id: projectId } = await params;
  const dict = await getDictionary(locale as Locale);

  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-center h-96">
          <p className="text-xl text-gray-500">{dict.projectDetail.notFound}</p>
        </div>
      </div>
    );
  }

  // 所有项目都使用 Apple 风格详情页
  return <AppleStyleProjectPage project={project} locale={locale as Locale} dict={dict.projectDetail} />;
}
