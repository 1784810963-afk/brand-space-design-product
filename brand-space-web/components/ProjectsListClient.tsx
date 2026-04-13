'use client';

import { projects, Project } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';
import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Locale } from '@/lib/i18n';
import { getLocalizedValue } from '@/lib/i18n';
import type { LocalizedString } from '@/lib/i18n';

interface ProjectsListClientProps {
  locale: Locale;
  dict: {
    allProjects: string;
    allRegions: string;
    noResults: string;
    viewDetails: string;
    searchPlaceholder: string;
    resultCount: string;
  };
}

export default function ProjectsListClient({ locale, dict }: ProjectsListClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<LocalizedString | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<LocalizedString | null>(null);

  // 获取所有分类（去重）
  const categories = useMemo(() =>
    projects
      .map(p => p.category)
      .filter((category, index, self) =>
        index === self.findIndex(c => c.zh === category.zh && c.en === category.en)
      ),
    []
  );

  // 获取所有地区（去重，只取有值的）
  const regions = useMemo(() => {
    const seen = new Set<string>();
    const result: NonNullable<typeof projects[0]['region']>[] = [];
    projects.forEach(p => {
      if (p.region && !seen.has(p.region.zh)) {
        seen.add(p.region.zh);
        result.push(p.region);
      }
    });
    return result;
  }, []);

  // 三重过滤：关键词 + 分类 + 地区
  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return projects.filter(p => {
      // 分类过滤
      if (selectedCategory) {
        if (p.category.zh !== selectedCategory.zh || p.category.en !== selectedCategory.en) return false;
      }
      // 地区过滤
      if (selectedRegion && p.region?.zh !== selectedRegion.zh) return false;
      // 关键词过滤
      if (q) {
        const title = (getLocalizedValue(p.title, locale) as string).toLowerCase();
        const desc = (getLocalizedValue(p.description, locale) as string).toLowerCase();
        const location = (p.location ?? '').toLowerCase();
        const region = p.region ? (getLocalizedValue(p.region, locale) as string).toLowerCase() : '';
        const tags = p.tags.map(t => (getLocalizedValue(t, locale) as string).toLowerCase()).join(' ');
        return title.includes(q) || desc.includes(q) || location.includes(q) || region.includes(q) || tags.includes(q);
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedRegion, locale]);

  // 结果计数文本
  const resultCountText = dict.resultCount.replace('{count}', String(filteredProjects.length));

  return (
    <>
      {/* 搜索框 */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative max-w-xl mx-auto">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={dict.searchPlaceholder}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 筛选栏：分类 + 地区 */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto space-y-3">
          {/* 分类筛选 */}
          <div className="flex flex-wrap gap-2 justify-center">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setSelectedCategory(null)}
              className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === null
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {dict.allProjects}
            </motion.button>
            {categories.map((category, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory &&
                  selectedCategory.zh === category.zh &&
                  selectedCategory.en === category.en
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {getLocalizedValue(category, locale) as unknown as string}
              </motion.button>
            ))}
          </div>

          {/* 地区筛选 */}
          <div className="flex flex-wrap gap-2 justify-center">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setSelectedRegion(null)}
              className={`px-4 py-1 rounded-full text-xs font-medium transition-all ${
                selectedRegion === null
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {dict.allRegions}
            </motion.button>
            {regions.map((region) => (
              <motion.button
                key={region.zh}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedRegion?.zh === region.zh
                    ? 'bg-slate-700 text-white shadow-sm'
                    : 'bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {getLocalizedValue(region, locale) as unknown as string}
              </motion.button>
            ))}
          </div>

          {/* 结果计数 */}
          <p className="text-center text-xs text-gray-400">{resultCountText}</p>
        </div>
      </section>

      {/* 项目列表 */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-8">
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
                transition={{ delay: index * 0.06, duration: 0.4 }}
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
              className="text-center py-16"
            >
              <svg className="w-12 h-12 text-gray-200 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500">{dict.noResults}</p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
