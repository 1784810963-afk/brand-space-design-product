import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';
import { identifyCompany, getSupportedCompanies } from '@/data/news-sources';
import { fetchNewsFromUrls } from '@/lib/news-scraper';
import { analyzeDesignNews } from '@/lib/ai-analyzer';

// 加载设计标准手册数据
function loadDesignStandards() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'design-standards.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('加载设计标准数据失败:', error);
    return null;
  }
}

// 搜索相关内容
function searchRelevantContent(query: string, standards: any): string {
  if (!standards) return '无法加载设计标准数据';

  const lowerQuery = query.toLowerCase();
  const relevantSections = [];

  // 优先使用关键词映射查找
  if (standards.keywords_mapping) {
    for (const [keyword, sectionIds] of Object.entries(standards.keywords_mapping)) {
      if (query.includes(keyword)) {
        for (const sectionId of sectionIds as string[]) {
          const section = findSectionById(standards.chapters, sectionId);
          if (section) {
            relevantSections.push({
              chapter: findChapterBySection(standards.chapters, sectionId)?.title || '',
              section: section.title,
              content: section.content
            });
          }
        }
      }
    }
  }

  // 如果没有找到，进行全文搜索
  if (relevantSections.length === 0) {
    for (const chapter of standards.chapters) {
      for (const section of chapter.sections) {
        if (
          section.content.includes(query) ||
          section.title.includes(query) ||
          (section.keywords && section.keywords.some((k: string) => query.includes(k)))
        ) {
          relevantSections.push({
            chapter: chapter.title,
            section: section.title,
            content: section.content.substring(0, 500) // 返回前500个字符
          });
        }
      }
    }
  }

  // 组织回复
  if (relevantSections.length === 0) {
    return '根据设计标准手册，暂未找到关于"' + query + '"的相关信息。建议查询具体的部分名称或材料编码。';
  }

  let response = '根据设计标准手册，以下是相关信息：\n\n';
  relevantSections.slice(0, 3).forEach((item: any, index: number) => {
    response += `${index + 1}. 【${item.chapter} - ${item.section}】\n${item.content}\n\n`;
  });

  return response;
}

// 根据sectionId查找section
function findSectionById(chapters: any[], sectionId: string): any {
  for (const chapter of chapters) {
    for (const section of chapter.sections) {
      if (section.id === sectionId) {
        return section;
      }
    }
  }
  return null;
}

// 根据section查找chapter
function findChapterBySection(chapters: any[], sectionId: string): any {
  for (const chapter of chapters) {
    for (const section of chapter.sections) {
      if (section.id === sectionId) {
        return chapter;
      }
    }
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const { message, mode } = await request.json();

    console.log('📨 收到消息:', message, '模式:', mode);

    if (!message) {
      return NextResponse.json(
        { error: '消息不能为空' },
        { status: 400 }
      );
    }

    let response = '';

    if (mode === 'standard') {
      // 设计标准咨询模式 - 使用真实的手册数据
      const standards = loadDesignStandards();
      response = searchRelevantContent(message, standards);
    } else if (mode === 'trend') {
      // 设计趋势分析模式
      response = '当前设计行业的主要趋势包括：\n1. 极简主义设计 - 强调功能性和清洁线条\n2. 可持续性设计 - 关注环保材料和循环利用\n3. 数字化融合 - 融合AI和交互技术\n4. 用户体验优先 - 以人为本的设计思维\n5. 个性化定制 - 满足差异化需求';
    } else if (mode === 'case') {
      // 案例获取模式
      response = '我们的成功案例包括：\n• 上海前滩商城 - 展示现代化展厅设计\n• 长宁来福士广场 - 整体空间布局优化\n• 成都银泰城 - 零售空间设计标准\n• 宁波江北展厅 - 完整的品牌空间应用\n这些项目展示了我们在空间设计、品牌整合等方面的专业能力，可为您的项目提供参考。';
    } else if (mode === 'design-news') {
      // 设计新闻Agent模式
      try {
        console.log('🔍 识别公司中...');

        // 1. 识别公司
        const newsSource = identifyCompany(message);

        if (!newsSource) {
          response = `抱歉，目前支持的公司包括：${getSupportedCompanies()}。\n\n请尝试输入这些公司的名称，例如："apple" 或 "华为最近有什么设计动态？"`;
        } else {
          console.log(`✓ 识别为: ${newsSource.company}`);
          console.log(`📡 开始爬取 ${newsSource.urls.length} 个新闻源...`);

          // 2. 爬取新闻
          const newsContent = await fetchNewsFromUrls(newsSource.urls);

          console.log(`✓ 爬取完成，内容长度: ${newsContent.length}`);
          console.log(`🤖 开始AI分析...`);

          // 3. AI分析
          response = await analyzeDesignNews(
            newsContent,
            newsSource.company,
            newsSource.keywords
          );

          console.log(`✓ 分析完成`);
        }
      } catch (error) {
        console.error('❌ 设计新闻Agent错误:', error);
        response = `抱歉，获取设计新闻时出现错误：${error instanceof Error ? error.message : '未知错误'}。请稍后重试。`;
      }
    } else {
      response = '抱歉，暂未识别咨询模式。请选择设计标准咨询、设计趋势分析、案例获取或设计新闻Agent。';
    }

    console.log('✅ 返回回复');

    return NextResponse.json({
      role: 'assistant',
      content: response,
    });
  } catch (error) {
    console.error('❌ API 错误:', error);
    return NextResponse.json(
      { error: '服务器错误，请稍后重试', details: String(error) },
      { status: 500 }
    );
  }
}
