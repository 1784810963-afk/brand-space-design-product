/**
 * AI分析层 - 使用通义千问API
 * 负责分析爬取的新闻内容并生成设计动态报告
 */

/**
 * 调用通义千问API
 * @param prompt 提示词
 * @returns AI生成的响应文本
 */
async function callQwenAPI(prompt: string): Promise<string> {
  const apiKey = process.env.DASHSCOPE_API_KEY;

  if (!apiKey) {
    throw new Error('未配置DASHSCOPE_API_KEY，请在.env.local中添加千问API Key');
  }

  try {
    const response = await fetch(
      'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'qwen-plus',  // 使用qwen-plus模型，性能和成本平衡
          input: {
            messages: [
              {
                role: 'system',
                content: '你是一位专业的设计分析师，擅长从新闻资讯中提取和分析设计相关信息。'
              },
              {
                role: 'user',
                content: prompt
              }
            ]
          },
          parameters: {
            result_format: 'message',
            temperature: 0.7,
            top_p: 0.8,
            max_tokens: 2000
          }
        })
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`千问API调用失败: ${response.status} - ${error}`);
    }

    const data = await response.json();

    if (data.output && data.output.choices && data.output.choices[0]) {
      return data.output.choices[0].message.content;
    }

    throw new Error('千问API返回格式异常');
  } catch (error) {
    console.error('千问API调用错误:', error);
    throw error;
  }
}

/**
 * 分析设计新闻内容
 * @param newsContent 爬取的新闻内容
 * @param company 公司名称
 * @param keywords 设计关键词列表
 * @returns 结构化的设计动态报告
 */
export async function analyzeDesignNews(
  newsContent: string,
  company: string,
  keywords: string[]
): Promise<string> {

  const prompt = `
以下是从 ${company} 官网爬取的最新内容：

${newsContent}

请完成以下任务：

1. **筛选设计相关内容**：重点关注这些关键词：${keywords.join('、')}
2. **时间过滤**：只保留最近一周（7天内）的新闻和动态
3. **生成报告**：按以下格式输出

# ${company} 本周设计动态

## 主要更新
（列出3-5条设计相关的更新，每条1-2句话简要说明）
- [更新1]
- [更新2]
- [更新3]

## 设计趋势洞察
（用一段话分析这些更新反映的设计趋势或理念）

## 关键亮点
（总结最值得关注的设计亮点）

**注意事项：**
- 如果内容中没有明确的时间信息，优先选择看起来较新的内容
- 如果没有找到设计相关的内容，请明确说明并建议用户尝试其他公司
- 保持专业和客观的分析风格
- 使用Markdown格式输出

请开始分析：
`;

  return await callQwenAPI(prompt);
}

/**
 * 处理后续对话追问
 * @param question 用户的追问
 * @param previousAnalysis 之前的分析结果
 * @param company 公司名称
 * @returns AI回答
 */
export async function handleFollowUpQuestion(
  question: string,
  previousAnalysis: string,
  company: string
): Promise<string> {

  const prompt = `
之前我分析了 ${company} 的设计动态：

${previousAnalysis}

现在用户追问：${question}

请基于之前的分析内容回答用户的问题。如果之前的信息不足以回答问题，请明确说明需要更多信息。

回答要求：
- 保持专业和客观
- 如果需要对比，给出具体的对比点
- 使用Markdown格式
`;

  return await callQwenAPI(prompt);
}
