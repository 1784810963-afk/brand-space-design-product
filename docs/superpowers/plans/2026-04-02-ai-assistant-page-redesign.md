# AI Assistant Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split AI assistant page into two sections (design standard consultation on first screen + agent cards on second screen) and create an independent design news agent page.

**Architecture:** Refactor the main AI chat page to focus on design standard consultation, moving other agent modes to separate pages. The design news agent gets its own dedicated route with a similar chat interface.

**Tech Stack:** Next.js 14, React, TypeScript, Framer Motion, Tailwind CSS, ReactMarkdown

---

## File Structure

### Files to Modify
- `brand-space-web/app/ai-chat/page.tsx` - Main AI assistant page
  - Remove mode switching cards (lines 29-54, 138-156)
  - Simplify state management (remove mode state)
  - Adjust chat interface layout for full-screen experience
  - Add "More AI Assistants" section below chat interface

### Files to Create
- `brand-space-web/app/ai-chat/design-news/page.tsx` - Design News Agent page
  - Independent page with fixed navigation bar
  - Chat interface with fixed design-news mode
  - Markdown rendering support

---

## Task 1: Remove Mode Switching from Main Page

**Files:**
- Modify: `brand-space-web/app/ai-chat/page.tsx:18,29-54,138-156`

- [ ] **Step 1: Remove mode state and simplify type definitions**

Remove the `ChatMode` type and simplify to single mode:

```typescript
// Remove this line (line 9):
// type ChatMode = 'trend' | 'standard' | 'case' | 'design-news';

// Remove this line (line 18):
// const [mode, setMode] = useState<ChatMode>('standard');
```

- [ ] **Step 2: Update initial welcome message**

Change the welcome message to be specific to design standard consultation:

```typescript
const [messages, setMessages] = useState<Message[]>([
  {
    id: '1',
    role: 'assistant',
    content: '你好！我是设计标准 AI 助手 📚\n\n我可以帮你：\n• 快速查询设计标准和规范\n• 解答设计相关的专业问题\n• 提供最佳实践建议\n\n请输入你的问题，我会尽力帮助你！'
  }
]);
```

- [ ] **Step 3: Remove modes array**

Delete the modes constant array (lines 29-54):

```typescript
// Remove entire modes array:
// const modes = [
//   {
//     id: 'standard',
//     label: '设计标准咨询',
//     ...
//   },
//   ...
// ] as const;
```

- [ ] **Step 4: Remove mode selection cards from JSX**

Remove the mode selection grid (lines 138-156):

```typescript
// Remove this entire section:
// <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//   {modes.map((m) => (
//     <motion.button
//       ...
//     </motion.button>
//   ))}
// </div>
```

- [ ] **Step 5: Update API call to use fixed mode**

Change the API call to always use 'standard' mode:

```typescript
// In handleSendMessage function, change:
body: JSON.stringify({
  message: userInput,
  mode: 'standard', // Fixed mode instead of dynamic
}),
```

- [ ] **Step 6: Update conditional rendering for Markdown**

Remove mode condition from Markdown rendering (lines 182-203):

```typescript
// Change from:
// {msg.role === 'assistant' && mode === 'design-news' ? (

// To:
// {msg.role === 'assistant' ? (
//   /* Always render as plain text for standard mode */
//   <div className="whitespace-pre-wrap">{msg.content}</div>
// ) : (
//   <div className="whitespace-pre-wrap">{msg.content}</div>
// )}

// Simplify to just:
<div className="whitespace-pre-wrap">{msg.content}</div>
```

- [ ] **Step 7: Update loading state text**

Simplify loading indicator (remove mode-specific text):

```typescript
// Change from mode-specific loading text to simple loading indicator
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
```

- [ ] **Step 8: Update input placeholder**

Change placeholder to be specific to design standard consultation:

```typescript
placeholder="输入你的问题，例如：什么是Material Design的核心原则？"
```

- [ ] **Step 9: Update info message**

Update the tip message at the bottom:

```typescript
<p className="text-sm text-blue-800">
  💡 <strong>提示：</strong> 这是设计标准咨询助手。如需使用其他AI能力，请向下滚动查看更多选项。现在由通义千问（Qwen）提供支持。
</p>
```

- [ ] **Step 10: Test in browser**

Commands:
```bash
cd brand-space-web
npm run dev
```

Open: http://localhost:3000/ai-chat

Verify:
- No mode switching cards appear
- Welcome message is specific to design standards
- Chat interface works normally
- Input placeholder is updated
- Info message is updated

- [ ] **Step 11: Commit changes**

```bash
git add brand-space-web/app/ai-chat/page.tsx
git commit -m "refactor: remove mode switching from AI chat page

- Remove ChatMode type and mode state
- Simplify to fixed 'standard' mode
- Update welcome message for design standard consultation
- Remove mode selection cards UI
- Update loading state and placeholder text

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 2: Adjust Chat Interface Layout for Full-Screen Experience

**Files:**
- Modify: `brand-space-web/app/ai-chat/page.tsx:114-132,159-163`

- [ ] **Step 1: Wrap main content area in min-h-screen container**

Modify the main body section to occupy full viewport:

```typescript
{/* 主体区域 - 改为 min-h-screen */}
<section className="w-full px-4 sm:px-6 lg:px-8 py-8 min-h-screen flex flex-col">
  <div className="max-w-5xl mx-auto flex-1 flex flex-col">
```

- [ ] **Step 2: Increase chat container height**

Change the chat container height for better full-screen experience:

```typescript
// Change from:
// className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden flex flex-col h-[600px]"

// To:
className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden flex flex-col h-[calc(100vh-16rem)]"
```

- [ ] **Step 3: Close the container divs properly**

Ensure closing tags are properly placed:

```typescript
    {/* 提示信息 */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
    >
      <p className="text-sm text-blue-800">
        💡 <strong>提示：</strong> 这是设计标准咨询助手。如需使用其他AI能力，请向下滚动查看更多选项。现在由通义千问（Qwen）提供支持。
      </p>
    </motion.div>
  </div>
</section>
```

- [ ] **Step 4: Test layout in browser**

Commands:
```bash
cd brand-space-web
npm run dev
```

Open: http://localhost:3000/ai-chat

Verify:
- Chat interface occupies most of the first screen
- Chat container is taller (not just 600px)
- Page feels more spacious
- Responsive layout works on mobile/tablet

Expected: Chat interface should be prominently displayed and fill the viewport height appropriately.

- [ ] **Step 5: Commit changes**

```bash
git add brand-space-web/app/ai-chat/page.tsx
git commit -m "feat: adjust chat layout for full-screen experience

- Wrap main section in min-h-screen container
- Increase chat container height to calc(100vh-16rem)
- Improve first-screen presence of chat interface

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 3: Add "More AI Assistants" Section with Agent Cards

**Files:**
- Modify: `brand-space-web/app/ai-chat/page.tsx` (add after line 282)

- [ ] **Step 1: Add "More AI Assistants" section structure**

After the closing `</section>` tag of the main content (after the info tip), add:

```typescript
{/* 更多AI助手区域 */}
<section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-white to-purple-50">
  <div className="max-w-7xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-center mb-12"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
        探索更多AI能力
      </h2>
      <p className="text-lg text-gray-600">
        专业的设计分析和资讯获取工具
      </p>
    </motion.div>

    {/* Agent cards will go here */}
  </div>
</section>
```

- [ ] **Step 2: Define agent cards data**

Add after the `messages` state definition:

```typescript
const agentCards = [
  {
    id: 'trend',
    icon: '🎯',
    title: '设计趋势分析',
    description: '分析最新的设计趋势和市场动向',
    available: false,
  },
  {
    id: 'case',
    icon: '📂',
    title: '案例获取',
    description: '智能推荐相关的成功案例和最佳实践',
    available: false,
  },
  {
    id: 'design-news',
    icon: '📰',
    title: '设计新闻Agent',
    description: '自动获取科技公司的最新设计动态和新闻',
    available: true,
    href: '/ai-chat/design-news',
  },
];
```

- [ ] **Step 3: Add agent cards grid**

Inside the "More AI Assistants" section, add the cards grid:

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {agentCards.map((agent, index) => (
    <motion.div
      key={agent.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      whileHover={agent.available ? { scale: 1.03, y: -5 } : {}}
      className={`bg-white p-6 rounded-2xl border-2 shadow-lg transition-all ${
        agent.available
          ? 'border-purple-200 hover:shadow-xl hover:border-purple-400'
          : 'border-gray-200'
      }`}
    >
      <div className="text-4xl mb-4">{agent.icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {agent.title}
      </h3>
      <p className="text-gray-600 mb-4 min-h-[3rem]">
        {agent.description}
      </p>

      {agent.available ? (
        <Link href={agent.href!}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            立即体验
          </motion.button>
        </Link>
      ) : (
        <button
          disabled
          className="w-full px-4 py-2 bg-gray-300 text-gray-500 rounded-lg font-medium cursor-not-allowed"
        >
          即将上线
        </button>
      )}
    </motion.div>
  ))}
</div>
```

- [ ] **Step 4: Test agent cards in browser**

Commands:
```bash
cd brand-space-web
npm run dev
```

Open: http://localhost:3000/ai-chat

Verify:
- Scroll down to see the "More AI Assistants" section
- Three agent cards appear in a grid
- First two cards show "即将上线" (disabled)
- Third card (Design News Agent) shows "立即体验" (enabled)
- Hover effects work on the enabled card
- Gradient background is visible

Expected: Clean cards layout with proper spacing and hover effects.

- [ ] **Step 5: Commit changes**

```bash
git add brand-space-web/app/ai-chat/page.tsx
git commit -m "feat: add More AI Assistants section with agent cards

- Add new section below chat interface
- Display 3 agent cards: trend analysis, case retrieval, design news
- Enable design news card with link to /ai-chat/design-news
- Disable other cards with 'Coming Soon' state
- Add gradient background and hover animations

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 4: Create Design News Agent Independent Page

**Files:**
- Create: `brand-space-web/app/ai-chat/design-news/page.tsx`

- [ ] **Step 1: Create directory and file**

Commands:
```bash
mkdir -p brand-space-web/app/ai-chat/design-news
touch brand-space-web/app/ai-chat/design-news/page.tsx
```

- [ ] **Step 2: Add imports and type definitions**

```typescript
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
```

- [ ] **Step 3: Create component with state**

```typescript
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
```

- [ ] **Step 4: Add message handling function**

```typescript
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
```

- [ ] **Step 5: Add JSX - navigation bar**

```typescript
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
```

- [ ] **Step 6: Add JSX - chat interface**

```typescript
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
```

- [ ] **Step 7: Add JSX - input area**

```typescript
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
```

- [ ] **Step 8: Add JSX - info tip and close tags**

```typescript
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
```

- [ ] **Step 9: Test design news page in browser**

Commands:
```bash
cd brand-space-web
npm run dev
```

Open: http://localhost:3000/ai-chat

Actions:
1. Scroll down to agent cards
2. Click "立即体验" on Design News Agent card
3. Verify navigation to /ai-chat/design-news
4. Test return button navigates back to /ai-chat
5. Send a test message (e.g., "apple")
6. Verify chat works and Markdown renders

Expected:
- Fixed navigation bar at top
- Chat interface occupies most of screen
- Return button works
- Chat functionality works
- Markdown rendering works

- [ ] **Step 10: Commit changes**

```bash
git add brand-space-web/app/ai-chat/design-news/
git commit -m "feat: create design news agent independent page

- Add new route /ai-chat/design-news
- Implement fixed navigation bar with return button
- Add chat interface with design-news mode
- Support Markdown rendering for rich content
- Match styling with main AI chat page

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 5: Optimize Icons with UI Skill

**Files:**
- Modify: `brand-space-web/app/ai-chat/page.tsx` (agentCards array)
- Possibly: Install icon library dependencies

- [ ] **Step 1: Invoke UI skill for icon recommendations**

Call the UI skill to get professional icon suggestions:

```bash
# This is a manual step - invoke the UI skill
# Ask: "I need professional icons for these three features:
# 1. Design Trend Analysis (currently 🎯)
# 2. Case Retrieval (currently 📂)
# 3. Design News Agent (currently 📰)
# Please suggest appropriate icons from lucide-react or similar libraries"
```

- [ ] **Step 2: Install icon library (if recommended)**

If UI skill suggests lucide-react or similar:

```bash
cd brand-space-web
npm install lucide-react
```

- [ ] **Step 3: Update imports**

Add icon imports at the top of the file (example with lucide-react):

```typescript
import { TrendingUp, FolderOpen, Newspaper } from 'lucide-react';
```

- [ ] **Step 4: Update agent cards to use icon components**

Replace emoji strings with icon components:

```typescript
const agentCards = [
  {
    id: 'trend',
    icon: <TrendingUp className="w-10 h-10 text-purple-600" />,
    title: '设计趋势分析',
    description: '分析最新的设计趋势和市场动向',
    available: false,
  },
  {
    id: 'case',
    icon: <FolderOpen className="w-10 h-10 text-purple-600" />,
    title: '案例获取',
    description: '智能推荐相关的成功案例和最佳实践',
    available: false,
  },
  {
    id: 'design-news',
    icon: <Newspaper className="w-10 h-10 text-purple-600" />,
    title: '设计新闻Agent',
    description: '自动获取科技公司的最新设计动态和新闻',
    available: true,
    href: '/ai-chat/design-news',
  },
];
```

- [ ] **Step 5: Update JSX to render icon components**

Change the icon rendering in the cards:

```typescript
// Change from:
// <div className="text-4xl mb-4">{agent.icon}</div>

// To:
<div className="mb-4">{agent.icon}</div>
```

- [ ] **Step 6: Update design news page icon (if needed)**

If icons are updated, also update the design news page title:

```typescript
// In brand-space-web/app/ai-chat/design-news/page.tsx
import { Newspaper } from 'lucide-react';

// Update the title:
<h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
  <Newspaper className="w-6 h-6 text-purple-600" />
  <span>设计新闻Agent</span>
</h1>
```

- [ ] **Step 7: Test icon updates in browser**

Commands:
```bash
cd brand-space-web
npm run dev
```

Open: http://localhost:3000/ai-chat

Verify:
- Scroll to agent cards section
- New icons render correctly
- Icons are properly sized and colored
- Design news page title icon updated
- All icons look professional and consistent

Expected: Professional icons replace emoji with consistent styling.

- [ ] **Step 8: Commit changes**

```bash
git add brand-space-web/app/ai-chat/page.tsx brand-space-web/app/ai-chat/design-news/page.tsx brand-space-web/package.json
git commit -m "feat: optimize agent icons with professional icon library

- Replace emoji icons with lucide-react icons
- Add TrendingUp, FolderOpen, Newspaper icons
- Update icon styling for consistency
- Apply to both main page and design news page

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 6: Final Testing and Polish

**Files:**
- None (testing only)

- [ ] **Step 1: Full page flow test**

Commands:
```bash
cd brand-space-web
npm run dev
```

Test flow:
1. Open http://localhost:3000/ai-chat
2. Verify chat interface is prominent and occupies first screen
3. Test sending a message in design standard consultation
4. Scroll down to see agent cards
5. Verify hover effects on enabled card
6. Click design news agent card
7. Verify navigation to /ai-chat/design-news
8. Test return button
9. Test sending message in design news mode
10. Verify Markdown rendering

- [ ] **Step 2: Responsive layout test**

Test on different screen sizes:
1. Desktop (1920x1080): Verify 3-column agent card layout
2. Tablet (768x1024): Verify 2-column agent card layout
3. Mobile (375x667): Verify 1-column agent card layout
4. Test chat interface responsiveness
5. Verify fixed nav bar on mobile

Expected: All layouts work smoothly without overflow or layout breaks.

- [ ] **Step 3: Interaction test**

Test all interactive elements:
1. Chat input focus and keyboard navigation (Enter key)
2. Send button disabled state when input is empty
3. Loading state animation during API call
4. Message animations (fade in)
5. Card hover animations
6. Button hover and tap animations

Expected: All animations smooth, no lag or glitches.

- [ ] **Step 4: API integration test**

Test actual API calls:
1. Send message in design standard mode
2. Verify response from API
3. Send message in design news mode
4. Verify Markdown formatted response
5. Test error handling (if API fails)

Expected: Both modes work correctly with proper API integration.

- [ ] **Step 5: Cross-browser test (optional)**

Test in different browsers if available:
- Chrome
- Firefox
- Safari
- Edge

Expected: Consistent behavior across browsers.

- [ ] **Step 6: Document any issues found**

If any issues are found during testing, create todos to fix them before proceeding.

- [ ] **Step 7: Final commit (if any fixes were made)**

```bash
git add .
git commit -m "fix: polish UI and interaction details

- Fix any layout issues found in testing
- Adjust animations for smoother experience
- Improve responsive behavior

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Self-Review Checklist

### Spec Coverage

✅ **Main page refactor:**
- Remove mode switching cards - Task 1
- Simplify state management - Task 1
- Adjust chat layout for full-screen - Task 2
- Add "More AI Assistants" section - Task 3

✅ **Design news page:**
- Create independent page at /ai-chat/design-news - Task 4
- Fixed navigation bar with return button - Task 4
- Chat interface with design-news mode - Task 4
- Markdown rendering support - Task 4

✅ **Icon optimization:**
- Replace emoji with professional icons - Task 5

✅ **Testing and polish:**
- Full integration testing - Task 6

### Placeholder Check

Scanned for "TBD", "TODO", "implement later", "add validation", "similar to", incomplete sections:
- ✅ No placeholders found
- ✅ All code blocks are complete
- ✅ All steps have specific commands and expected output
- ✅ Icon implementation includes fallback (UI skill may recommend keeping emoji)

### Type Consistency

Verified consistency across tasks:
- ✅ `Message` interface used consistently
- ✅ `handleSendMessage` function signature matches in both pages
- ✅ API call structure matches (`mode`, `message` parameters)
- ✅ State variable names consistent (`messages`, `inputValue`, `isLoading`)
- ✅ Class names follow same Tailwind patterns

### Testing Coverage

✅ Each task includes browser testing step
✅ Task 6 provides comprehensive end-to-end testing
✅ Responsive testing included
✅ Interaction testing included
✅ API integration testing included

---

## Success Criteria

- [ ] Main AI chat page focuses on design standard consultation
- [ ] Mode switching cards removed from main page
- [ ] Chat interface occupies full first screen with appropriate height
- [ ] "More AI Assistants" section appears below chat (on scroll)
- [ ] Three agent cards display correctly with proper states
- [ ] Design news agent card links to /ai-chat/design-news
- [ ] Design news page has working navigation and chat
- [ ] Markdown rendering works in design news mode
- [ ] Icons are professional and consistent
- [ ] All animations smooth and responsive
- [ ] Mobile/tablet layouts work correctly
- [ ] Both chat modes work with backend API

---

## Notes

**About Icon Selection:**
Task 5 explicitly calls for invoking the UI skill to get icon recommendations. The skill may:
1. Recommend using an icon library (like lucide-react)
2. Suggest keeping emoji for simplicity
3. Provide custom SVG icons

The plan includes steps for the most likely outcome (icon library), but can adapt based on UI skill recommendations.

**About Testing:**
Since this is primarily a UI refactor, manual browser testing is the primary verification method. Each task includes a specific testing step with clear verification criteria.

**About Commits:**
Commits are frequent (after each major task) and follow conventional commit format with descriptive messages and co-authorship attribution.
