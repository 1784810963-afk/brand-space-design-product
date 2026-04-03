import { NextRequest, NextResponse } from 'next/server';

/**
 * MCP网页爬取API
 * 使用简单的fetch方法获取网页内容
 *
 * POST /api/mcp/scrape
 * Body: { url: string }
 * Response: { success: boolean, content?: string, error?: string }
 */
export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { success: false, error: '缺少URL参数' },
        { status: 400 }
      );
    }

    // 验证URL格式
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { success: false, error: 'URL格式无效' },
        { status: 400 }
      );
    }

    console.log(`[MCP Scrape] 开始爬取: ${url}`);

    // 使用fetch获取网页内容
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'
      },
      signal: AbortSignal.timeout(30000) // 30秒超时
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();

    // 基础HTML清理：移除script、style标签
    const cleanedContent = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')  // 移除HTML标签
      .replace(/&nbsp;/g, ' ')
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\s+/g, ' ')      // 压缩空白
      .trim();

    // 限制内容长度（避免token超限）
    const maxLength = 20000;
    const truncatedContent = cleanedContent.length > maxLength
      ? cleanedContent.substring(0, maxLength) + '\n\n[内容已截断...]'
      : cleanedContent;

    console.log(`[MCP Scrape] 成功爬取: ${url} (${truncatedContent.length} 字符)`);

    return NextResponse.json({
      success: true,
      content: truncatedContent,
      metadata: {
        url,
        length: truncatedContent.length,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('[MCP Scrape] 爬取失败:', error);

    const errorMessage = error instanceof Error ? error.message : '未知错误';

    return NextResponse.json(
      {
        success: false,
        error: `爬取失败: ${errorMessage}`
      },
      { status: 500 }
    );
  }
}

/**
 * GET方法用于健康检查
 */
export async function GET() {
  return NextResponse.json({
    service: 'MCP Scrape API',
    status: 'running',
    timestamp: new Date().toISOString()
  });
}
