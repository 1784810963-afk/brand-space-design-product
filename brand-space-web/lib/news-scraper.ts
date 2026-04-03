/**
 * 新闻爬取层
 * 负责从配置的URL列表中爬取网页内容
 */

/**
 * 爬取单个URL
 */
async function scrapeSingleUrl(url: string): Promise<string> {
  try {
    console.log(`  → 正在爬取: ${url}`);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'
      },
      signal: AbortSignal.timeout(30000) // 30秒超时
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();

    // 基础HTML清理
    const cleanedContent = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\s+/g, ' ')
      .trim();

    // 限制长度
    const maxLength = 20000;
    const truncated = cleanedContent.length > maxLength
      ? cleanedContent.substring(0, maxLength) + '\n[内容已截断...]'
      : cleanedContent;

    console.log(`  ✓ 成功: ${url} (${truncated.length} 字符)`);
    return truncated;

  } catch (error) {
    console.error(`  ✗ 失败: ${url}`, error instanceof Error ? error.message : error);
    throw error;
  }
}

/**
 * 从多个URL爬取新闻内容
 * @param urls URL列表
 * @returns 合并后的新闻内容文本
 */
export async function fetchNewsFromUrls(urls: string[]): Promise<string> {
  const results: string[] = [];

  for (const url of urls) {
    try {
      const content = await scrapeSingleUrl(url);
      results.push(`
========================================
来源: ${url}
========================================
${content}
`);
    } catch (error) {
      console.warn(`跳过失败的URL: ${url}`);
      // 继续处理其他URL
    }
  }

  if (results.length === 0) {
    throw new Error('所有新闻源均获取失败，请检查网络连接或稍后重试');
  }

  console.log(`✓ 爬取完成，成功 ${results.length}/${urls.length} 个源`);
  return results.join('\n\n');
}
