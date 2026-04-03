# Apple 风格项目详情页 - 2025 双旗舰巡展

## 📋 页面概览

位置：`app/projects/megahome-2025/page.tsx`

这是一个完全独立的 Apple 官网风格详情页，展示"2025 款双旗舰巡展 - 理想同学环游季"项目的设计与内容。

## 🎨 设计系统

### 设计理念（Apple 官网风格）

| 方面 | 实现 |
|------|------|
| **排版** | 极简、轻字体（font-light）、充分留白 |
| **配色** | 黑白灰为主，支持深色模式（dark mode） |
| **图片** | 大尺寸英雄区、高质量产品摄影 |
| **动画** | 优雅的进入动画，framer-motion |
| **间距** | 宽敞的 padding/margin，呼吸感 |
| **组件** | 卡片、网格、时间轴、图片库 |

### 色彩系统

```
Light Mode:
- 背景：#FFFFFF (white)
- 文本主：#0F172A (slate-900)
- 文本次：#475569 (slate-600)
- 文本弱：#94A3B8 (slate-400)
- 背景次：#F8FAFC (slate-50)

Dark Mode:
- 背景：#020617 (slate-900)
- 文本主：#FFFFFF (white)
- 文本次：#CBD5E1 (slate-300)
- 文本弱：#94A3B8 (slate-400)
- 背景次：#1E293B (slate-800)
```

### 排版

- **标题**：`text-4xl md:text-5xl font-light`（轻字体）
- **副标题**：`text-xl md:text-2xl font-light`
- **正文**：`text-lg text-slate-600 leading-relaxed`
- **小字**：`text-sm text-slate-500`
- **强调**：使用颜色和大小，不用加粗

## 🏗️ 页面结构

### 1. Hero Section（英雄区）
- 全屏背景图片
- 深色图片叠加层
- 浮窗式内容卡片（玻璃态效果）
- 响应式标题和描述
- CTA 按钮 + 滚动指示器

```jsx
// 英雄区关键代码
<section className="relative h-screen flex items-center justify-center overflow-hidden">
  {/* 背景图片 + 渐变叠加 */}
  {/* 内容卡片 - 中心对齐，文字为白色 */}
</section>
```

### 2. Details Section（详情概览）
- 项目标题和描述
- 3 列规格卡片
  - 展示面积：150 ㎡
  - 建设周期：22 天
  - 巡展城市：4 座

### 3. Cities Section（环游四城）
- 4 个城市切换卡片
- 交互式卡片选中状态
- 城市信息展示（位置 + 日期）

### 4. Timeline Section（制作时间线）
- 垂直时间线设计
- 4 个阶段卡片
  - 概念设计（1-5 天）
  - 创意制作（6-15 天）
  - 生产制造（16-20 天）
  - 现场布置（21-22 天）

### 5. Gallery Section（项目图集）
- 大尺寸特色图片展示
- 12 张项目照片的缩略图网格
- 点击缩略图更新大图
- 选中状态视觉反馈

### 6. Concept Section（创意概念）
- 概念描述文本
- 3 个概念亮点卡片
  - 核心理念
  - 体验设计
  - 社群价值

### 7. CTA Section（行动号召）
- 深色背景突出
- 两个按钮
  - 获取完整案例
  - 查看其他项目

## 🎬 动画效果

所有动画都使用 framer-motion，遵循 Apple 风格的优雅原则：

```typescript
// 进入动画示例
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  {/* 内容 */}
</motion.div>

// 交互动画示例
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  {/* 按钮 */}
</motion.button>
```

### 动画时序

| 元素 | 延迟 | 持续 |
|------|------|------|
| Hero 背景 | 0ms | 1200ms |
| Hero 文本 | 300ms | 800ms |
| Details 卡片 | 按顺序 | 500-600ms |
| Gallery 缩略图 | 分阶段 | 300ms |

## 🖼️ 图片集合

使用的 12 张本地项目图片（来自飞书文档下载）：

```
/project-images/
├── 2f175aab-8e37-4e18-8ed3-65b965996223.jpg (Hero 图片)
├── 8164c2fb-09b7-4a09-8be7-ed6fac28c94c.jpg (Gallery 1)
├── daa9681c-f19e-4ddc-88a3-8bbd56e3b83d.jpg (Gallery 2)
└── ... 共 12 张
```

### 图片优化

```jsx
<Image
  src={imageUrl}
  alt={description}
  fill
  className="object-cover"
  quality={90}              // 高质量
  priority               // Hero 图片优先加载
/>
```

## 📱 响应式设计

### 断点覆盖

| 屏幕 | 适配 |
|------|------|
| 375px (mobile) | 单列布局，堆叠卡片 |
| 768px (tablet) | 2 列网格 |
| 1024px (desktop) | 3-4 列网格 |
| 1440px+ (wide) | 最大宽度 max-w-6xl |

### 响应式样式示例

```jsx
// Hero 标题
<h1 className="text-5xl md:text-7xl font-light text-white">
  标题
</h1>

// 网格布局
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {/* 内容 */}
</div>

// 间距
<section className="py-20 px-4 md:px-8">
  {/* 内容 */}
</section>
```

## 🌓 深色模式支持

所有颜色都有明暗模式适配：

```jsx
// 完整深色模式示例
<div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
  {/* 内容 */}
</div>
```

## 🚀 使用方式

### 访问页面

本地开发服务器启动后，访问：
```
http://localhost:3000/projects/megahome-2025
```

### 从项目列表链接

可以在项目列表页面添加链接到这个 Apple 风格页面：

```jsx
// 在 app/projects/page.tsx 中
import Link from 'next/link';

<Link href="/projects/megahome-2025" className="...">
  查看 Apple 风格详情页
</Link>
```

### 数据集成

当前页面使用硬编码的本地图片。如果要与动态项目数据关联：

```jsx
// 替换硬编码数据
import { projects } from '@/data/projects';

const project = projects.find(p => p.id === 'project-7');
// 然后使用 project.images 替代 galleryImages
```

## ✨ 核心特性

### ✅ 已实现

- [x] Apple 官网风格设计
- [x] 完整的页面结构
- [x] 响应式设计（375px-1440px+）
- [x] 深色模式支持
- [x] Framer Motion 动画
- [x] 图片库交互
- [x] 时间轴设计
- [x] 城市切换卡片
- [x] 性能优化（Next.js Image）
- [x] 无障碍设计基础

### 🎯 后续优化方向

- [ ] 添加 SEO meta 标签
- [ ] 性能分析和监测
- [ ] A/B 测试 CTA 按钮
- [ ] 添加评论/分享功能
- [ ] 与 CMS 集成
- [ ] 页面分析跟踪
- [ ] 多语言支持

## 📋 代码质量

### Pre-Delivery 检查清单 ✅

- [x] 无 emoji 图标（使用 Lucide icons）
- [x] 所有图片有 alt 文本
- [x] 悬停状态不导致布局移位
- [x] 深色模式文本对比度充分
- [x] 所有交互元素有 cursor-pointer
- [x] 过渡动画流畅（150-300ms）
- [x] 无水平滚动（移动端）
- [x] 焦点状态清晰（键盘导航）

### 无障碍 (a11y)

```jsx
// 语义化 HTML
<section>
  <h2>标题</h2>
  <p>内容</p>
</section>

// 图片 alt 文本
<Image alt="具体描述" src={...} />

// 交互元素
<button className="...">操作</button>
```

## 📚 参考资源

### 设计系统

基于 UI/UX Pro Max skill 的 Apple 风格指南：

- **排版**：极简、轻字体、充分留白
- **配色**：黑白灰 + 深色模式
- **组件**：卡片、时间轴、图片库
- **交互**：优雅动画、清晰反馈

### 技术栈

- **框架**：Next.js 16 + React 19
- **样式**：Tailwind CSS
- **动画**：Framer Motion
- **图片**：Next.js Image optimization
- **图标**：Lucide React
- **类型**：TypeScript

### 工具链

```bash
# 本地开发
npm run dev

# 构建
npm run build

# 生产运行
npm start
```

## 🔗 相关文件

- `app/projects/megahome-2025/page.tsx` - 页面主体
- `data/projects.ts` - 项目数据（可选集成）
- `app/projects/page.tsx` - 项目列表（可添加链接）
- `public/project-images/` - 项目图片资源

## 💡 扩展建议

### 1. 动态数据集成

```jsx
// 从项目数据读取
const project = projects[6]; // project-7
const heroImage = project.images?.[0];
```

### 2. 添加更多交互

```jsx
// 分享功能
<ShareButton projectId="megahome-2025" />

// 赞/收藏
<FavoriteButton projectId="megahome-2025" />

// 相关项目推荐
<RelatedProjects category={project.category} />
```

### 3. 性能监测

```jsx
// 添加 Core Web Vitals 监测
import { reportWebVitals } from 'next/vitals';

reportWebVitals(metric => {
  console.log(metric);
});
```

---

**设计理念**：极简、优雅、以用户体验为中心
**实现框架**：Apple 官网风格指南
**最后更新**：2026-04-01
