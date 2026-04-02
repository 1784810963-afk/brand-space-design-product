'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function DesignNewsPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '你好！我是设计新闻Agent 📰\n\n我可以帮你获取以下科技公司的最新设计动态：\n\n• **Apple** - iOS、macOS 设计更新\n• **华为** - HarmonyOS 界面设计\n• **蔚来** - 汽车 UI/UX 创新\n• **小米** - MIUI 设计趋势\n\n试试输入公司名称，或直接问我"最近有什么设计新闻？"'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userInput = inputValue;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userInput
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userInput,
          mode: 'design-news',
        }),
      });

      if (!response.ok) {
        throw new Error('API 调用失败');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content || '抱歉，无法生成回复'
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('错误:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '抱歉，发生了错误。请稍后重试。'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* 固定导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link href="/ai-chat">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <span className="text-lg">←</span>
              <span className="text-sm font-medium">返回</span>
            </motion.button>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span>📰</span>
              <span>设计新闻Agent</span>
            </h1>
            <p className="text-sm text-gray-600">实时追踪科技公司的设计动态</p>
          </div>
        </div>
      </nav>

      {/* 主体内容区域 */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pt-28 pb-8 min-h-screen flex flex-col">
        <div className="max-w-5xl mx-auto flex-1 flex flex-col">
          {/* 聊天容器 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden flex flex-col h-[calc(100vh-12rem)]"
          >
            {/* 聊天历史 */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-2xl px-4 py-3 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-purple-600 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-900 rounded-bl-none'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            h1: ({node, ...props}) => <h1 className="text-xl font-bold mt-4 mb-2 text-gray-900" {...props} />,
                            h2: ({node, ...props}) => <h2 className="text-lg font-bold mt-3 mb-2 text-gray-800" {...props} />,
                            h3: ({node, ...props}) => <h3 className="text-base font-semibold mt-2 mb-1 text-gray-700" {...props} />,
                            p: ({node, ...props}) => <p className="mb-2 text-gray-700 leading-relaxed" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-2 space-y-1" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-2 space-y-1" {...props} />,
                            li: ({node, ...props}) => <li className="text-gray-700" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
                            code: ({node, ...props}) => <code className="bg-gray-200 px-1 py-0.5 rounded text-sm" {...props} />,
                            blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-600" {...props} />
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    )}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg rounded-bl-none">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                      <span className="text-sm">正在获取最新设计动态...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* 输入区域 */}
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !isLoading) {
                      handleSendMessage();
                    }
                  }}
                  placeholder="试试输入：apple 或 华为最近有什么设计动态？"
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
                >
                  发送
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* 提示信息 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
          >
            <p className="text-sm text-blue-800">
              💡 <strong>提示：</strong> 我可以获取Apple、华为、蔚来、小米的最新设计动态。试试直接输入公司名称！现在由通义千问（Qwen）提供支持。
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
