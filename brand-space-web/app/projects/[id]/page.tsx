'use client';

import { useParams } from 'next/navigation';
import { projects } from '@/data/projects';
import Navbar from '@/components/Navbar';

// Apple 风格详情页 - 用于所有项目
import AppleStyleProjectPage from '@/components/AppleStyleProjectDetail';

export default function ProjectDetailPage() {
  const params = useParams();

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

  // 所有项目都使用 Apple 风格详情页
  return <AppleStyleProjectPage project={project} />;
}
