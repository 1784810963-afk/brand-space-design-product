'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';
import { standards } from '@/data/standards';
import { Locale, getLocalizedValue } from '@/lib/i18n';

interface SearchModalProps {
  locale: Locale;
  dict: {
    placeholder: string;
    projectsSection: string;
    standardsSection: string;
    noResults: string;
    close: string;
  };
  onClose: () => void;
}

interface SearchResult {
  type: 'project' | 'standard';
  id: string;
  title: string;
  subtitle: string;
  href: string;
}

function searchProjects(query: string, locale: Locale): SearchResult[] {
  const q = query.toLowerCase();
  return projects
    .filter((p) => {
      const title = (getLocalizedValue(p.title, locale) as string).toLowerCase();
      const desc = (getLocalizedValue(p.description, locale) as string).toLowerCase();
      const location = (p.location ?? '').toLowerCase();
      const region = p.region ? (getLocalizedValue(p.region, locale) as string).toLowerCase() : '';
      const tags = p.tags.map((t) => (getLocalizedValue(t, locale) as string).toLowerCase()).join(' ');
      return title.includes(q) || desc.includes(q) || location.includes(q) || region.includes(q) || tags.includes(q);
    })
    .map((p) => ({
      type: 'project' as const,
      id: p.id,
      title: getLocalizedValue(p.title, locale) as string,
      subtitle: p.location ?? (getLocalizedValue(p.category, locale) as string),
      href: `/${locale}/projects/${p.id}`,
    }));
}

function searchStandards(query: string, locale: Locale): SearchResult[] {
  const q = query.toLowerCase();
  return standards
    .filter((s) => {
      const title = (getLocalizedValue(s.title, locale) as string).toLowerCase();
      const desc = (getLocalizedValue(s.description, locale) as string).toLowerCase();
      return title.includes(q) || desc.includes(q);
    })
    .map((s) => ({
      type: 'standard' as const,
      id: s.id,
      title: getLocalizedValue(s.title, locale) as string,
      subtitle: (getLocalizedValue(s.description, locale) as string).slice(0, 60) + '…',
      href: `/${locale}/standards`,
    }));
}

export default function SearchModal({ locale, dict, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [projectResults, setProjectResults] = useState<SearchResult[]>([]);
  const [standardResults, setStandardResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // 自动聚焦
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // ESC 关闭
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // 实时搜索
  useEffect(() => {
    const q = query.trim();
    if (q.length < 1) {
      setProjectResults([]);
      setStandardResults([]);
      return;
    }
    setProjectResults(searchProjects(q, locale));
    setStandardResults(searchStandards(q, locale));
  }, [query, locale]);

  const handleSelect = useCallback(
    (href: string) => {
      onClose();
      router.push(href);
    },
    [onClose, router]
  );

  const hasResults = projectResults.length > 0 || standardResults.length > 0;
  const showEmpty = query.trim().length > 0 && !hasResults;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4"
        onClick={onClose}
      >
        {/* 遮罩 */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        {/* 搜索面板 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: -8 }}
          transition={{ duration: 0.18 }}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 搜索框 */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
            <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={dict.placeholder}
              className="flex-1 text-base text-gray-900 placeholder-gray-400 outline-none bg-transparent"
            />
            <button
              onClick={onClose}
              className="flex-shrink-0 text-sm text-gray-500 hover:text-gray-700 transition-colors px-2 py-1 rounded hover:bg-gray-100"
            >
              {dict.close}
            </button>
          </div>

          {/* 搜索结果 */}
          {(hasResults || showEmpty) && (
            <div className="max-h-[60vh] overflow-y-auto py-3">
              {showEmpty && (
                <p className="px-5 py-6 text-center text-gray-500 text-sm">{dict.noResults}</p>
              )}

              {projectResults.length > 0 && (
                <div>
                  <p className="px-5 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {dict.projectsSection}
                  </p>
                  {projectResults.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => handleSelect(r.href)}
                      className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors text-left group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                          {r.title}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{r.subtitle}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {standardResults.length > 0 && (
                <div className={projectResults.length > 0 ? 'mt-2 border-t border-gray-100 pt-2' : ''}>
                  <p className="px-5 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {dict.standardsSection}
                  </p>
                  {standardResults.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => handleSelect(r.href)}
                      className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors text-left group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate group-hover:text-teal-600 transition-colors">
                          {r.title}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{r.subtitle}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 空状态提示（未输入时） */}
          {query.trim().length === 0 && (
            <div className="px-5 py-8 text-center">
              <svg className="w-10 h-10 text-gray-200 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-sm text-gray-400">{dict.placeholder}</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
