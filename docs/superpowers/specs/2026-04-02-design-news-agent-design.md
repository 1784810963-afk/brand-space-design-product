# 设计新闻Agent功能设计文档

**日期：** 2026-04-02
**状态：** MVP设计
**目标：** 在AI设计助手中添加智能设计新闻Agent，支持用户通过自然语言查询科技公司的最新设计动态

---

## 1. 功能概述

### 1.1 核心需求
- 用户在AI助手页面输入公司名称（如"apple"、"华为"），Agent自动爬取并分析该公司最近一周的设计相关新闻
- 支持智能对话问答和内容分析总结
- 预配置主流科技公司的新闻源

### 1.2 MVP范围

**包含功能：**
- 4个预配置公司源：Apple、华为、蔚来、小米
- 自然语言输入识别（中英文）
- 实时网页内容爬取（基于MCP doc-parser工具）
- AI分析生成设计动态报告
- 支持后续对话追问

**不包含（后续迭代）：**
- 新闻缓存机制
- 高级筛选（按日期/主题精确过滤）
- 多公司对比分析
- 历史记录保存

---

## 2. 系统架构

### 2.1 整体架构图

```
用户输入 "apple"
    ↓
前端 (ai-chat page)
    ↓
POST /api/chat (mode: 'design-news')
    ↓
识别公司 (关键词匹配)
    ↓
获取预配置URL列表
    ↓
调用 MCP 爬取工具
    ↓
POST /api/mcp/scrape (内部API)
    ↓
MCP doc-parser submit → poll result
    ↓
返回网页内容
    ↓
Gemini AI 分析内容
    ↓
生成设计动态报告
    ↓
返回前端展示
```

### 2.2 技术栈
- **前端：** React 19 + Next.js 16 + TypeScript
- **AI：** Google Gemini API (已配置)
- **爬虫：** MCP doc-parser工具 (已集成)
- **状态管理：** React hooks (现有实现)

---

## 3. 数据层设计

### 3.1 新闻源配置

**文件：** `data/news-sources.ts`

```typescript
interface NewsSource {
  company: string;          // 公司显示名称
  aliases: string[];        // 识别别名（中英文）
  urls: string[];          // 新闻源URL列表
  keywords: string[];      // 设计关键词（用于AI筛选）
}

export const NEWS_SOURCES: NewsSource[] = [
  {
    company: "Apple",
    aliases: ["apple", "苹果", "Apple"],
    urls: [
      "https://www.apple.com/newsroom/",
      "https://www.apple.com/newsroom/topics/design/"
    ],
    keywords: ["design", "设计", "UI", "interface", "industrial design", "Vision Pro", "产品设计"]
  },
  {
    company: "华为",
    aliases: ["huawei", "华为", "Huawei", "HUAWEI"],
    urls: [
      "https://www.huawei.com/cn/news",
      "https://consumer.huawei.com/cn/"
    ],
    keywords: ["设计", "外观", "美学", "工艺", "ID设计", "交互"]
  },
  {
    company: "蔚来",
    aliases: ["nio", "蔚来", "NIO", "Nio"],
    urls: [
      "https://www.nio.com/news",
      "https://www.nio.cn/news"
    ],
    keywords: ["设计", "汽车设计", "内饰", "外观", "用户体验"]
  },
  {
    company: "小米",
    aliases: ["xiaomi", "小米", "Xiaomi", "XIAOMI", "mi"],
    urls: [
      "https://www.mi.com/news",
      "https://www.xiaomi.cn/board/topic/official"
    ],
    keywords: ["设计", "外观", "ID", "工业设计", "用户界面"]
  }
];
```

**设计原则：**
- 每个公司支持多个别名，方便用户输入
- 预设多个新闻源URL，提高内容覆盖率
- 关键词用于AI筛选，聚焦设计相关内容

---

## 4. 后端API设计

### 4.1 Chat API扩展

**文件：** `app/api/chat/route.ts`

**新增请求模式：**
```typescript
type ChatMode = 'standard' | 'trend' | 'case' | 'design-news';

interface ChatRequest {
  message: string;
  mode: ChatMode;
  conversationHistory?: Message[];  // 支持上下文对话
}
```

**处理流程：**
```typescript
export async function POST(request: Request) {
  const { message, mode, conversationHistory } = await request.json();

  if (mode === 'design-news') {
    // 1. 识别公司
    const newsSource = identifyCompany(message);

    if (!newsSource) {
      return NextResponse.json({
        role: 'assistant',
        content: '抱歉，目前支持的公司包括：Apple、华为、蔚来、小米。请尝试输入公司名称。'
      });
    }

    // 2. 爬取新闻
    const newsContent = await fetchNewsFromUrls(newsSource.urls);

    // 3. AI分析
    const analysis = await analyzeDesignNews(
      newsContent,
      newsSource.company,
      newsSource.keywords
    );

    return NextResponse.json({
      role: 'assistant',
      content: analysis,
      metadata: {
        company: newsSource.company,
        timestamp: new Date().toISOString()
      }
    });
  }

  // ... 其他模式处理
}
```

**公司识别函数：**
```typescript
function identifyCompany(message: string): NewsSource | null {
  const lowerMessage = message.toLowerCase();

  for (const source of NEWS_SOURCES) {
    if (source.aliases.some(alias => lowerMessage.includes(alias.toLowerCase()))) {
      return source;
    }
  }

  return null;
}
```

### 4.2 MCP爬取API

**文件：** `app/api/mcp/scrape/route.ts`

```typescript
export async function POST(request: Request) {
  const { url } = await request.json();

  try {
    // 使用MCP doc-parser的submit工具
    const taskId = await submitScrapeTask(url);

    // 轮询等待结果（最多30秒）
    const result = await pollTaskResult(taskId, 30);

    return NextResponse.json({
      content: result,
      success: true
    });
  } catch (error) {
    console.error('Scrape failed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content', success: false },
      { status: 500 }
    );
  }
}

// MCP工具调用封装
async function submitScrapeTask(url: string): Promise<string> {
  // 调用MCP doc-parser的submit工具
  // 返回taskId
}

async function pollTaskResult(taskId: string, timeoutSeconds: number): Promise<string> {
  const startTime = Date.now();
  const interval = 2000; // 2秒轮询一次

  while (Date.now() - startTime < timeoutSeconds * 1000) {
    const result = await checkTaskResult(taskId);
    if (result.status === 'completed') {
      return result.content;
    }
    await sleep(interval);
  }

  throw new Error('Scrape timeout');
}
```

**容错机制：**
- 单个URL失败不影响其他URL
- 30秒超时保护
- 返回部分结果（至少一个URL成功即可）

---

## 5. 爬取与数据处理

### 5.1 爬取函数

**文件：** `lib/news-scraper.ts`

```typescript
export async function fetchNewsFromUrls(urls: string[]): Promise<string> {
  const results: string[] = [];

  for (const url of urls) {
    try {
      const response = await fetch('/api/mcp/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      const data = await response.json();

      if (data.success) {
        results.push(`来源: ${url}\n${data.content}`);
      }
    } catch (error) {
      console.error(`Failed to fetch ${url}:`, error);
      // 继续处理其他URL
    }
  }

  if (results.length === 0) {
    throw new Error('所有新闻源均获取失败');
  }

  return results.join('\n\n---分隔线---\n\n');
}
```

### 5.2 内容预处理

**初版策略：** 将原始内容交给AI处理（AI自动筛选时间和关键词）

**后续优化：**
- 日期识别和过滤
- HTML标签清理
- 去重处理

---

## 6. AI分析层

### 6.1 设计新闻分析

**文件：** `lib/ai-analyzer.ts`

```typescript
export async function analyzeDesignNews(
  newsContent: string,
  company: string,
  keywords: string[]
): Promise<string> {

  const prompt = `
你是一位专业的设计分析师。以下是从 ${company} 官网爬取的最新内容：

${newsContent}

请完成以下任务：
1. **筛选设计相关内容**：重点关注这些关键词：${keywords.join('、')}
2. **时间过滤**：只保留最近一周（7天内）的新闻
3. **生成报告**：
   - 标题：${company} 本周设计动态
   - 主要更新（3-5条，每条1-2句话）
   - 设计趋势洞察（1段话）
   - 关键亮点总结

**输出格式：**
# ${company} 本周设计动态

## 主要更新
- [更新1]
- [更新2]
- ...

## 设计趋势洞察
[分析段落]

## 关键亮点
[总结]

如果没有找到最近一周的设计相关新闻，请说明原因并建议用户尝试其他公司。
`;

  return await callGeminiAPI(prompt);
}
```

### 6.2 后续对话处理

```typescript
export async function handleFollowUpQuestion(
  question: string,
  previousAnalysis: string,
  company: string
): Promise<string> {

  const prompt = `
之前的分析结果：
${previousAnalysis}

用户追问：${question}

请基于之前的 ${company} 设计动态分析回答用户问题。如果需要更多信息，请明确说明。
`;

  return await callGeminiAPI(prompt);
}
```

### 6.3 Gemini API调用

```typescript
async function callGeminiAPI(prompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    }
  );

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}
```

---

## 7. 前端UI设计

### 7.1 AI助手页面扩展

**文件：** `app/ai-chat/page.tsx`

**新增模式选项：**
```typescript
const modes = [
  { id: 'standard', name: '设计标准咨询', icon: '📋' },
  { id: 'trend', name: '设计趋势分析', icon: '📈' },
  { id: 'case', name: '案例获取', icon: '💼' },
  { id: 'design-news', name: '设计新闻Agent', icon: '📰' }  // 新增
];
```

**输入提示更新：**
```typescript
const placeholderText = {
  'standard': '请输入您想了解的设计标准...',
  'trend': '请输入您想了解的设计趋势...',
  'case': '请输入您想查找的案例类型...',
  'design-news': '试试输入：apple 或 华为最近有什么设计动态？'
};
```

### 7.2 加载状态优化

**爬取过程提示：**
```typescript
if (mode === 'design-news' && isLoading) {
  return (
    <div className="loading-state">
      <div className="spinner" />
      <p>正在获取 {detectedCompany} 的最新设计动态...</p>
      <p className="text-sm text-gray-500">预计需要 10-20 秒</p>
    </div>
  );
}
```

### 7.3 结果展示优化

**Markdown渲染支持：**
- AI返回的报告使用Markdown格式
- 前端使用现有的文本展示组件
- 保持与其他模式一致的UI风格

---

## 8. 用户体验流程

### 8.1 完整交互流程

```
1. 用户打开 /ai-chat 页面
   ↓
2. 点击选择"设计新闻Agent"模式
   ↓
3. 在输入框输入："apple" 或 "华为最近有什么设计更新？"
   ↓
4. 点击发送按钮
   ↓
5. 显示加载状态："正在获取 Apple 的最新设计动态..."（10-20秒）
   ↓
6. 展示AI生成的报告：
   - Apple 本周设计动态
   - 主要更新列表
   - 趋势洞察
   - 关键亮点
   ↓
7. 用户可以继续提问：
   - "对比一下和华为的设计风格"
   - "Vision Pro 的设计有什么特点？"
   - "总结一下主要趋势"
```

### 8.2 错误处理

**场景1：公司不支持**
```
输入：tesla
输出：抱歉，目前支持的公司包括：Apple、华为、蔚来、小米。请尝试输入这些公司名称。
```

**场景2：爬取失败**
```
输出：抱歉，暂时无法获取该公司的新闻内容，请稍后再试。
```

**场景3：无设计相关新闻**
```
输出：最近一周没有找到 [公司] 的设计相关新闻。建议：
- 尝试查询其他公司
- 稍后再试（新闻源可能更新）
```

---

## 9. 关键文件清单

### 9.1 新增文件

```
data/
  └── news-sources.ts              # 新闻源配置

lib/
  ├── news-scraper.ts              # 爬取逻辑
  └── ai-analyzer.ts               # AI分析逻辑

app/api/
  └── mcp/
      └── scrape/
          └── route.ts             # MCP爬取API
```

### 9.2 修改文件

```
app/api/chat/route.ts              # 添加design-news模式处理
app/ai-chat/page.tsx               # 添加新模式UI选项
```

---

## 10. 验证计划

### 10.1 功能测试

**测试用例：**

1. **基础识别测试**
   - 输入："apple" → 识别为Apple
   - 输入："华为" → 识别为华为
   - 输入："蔚来汽车" → 识别为蔚来
   - 输入："小米手机" → 识别为小米

2. **爬取测试**
   - 验证能成功爬取至少一个URL
   - 验证超时保护（30秒）
   - 验证部分失败时的容错

3. **AI分析测试**
   - 验证返回结构化报告
   - 验证时间筛选（最近一周）
   - 验证关键词筛选（设计相关）

4. **对话测试**
   - 初次查询 → 生成报告
   - 追问问题 → 基于上下文回答
   - 切换公司 → 新查询

5. **错误处理测试**
   - 不支持的公司名
   - 网络错误
   - 无相关新闻

### 10.2 端到端测试

**测试步骤：**
```bash
# 1. 启动开发服务器
cd brand-space-web
npm run dev

# 2. 打开浏览器
http://localhost:3000/ai-chat

# 3. 选择"设计新闻Agent"模式

# 4. 依次测试输入：
- "apple"
- "华为最近有什么设计新闻？"
- "对比一下蔚来和小米的设计风格"
- "tesla" (预期失败，测试错误处理)

# 5. 验证响应时间
- 首次查询：10-30秒（爬取+分析）
- 后续追问：2-5秒（仅AI分析）

# 6. 验证响应质量
- 报告结构完整
- 内容与公司相关
- 时间范围正确（最近一周）
```

### 10.3 性能指标

- **首次查询响应时间：** < 30秒
- **追问响应时间：** < 5秒
- **爬取成功率：** > 80%（至少一个URL成功）
- **AI分析准确率：** 人工评估（内容相关性）

---

## 11. 技术债务与后续优化

### 11.1 已知限制

1. **无缓存机制** - 每次查询都实时爬取，响应慢
2. **无历史记录** - 不保存用户查询历史
3. **有限的公司源** - 仅支持4家公司
4. **简单的时间筛选** - 依赖AI识别，可能不够精确
5. **无多公司对比** - 不支持同时分析多家公司

### 11.2 后续迭代方向

**Phase 2: 性能优化**
- 实现Redis缓存（缓存爬取结果24小时）
- 后台定时任务预爬取
- 响应时间优化到 < 5秒

**Phase 3: 功能增强**
- 增加更多公司源（10+ 科技公司）
- 支持多公司对比分析
- 添加时间范围选择（最近3天/7天/30天）
- 主题筛选（UI设计/工业设计/品牌设计）

**Phase 4: 数据持久化**
- 保存爬取的新闻到数据库
- 用户查询历史记录
- 个性化推荐

---

## 12. 总结

本设计文档定义了设计新闻Agent的MVP实现方案，核心目标是快速验证功能可行性。通过利用现有的MCP工具和Gemini API，可以在最小改动下实现智能新闻分析功能。

**关键成功因素：**
- ✅ 复用现有基础设施（MCP、Gemini）
- ✅ 简洁的用户交互（自然语言输入）
- ✅ 智能的内容筛选（AI自动识别设计相关内容）
- ✅ 良好的错误处理和用户反馈

**下一步：** 实施计划（implementation plan）
