/**
 * 设计新闻源配置
 * 用于设计新闻Agent功能
 */

export interface NewsSource {
  company: string;          // 公司显示名称
  aliases: string[];        // 识别别名（支持中英文）
  urls: string[];          // 新闻源URL列表
  keywords: string[];      // 设计关键词（用于AI筛选）
}

export const NEWS_SOURCES: NewsSource[] = [
  {
    company: "Apple",
    aliases: ["apple", "苹果", "Apple", "APPLE"],
    urls: [
      "https://www.apple.com/newsroom/",
      "https://www.apple.com/newsroom/topics/design/"
    ],
    keywords: [
      "design", "设计", "UI", "interface", "industrial design",
      "Vision Pro", "产品设计", "user experience", "用户体验"
    ]
  },
  {
    company: "华为",
    aliases: ["huawei", "华为", "Huawei", "HUAWEI", "hw"],
    urls: [
      "https://www.huawei.com/cn/news",
      "https://consumer.huawei.com/cn/"
    ],
    keywords: [
      "设计", "外观", "美学", "工艺", "ID设计", "交互",
      "鸿蒙", "HarmonyOS", "产品设计", "用户界面"
    ]
  },
  {
    company: "蔚来",
    aliases: ["nio", "蔚来", "NIO", "Nio"],
    urls: [
      "https://www.nio.com/news",
      "https://www.nio.cn/news"
    ],
    keywords: [
      "设计", "汽车设计", "内饰", "外观", "用户体验",
      "智能座舱", "交互设计", "产品设计"
    ]
  },
  {
    company: "小米",
    aliases: ["xiaomi", "小米", "Xiaomi", "XIAOMI", "mi", "Mi"],
    urls: [
      "https://www.mi.com/news",
      "https://www.xiaomi.cn/board/topic/official"
    ],
    keywords: [
      "设计", "外观", "ID", "工业设计", "用户界面",
      "澎湃", "MIUI", "产品设计", "交互体验"
    ]
  }
];

/**
 * 根据用户输入识别公司
 * @param message 用户输入的消息
 * @returns 匹配的新闻源，如果没有匹配则返回null
 */
export function identifyCompany(message: string): NewsSource | null {
  const lowerMessage = message.toLowerCase();

  for (const source of NEWS_SOURCES) {
    if (source.aliases.some(alias => lowerMessage.includes(alias.toLowerCase()))) {
      return source;
    }
  }

  return null;
}

/**
 * 获取支持的公司列表（用于错误提示）
 */
export function getSupportedCompanies(): string {
  return NEWS_SOURCES.map(source => source.company).join('、');
}
