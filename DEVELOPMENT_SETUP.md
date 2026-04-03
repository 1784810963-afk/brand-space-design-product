# 本地开发环境设置指南

## 问题记录

**时间**：2026-04-01
**问题**：本地开发环境（localhost）显示黑色矩形，线上 Vercel 部署正常
**根本原因**：本地无法访问内部 Feishu 后端服务器，导致图片加载失败

## 解决方案架构

### 环境差异处理

```
本地开发环境 (localhost:3000/3002)
├─ NEXT_PUBLIC_ENV=development
├─ 加载本地 project-images 目录中的图片
└─ 快速构建测试

生产部署环境 (Vercel)
├─ NEXT_PUBLIC_ENV=production (默认)
├─ 加载 Feishu 后端真实图片
└─ cfe-doc-backend.inner.chj.cloud 访问正常
```

## 实施细节

### 1. 环境变量配置

**文件**：`brand-space-web/.env.local`

```bash
# Google Gemini API 配置
GEMINI_API_KEY=AIzaSyDeLujM3Pfqc95cFLecB6zFxVCCqAkKx-Y

# 本地开发环境标识
NEXT_PUBLIC_ENV=development
```

### 2. 项目图片存储

**位置**：`brand-space-web/public/project-images/`

包含 47 张项目卡片、详情页及创意专项设计的真实图片：
- 零售空间：4 项目，11 张图片
- 活动空间：5 项目，25 张图片
- 配套空间：1 项目，3 张图片
- 创意专项：2 项目，8 张图片

### 3. 图片 URL 映射

**文件**：`brand-space-web/data/projects.ts`

核心逻辑：

```typescript
// Feishu file_key 到本地路径的映射
const feishuToLocalImageMap: Record<string, string> = {
  '28126bc6-1b79-46a8-9a9b-1620eb9ac8c2': '/project-images/28126bc6-1b79-46a8-9a9b-1620eb9ac8c2.jpg',
  // ... 47 个映射条目
};

// 从 Feishu URL 提取 file_key
function extractFileKey(url: string): string | null {
  const match = url.match(/file_key=feishu-service\/([a-f0-9-]+)/);
  return match ? match[1] : null;
}

// 根据环境处理图片 URL
function processProjectImages(projects: Project[]): Project[] {
  const isDevelopment = process.env.NEXT_PUBLIC_ENV === 'development';

  if (!isDevelopment) {
    return projects; // 生产环境：使用原始 Feishu URL
  }

  // 开发环境：转换为本地路径
  return projects.map(project => ({
    ...project,
    image: feishuUrlToLocal(project.image),
    images: project.images?.map(url => feishuUrlToLocal(url))
  }));
}
```

## 使用方式

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器（使用本地图片）
npm run dev
# 访问 http://localhost:3000 或 http://localhost:3002

# 构建生产版本（验证无破坏性改动）
npm run build

# 运行生产构建本地预览
npm start
```

### 生产部署

```bash
# Vercel 环境自动使用 .env.production 设置
# 生产构建时 NEXT_PUBLIC_ENV 不设置或为 production
# 所有图片自动加载 Feishu 后端 URL

# 验证生产构建
npm run build
npm start
```

## 验证清单

### 本地开发验证 ✅

- [ ] `.env.local` 包含 `NEXT_PUBLIC_ENV=development`
- [ ] `public/project-images/` 目录存在且包含 47 张 JPG 图片
- [ ] 运行 `npm run dev` 成功启动服务器
- [ ] 访问首页、项目列表、项目详情页，所有图片正常显示
- [ ] 浏览器 DevTools Network 标签页显示所有图片来自 `/project-images/`

### 生产部署验证 ✅

- [ ] `npm run build` 完成无错误
- [ ] Vercel 部署完成
- [ ] 访问线上链接，所有图片正常加载
- [ ] 浏览器 Network 标签页显示图片来自 `cfe-doc-backend.inner.chj.cloud`

## 文件结构

```
brand-space-web/
├── .env.local                           # 本地环境变量（NEXT_PUBLIC_ENV=development）
├── public/
│   └── project-images/                  # 本地项目图片（47 张）
│       ├── 28126bc6-1b79-46a8-9a9b-1620eb9ac8c2.jpg
│       ├── b28dd5c5-de7e-49dc-a73d-1425f89c4a65.jpg
│       └── ... 其他 45 张图片
├── data/
│   └── projects.ts                      # 项目数据（包含图片映射逻辑）
├── next.config.ts                       # 允许 Feishu 后端 URL
└── app/
    ├── page.tsx                         # 首页（使用 ProjectCard）
    ├── projects/
    │   ├── page.tsx                     # 项目列表
    │   └── [id]/page.tsx                # 项目详情
    └── standards/
        └── page.tsx                     # 设计标准页面
```

## 常见问题排查

### Q: 本地还是显示黑色矩形？

**A: 检查以下几点：**

1. 确认 `.env.local` 存在且包含 `NEXT_PUBLIC_ENV=development`
2. 清理缓存：`rm -r .next/`
3. 重启开发服务器
4. 检查 `public/project-images/` 目录是否存在且有图片
5. 打开浏览器 DevTools，查看 Network 标签页的图片请求状态

### Q: 生产部署后看不到图片？

**A: 检查以下几点：**

1. 确认 `.env.production` 或 Vercel 环境变量未设置 `NEXT_PUBLIC_ENV=development`
2. 确认部署分支是最新代码
3. 在 Vercel Dashboard 检查环境变量设置
4. 查看部署日志是否有构建错误

### Q: 如何添加新的项目图片？

**A: 步骤：**

1. 从 Feishu 文档获取图片 URL
2. 提取 `file_key` (UUID 部分)
3. 下载图片到 `public/project-images/` 目录
4. 在 `data/projects.ts` 中添加映射到 `feishuToLocalImageMap`

## 持续改进建议

### 短期（已实施）
- ✅ 本地开发使用真实图片而非占位符
- ✅ 自动根据环境选择图片源
- ✅ 生产构建无影响

### 中期（建议实施）
- [ ] 添加图片自动下载脚本 (`scripts/sync-images.js`)
- [ ] 创建 GitHub Actions 工作流验证构建
- [ ] 添加图片加载错误降级处理

### 长期（架构优化）
- [ ] 评估使用 CDN 代理内部图片服务器
- [ ] 实现本地图片缓存刷新机制
- [ ] 建立图片资源管理系统

## Git 提交

所有更改已通过以下文件进行：

```bash
git add \
  brand-space-web/.env.local \
  brand-space-web/data/projects.ts \
  brand-space-web/public/project-images/

git commit -m "feat: Add local development image support for Feishu backend URLs

- Download all 47 project images from Feishu wiki
- Implement automatic URL mapping for development vs production
- Add feishuToLocalImageMap for image path resolution
- Support NEXT_PUBLIC_ENV environment variable for environment detection
- Development environment loads local images from /project-images
- Production environment continues using Feishu backend URLs
"
```

---

**最后更新**：2026-04-01
**维护者**：AI Assistant
