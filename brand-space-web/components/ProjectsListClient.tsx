'use client';

import { projects, Project } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Locale } from '@/lib/i18n';
import { getLocalizedValue } from '@/lib/i18n';
import type { LocalizedString } from '@/lib/i18n';

interface ProjectsListClientProps {
  locale: Locale;
  dict: {
    allProjects: string;
    noResults: string;
    viewDetails: string;
  };
}

export default function ProjectsListClient({ locale, dict }: ProjectsListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<LocalizedString | null>(null);

  // 获取所有分类（基于内容去重，而不是对象引用）
  const categories = projects
    .map(p => p.category)
    .filter((category, index, self) =>
      index === self.findIndex(c =>
        c.zh === category.zh && c.en === category.en
      )
    );

  // 筛选项目
  const filteredProjects = selectedCategory
    ? projects.filter(p =>
        p.category.zh === selectedCategory.zh &&
        p.category.en === selectedCategory.en
      )
    : projects;

  return (
    <>
      {/* 筛选栏 */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === null
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {dict.allProjects}
            </motion.button>
            {categories.map((category, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory &&
                  selectedCategory.zh === category.zh &&
                  selectedCategory.en === category.en
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {getLocalizedValue(category, locale) as unknown as string}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* 项目列表 */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  locale={locale}
                  viewDetailsText={dict.viewDetails}
                />
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-12"
            >
              <p className="text-lg text-gray-600">
                {dict.noResults}
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
