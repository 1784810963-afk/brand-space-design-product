'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

type ChatMode = 'trend' | 'standard' | 'case';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChatPage() {
  const [mode, setMode] = useState<ChatMode>('standard');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '你好！我是设计标准 AI 助手。我可以帮你了解设计标准、分析设计趋势和推荐相关案例。请选择你感兴趣的话题。'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const modes = [
    {
      id: 'standard',
      label: '设计标准咨询',
      description: '快速查询和解答关于设计标准的各种问题',
      icon: '📚'
    },
    {
      id: 'trend',
      label: '设计趋势分析',
      description: '分析最新的设计趋势和市场动向',
      icon: '🎯'
    },
    {
      id: 'case',
      label: '案例获取',
      description: '智能推荐相关的成功案例和最佳实践',
      icon: '📂'
    }
  ] as const;

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // 保存用户输入（防止被清空后丢失）
    const userInput = inputValue;

    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userInput
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // 调用后端 API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userInput,
          mode: mode,
        }),
      });

      if (!response.ok) {
        throw new Error('API 调用失败');
      }

      const data = await response.json();

      // 添加 AI 回复
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
      {/* 页面顶部 */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              AI 设计助手
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              智能化的设计咨询和案例获取工具
            </p>
          </motion.div>
        </div>
      </section>

      {/* 主体区域 */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          {/* 模式选择卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {modes.map((m) => (
              <motion.button
                key={m.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMode(m.id as ChatMode)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  mode === m.id
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 bg-white hover:border-purple-300'
                }`}
              >
                <div className="text-3xl mb-2">{m.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1">{m.label}</h3>
                <p className="text-sm text-gray-600">{m.description}</p>
              </motion.button>
            ))}
          </div>

          {/* 聊天区域 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden flex flex-col h-96"
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
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-purple-600 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-900 rounded-bl-none'
                    }`}
                  >
                    {msg.content}
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
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
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
                  placeholder="输入你的问题..."
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
              💡 <strong>提示：</strong> 这是 AI 助手的演示版本。现在由 Google Gemini AI 提供支持。
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
