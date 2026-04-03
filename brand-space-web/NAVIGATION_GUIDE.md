# Apple 风格项目详情页 - 快速访问指南

## 🌐 在线访问

### 本地开发环境

启动开发服务器后，访问以下地址：

```
http://localhost:3000/projects/megahome-2025
```

或

```
http://localhost:3002/projects/megahome-2025
（如果 3000 端口被占用）
```

## 📍 页面导航

### 从项目列表链接到这个页面

在 `app/projects/page.tsx` 中，可以添加一个特殊卡片来展示 Apple 风格项目页：

```jsx
// 示例：在项目列表中添加链接
<Link
  href="/projects/megahome-2025"
  className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900 to-slate-950 p-6 h-64 flex flex-col justify-end text-white hover:shadow-2xl transition-all"
>
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
  <div className="relative z-10">
    <h3 className="text-2xl font-light mb-2">2025 双旗舰巡展</h3>
    <p className="text-white/70 text-sm mb-4">Apple 官网风格详情页</p>
    <div className="flex items-center gap-2 text-white/50 group-hover:text-white transition-colors">
      <span>查看详情</span>
      <ChevronRight className="w-4 h-4" />
    </div>
  </div>
</Link>
```

### 从首页添加推荐

在 `app/page.tsx` 中，可以添加一个推荐卡片：

```jsx
// 示例：在首页特色案例中
<motion.div className="relative group overflow-hidden rounded-2xl">
  <Link href="/projects/megahome-2025">
    <div className="relative h-80 overflow-hidden">
      <Image
        src="/project-images/2f175aab-8e37-4e18-8ed3-65b965996223.jpg"
        alt="2025 双旗舰巡展"
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      <div className="absolute bottom-6 left-6 right-6 text-white">
        <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs mb-3 backdrop-blur">
          Apple 设计风格
        </span>
        <h3 className="text-2xl font-light">2025 双旗舰巡展</h3>
      </div>
    </div>
  </Link>
</motion.div>
```

## 🎯 页面内链接结构

### Hero Section
- **标题**：飞屋 环游季
- **按钮**：探索项目 → 平滑滚动到 #details

### 导航链接（建议添加）

在新页面添加返回链接：

```jsx
// 在 megahome-2025/page.tsx 中添加
<Link
  href="/projects"
  className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
>
  <ArrowLeft className="w-4 h-4" />
  返回项目列表
</Link>
```

## 🖼️ 完整的页面组成

### URL 结构

```
/projects
├── /projects                    # 项目列表（所有项目卡片）
├── /projects/[id]             # 动态项目详情页（通用模板）
│   ├── /projects/project-1    # 上海前滩 L+PLAZA
│   ├── /projects/project-2    # 上海长宁来福士
│   └── ...
└── /projects/megahome-2025    # Apple 风格特殊详情页
```

### 页面特点对比

| 特性 | 通用详情页 `/projects/[id]` | Apple 风格页 `/projects/megahome-2025` |
|------|--------------------------|--------------------------------------|
| 样式 | 蓝色主题 + 标准 UI | 黑白极简 + Apple 官网风格 |
| 动画 | 基础 Framer Motion | 高级 Framer Motion 动画 |
| 布局 | 标准网格 | 创意分段式布局 |
| 图片 | 简单展示 | 交互式图片库 |
| 交互 | 基础交互 | 丰富的交互体验 |
| 响应式 | 支持 | 完全响应式 |

## 🚀 如何集成到项目列表

### 方案 A：添加为特殊展示项（推荐）

在 `projects/page.tsx` 中，在项目网格前添加：

```jsx
<div className="mb-12">
  <h2 className="text-2xl font-bold mb-6">精选案例</h2>
  <div className="rounded-lg overflow-hidden shadow-lg bg-gradient-to-r from-slate-900 to-slate-950">
    <Link href="/projects/megahome-2025" className="flex h-80 group">
      <div className="flex-1 relative">
        <Image
          src="/project-images/2f175aab-8e37-4e18-8ed3-65b965996223.jpg"
          alt="2025 双旗舰巡展"
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="flex-1 p-8 flex flex-col justify-center text-white">
        <span className="text-xs font-medium text-white/60 mb-2">Apple 设计风格</span>
        <h3 className="text-3xl font-light mb-4">2025 双旗舰巡展</h3>
        <p className="text-white/70 mb-6 leading-relaxed">
          理想同学环游季 - 跨越四城的创意巡展体验
        </p>
        <div className="flex items-center gap-2 text-white/50 group-hover:text-white transition-colors">
          <span className="text-sm">探索项目</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  </div>
</div>
```

### 方案 B：作为项目列表项

在项目数据中添加一个特殊的"featured"字段，然后在列表中突出显示：

```jsx
{projects.map((project) => (
  project.featured ? (
    <Link key={project.id} href={`/projects/megahome-2025`}>
      {/* 特殊渲染 */}
    </Link>
  ) : (
    <ProjectCard key={project.id} project={project} />
  )
))}
```

## 📊 用户流程

### 用户访问路径 1：从首页
```
首页
  ↓
特色案例卡片（轮播或展示）
  ↓
点击 "2025 双旗舰巡展"
  ↓
/projects/megahome-2025（Apple 风格详情页）
```

### 用户访问路径 2：从项目列表
```
/projects（项目列表）
  ↓
精选案例区域或项目卡片
  ↓
点击项目
  ↓
/projects/megahome-2025（Apple 风格详情页）
```

### 用户访问路径 3：直接链接
```
用户获得分享链接：localhost:3000/projects/megahome-2025
  ↓
直接访问
  ↓
页面加载
```

## 🔗 推荐的导航实现

### 添加面包屑导航（Breadcrumb）

在 `megahome-2025/page.tsx` 顶部添加：

```jsx
// 面包屑导航
<div className="max-w-6xl mx-auto px-4 md:px-8 py-4">
  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
    <Link href="/" className="hover:text-slate-900 dark:hover:text-white">
      首页
    </Link>
    <span>/</span>
    <Link href="/projects" className="hover:text-slate-900 dark:hover:text-white">
      项目案例
    </Link>
    <span>/</span>
    <span className="text-slate-900 dark:text-white font-medium">
      2025 双旗舰巡展
    </span>
  </div>
</div>
```

### 添加相关项目推荐

在 CTA Section 之前添加：

```jsx
<section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
  <h2 className="text-4xl md:text-5xl font-light mb-12 text-slate-900 dark:text-white">
    相关项目
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {projects
      .filter(p => p.category === '活动空间' && p.id !== 'project-7')
      .slice(0, 3)
      .map(project => (
        <Link key={project.id} href={`/projects/${project.id}`}>
          <ProjectCard project={project} />
        </Link>
      ))}
  </div>
</section>
```

## 📱 移动端适配

### 移动端导航（推荐）

```jsx
// 在 megahome-2025/page.tsx 中
{/* 移动端返回按钮 */}
<motion.button
  onClick={() => router.back()}
  className="fixed top-20 left-4 z-40 md:hidden p-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur"
>
  <ArrowLeft className="w-5 h-5 text-slate-900 dark:text-white" />
</motion.button>
```

## 🎨 样式一致性

### 颜色主题保持
- 使用相同的深色模式类 (`dark:bg-slate-900` 等)
- 保持 Tailwind 色卡一致
- 确保对比度符合 WCAG AA 标准

### 字体一致性
- `font-light` 用于标题
- `leading-relaxed` 用于段落
- 保持相同的字体栈

## 📈 性能考虑

### 图片加载优化

```jsx
// Hero 图片优先加载
<Image src={heroImage} priority quality={90} />

// 其他图片延迟加载
<Image src={otherImage} quality={75} />
```

### 代码分割

页面已自动分割为独立的 chunk，无需额外配置。

## 🔍 SEO 优化

建议添加 Next.js metadata：

```jsx
// app/projects/megahome-2025/page.tsx
export const metadata = {
  title: '2025 双旗舰巡展 - 理想同学环游季 | 品牌空间设计',
  description: '跨越四城的创意巡展体验。理想同学化身飞屋，在北京、上海、深圳、青岛四地展开创意之旅。',
  keywords: '巡展, 创意设计, 品牌体验, 装置艺术',
};
```

## ✅ 部署检查清单

- [ ] 页面在本地 http://localhost:3000 正常显示
- [ ] 深色模式切换正常
- [ ] 移动端响应式布局正确
- [ ] 所有图片加载正常
- [ ] 动画流畅（无卡顿）
- [ ] 链接导航正常
- [ ] 性能指标满足要求（Lighthouse 90+）
- [ ] 无控制台错误
- [ ] 在 Vercel 部署后正常访问

---

**快速访问**：http://localhost:3000/projects/megahome-2025
**开发服务器**：`npm run dev`
**最后更新**：2026-04-01
