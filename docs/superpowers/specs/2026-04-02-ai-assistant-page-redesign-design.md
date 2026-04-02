# AI助手页面改版设计文档

## 概述

改造AI助手页面，将其拆分为两个部分：
1. 第一屏：设计标准咨询的完整聊天界面
2. 第二屏（向下滚动可见）：展示3个专业Agent的推广卡片

同时创建设计新闻Agent的独立页面，为未来其他Agent的扩展做准备。

## 设计目标

- 突出设计标准咨询作为核心功能
- 为其他专业Agent提供独立的使用空间
- 保持页面简洁，避免功能选择的混乱
- 最小化改动，快速实现

## 页面结构

### 1. 主页面改造 (`/ai-chat/page.tsx`)

#### 1.1 移除内容
- **删除顶部4个模式切换卡片**
  - 移除 `modes` 数组中的所有卡片渲染
  - 移除相关的网格布局代码（`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4`）

- **简化状态管理**
  - 移除 `mode` 状态的切换逻辑
  - 固定 `mode` 为 `'standard'`（或直接在API调用时硬编码）
  - 保留 `messages`、`inputValue`、`isLoading` 状态

#### 1.2 保留内容
- 页面顶部标题区域（"AI 设计助手" + 副标题）
- 完整的聊天界面（消息列表 + 输入框 + 发送按钮）
- 所有聊天相关的状态管理和API调用逻辑
- 底部提示信息区域

#### 1.3 新增内容：更多AI助手区域

**位置：** 在聊天界面下方（通过滚动可见）

**区域标题：**
```jsx
<section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-white to-purple-50">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
        探索更多AI能力
      </h2>
      <p className="text-lg text-gray-600">
        专业的设计分析和资讯获取工具
      </p>
    </div>

    {/* 3个Agent卡片 */}
  </div>
</section>
```

**3个Agent卡片：**

1. **设计趋势分析**
   - 图标：需要通过UI skill优化（当前为 🎯）
   - 标题："设计趋势分析"
   - 描述："分析最新的设计趋势和市场动向"
   - 按钮："即将上线"（灰色禁用状态，`disabled` 属性）

2. **案例获取**
   - 图标：需要通过UI skill优化（当前为 📂）
   - 标题："案例获取"
   - 描述："智能推荐相关的成功案例和最佳实践"
   - 按钮："即将上线"（灰色禁用状态，`disabled` 属性）

3. **设计新闻Agent**
   - 图标：需要通过UI skill优化（当前为 📰）
   - 标题："设计新闻Agent"
   - 描述："自动获取科技公司的最新设计动态和新闻"
   - 按钮：`<Link href="/ai-chat/design-news">立即体验</Link>`（紫色激活状态）

**卡片样式规范：**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* 每个卡片 */}
  <motion.div
    whileHover={{ scale: 1.03, y: -5 }}
    className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all"
  >
    <div className="text-4xl mb-4">{/* 图标 */}</div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{/* 标题 */}</h3>
    <p className="text-gray-600 mb-4">{/* 描述 */}</p>
    {/* 按钮或链接 */}
  </motion.div>
</div>
```

#### 1.4 布局调整

**第一屏：设计标准咨询**
- 整个主体区域（包含标题和聊天）设置为 `min-h-screen`，占满整个视口
- 聊天容器高度从固定的 `h-[600px]` 改为更大的高度（如 `h-[calc(100vh-16rem)]` 或 `min-h-[70vh]`），让聊天区域更突出
- 用户进入页面时看到完整的聊天界面，无需滚动即可开始对话

**第二屏：更多AI助手**
- 自然出现在第一屏下方
- 用户向下滚动时可见
- 背景色使用渐变（`bg-gradient-to-b from-white to-purple-50`）以区分区域

### 2. 设计新闻Agent独立页面 (`/ai-chat/design-news/page.tsx`)

#### 2.1 页面路径
- 路由：`/ai-chat/design-news`
- 文件位置：`brand-space-web/app/ai-chat/design-news/page.tsx`

#### 2.2 页面结构

**顶部导航栏：**
```jsx
<nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
    <Link href="/ai-chat">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        ← 返回
      </motion.button>
    </Link>
    <div>
      <h1 className="text-xl font-bold text-gray-900">📰 设计新闻Agent</h1>
      <p className="text-sm text-gray-600">实时追踪科技公司的设计动态</p>
    </div>
  </div>
</nav>
```

**聊天界面：**
- 复用主页面的聊天界面结构（复制粘贴代码）
- 添加 `pt-24`（top padding）以避免被固定导航栏遮挡
- 占满整个视口（`min-h-screen`）

**默认欢迎消息：**
```typescript
const [messages, setMessages] = useState<Message[]>([
  {
    id: '1',
    role: 'assistant',
    content: '你好！我是设计新闻Agent 📰\n\n我可以帮你获取以下科技公司的最新设计动态：\n\n• Apple - iOS、macOS 设计更新\n• 华为 - HarmonyOS 界面设计\n• 蔚来 - 汽车 UI/UX 创新\n• 小米 - MIUI 设计趋势\n\n试试输入公司名称，或直接问我"最近有什么设计新闻？"'
  }
]);
```

#### 2.3 功能配置

**固定模式：**
- 设置 `const mode = 'design-news'`（常量，不需要状态）
- API调用时传递 `mode: 'design-news'`

**Markdown支持：**
- 保持主页面的Markdown渲染逻辑
- 使用 `ReactMarkdown` 组件和自定义样式

**输入框提示：**
```jsx
placeholder="试试输入：apple 或 华为最近有什么设计动态？"
```

#### 2.4 样式一致性

- 使用与主页面相同的紫色主题（`purple-600`）
- 相同的圆角（`rounded-lg`, `rounded-2xl`）
- 相同的阴影和hover效果
- 相同的framer-motion动画参数

### 3. 代码复用策略

#### 3.1 不提取共享组件（当前阶段）

**理由：**
- 保持实现简单，避免过度工程
- 两个页面代码量不大，复制粘贴更直观
- 便于快速迭代和调整

**实现方式：**
- 主页面保留完整的聊天逻辑
- 设计新闻页面复制粘贴相同的聊天代码
- 两个页面独立维护各自的状态

#### 3.2 API复用

**后端API：** `/api/chat/route.ts`（无需修改）

**调用参数：**
- 主页面：`{ message: userInput, mode: 'standard' }`
- 设计新闻页面：`{ message: userInput, mode: 'design-news' }`

#### 3.3 样式复用

- 使用相同的Tailwind类名
- 复制相同的JSX结构
- 保持动画效果一致

### 4. 图标优化（UI Skill）

#### 4.1 需要优化的图标

当前使用emoji图标，需要通过UI skill优化为更专业的图标：

1. **设计趋势分析** - 当前 🎯
   - 建议：趋势图表图标、上升箭头图标

2. **案例获取** - 当前 📂
   - 建议：文件夹图标、画廊图标、收藏图标

3. **设计新闻Agent** - 当前 📰
   - 建议：报纸图标、新闻图标、RSS图标

#### 4.2 图标实现方式

选项A：使用图标库（推荐）
- 安装 `lucide-react` 或使用现有图标库
- 选择合适的图标组件
- 统一尺寸和颜色

选项B：SVG图标
- 直接使用SVG代码
- 灵活性高，但维护成本大

选项C：保留emoji
- 如果UI skill建议保留emoji，则无需修改

## 技术细节

### 状态管理

**主页面 (`/ai-chat/page.tsx`)：**
```typescript
const [messages, setMessages] = useState<Message[]>([...]);
const [inputValue, setInputValue] = useState('');
const [isLoading, setIsLoading] = useState(false);
// 移除 mode 状态
```

**设计新闻页面 (`/ai-chat/design-news/page.tsx`)：**
```typescript
const mode = 'design-news'; // 常量
const [messages, setMessages] = useState<Message[]>([...]);
const [inputValue, setInputValue] = useState('');
const [isLoading, setIsLoading] = useState(false);
```

### API调用

**主页面：**
```typescript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: userInput,
    mode: 'standard', // 固定
  }),
});
```

**设计新闻页面：**
```typescript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: userInput,
    mode: 'design-news', // 固定
  }),
});
```

### 路由和导航

**卡片链接：**
```jsx
<Link href="/ai-chat/design-news">
  <motion.button className="...">
    立即体验
  </motion.button>
</Link>
```

**返回按钮：**
```jsx
<Link href="/ai-chat">
  <motion.button className="...">
    ← 返回
  </motion.button>
</Link>
```

## 响应式设计

### 主页面

**模式卡片区域（已删除）：** N/A

**聊天界面：**
- 移动端：`max-w-full`
- 桌面端：`max-w-5xl mx-auto`
- 高度：`h-[600px]` → 改为 `min-h-[70vh]`

**更多AI助手卡片：**
- 移动端：`grid-cols-1`（单列）
- 平板：`md:grid-cols-2`（双列）
- 桌面：`lg:grid-cols-3`（三列）

### 设计新闻页面

**导航栏：**
- 固定顶部：`fixed top-0`
- 响应式padding：`px-4 sm:px-6 lg:px-8`

**聊天界面：**
- 与主页面保持一致
- 添加顶部padding避免被导航栏遮挡：`pt-24`

## 动画效果

### Framer Motion配置

**卡片hover效果：**
```jsx
<motion.div
  whileHover={{ scale: 1.03, y: -5 }}
  transition={{ duration: 0.2 }}
>
```

**按钮点击效果：**
```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
```

**页面进入动画：**
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
```

## 未来扩展

### 添加其他Agent页面

当需要添加"设计趋势分析"或"案例获取"页面时：

1. 创建新路由：
   - `/ai-chat/trend/page.tsx`（设计趋势分析）
   - `/ai-chat/case/page.tsx`（案例获取）

2. 复制设计新闻页面的代码结构

3. 修改：
   - 页面标题和图标
   - 默认欢迎消息
   - API调用的 `mode` 参数
   - placeholder提示文本

4. 更新主页面的卡片链接：
   - 将"即将上线"按钮改为 `<Link>`
   - 移除 `disabled` 属性

### 提取共享组件（可选）

如果未来需要更多Agent页面，可以考虑提取：

1. **`ChatInterface`组件：**
   - Props: `mode`, `welcomeMessage`, `placeholder`
   - 封装聊天界面的完整逻辑

2. **`AgentNavBar`组件：**
   - Props: `title`, `subtitle`, `backUrl`
   - 封装顶部导航栏

3. **`AgentCard`组件：**
   - Props: `icon`, `title`, `description`, `href`, `available`
   - 封装Agent推广卡片

## 成功标准

### 功能验证

- [ ] 主页面默认显示设计标准咨询聊天界面
- [ ] 主页面第一屏占满视口，聊天体验流畅
- [ ] 向下滚动可以看到3个Agent卡片
- [ ] 点击"设计新闻Agent"卡片可以跳转到独立页面
- [ ] 其他2个卡片显示"即将上线"且不可点击
- [ ] 设计新闻页面的返回按钮工作正常
- [ ] 设计新闻页面的聊天功能与主页面一致
- [ ] Markdown渲染在设计新闻页面正常工作

### 视觉验证

- [ ] 两个页面的样式风格一致
- [ ] 卡片hover动画流畅
- [ ] 响应式布局在不同设备上正常
- [ ] 固定导航栏不遮挡内容
- [ ] 图标显示专业（UI skill优化后）

### 性能验证

- [ ] 页面加载速度正常
- [ ] 动画不卡顿
- [ ] API调用响应时间合理

## 实现顺序

1. **改造主页面**
   - 移除模式切换卡片
   - 简化状态管理
   - 调整聊天界面布局（min-h-screen）
   - 添加"更多AI助手"区域
   - 实现3个Agent卡片（暂用emoji图标）

2. **创建设计新闻页面**
   - 创建新文件和路由
   - 实现导航栏
   - 复制聊天界面代码
   - 配置固定mode和欢迎消息
   - 测试功能

3. **图标优化**
   - 调用UI skill获取图标建议
   - 实现专业图标
   - 替换emoji

4. **测试和优化**
   - 功能测试
   - 响应式测试
   - 动画优化
   - 细节调整

## 风险和注意事项

### 潜在问题

1. **聊天历史丢失**
   - 问题：页面切换时聊天历史不保留
   - 影响：用户体验略有下降
   - 缓解：如果未来需要，可以使用localStorage或状态管理库

2. **代码重复**
   - 问题：两个页面有大量重复代码
   - 影响：维护成本略高
   - 缓解：保持代码结构一致，便于批量修改

3. **路由结构不统一**
   - 问题：设计标准咨询在 `/ai-chat`，其他Agent在子路由
   - 影响：语义上略显不一致
   - 缓解：文档中明确说明路由设计意图

### 注意事项

- 确保后端API支持所有mode类型（standard, design-news, trend, case）
- 测试Markdown渲染的所有边缘情况
- 确保移动端的体验流畅（特别是固定导航栏）
- 保持与现有设计系统的一致性

## 总结

本设计通过最小化改动，实现了AI助手页面的功能分离和优化：

- **核心改进：** 突出设计标准咨询作为主要功能
- **扩展性：** 为其他Agent提供独立页面的架构基础
- **用户体验：** 清晰的视觉层次和流畅的交互体验
- **技术实现：** 简单直接，易于维护和迭代

后续可根据用户反馈和使用数据，逐步优化和扩展功能。
