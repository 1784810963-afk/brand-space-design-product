# 快速参考：本地开发环境

## 🚀 快速开始

```bash
cd brand-space-web

# 1. 安装依赖
npm install

# 2. 启动本地开发（使用本地图片）
npm run dev
# 访问 http://localhost:3000 或 http://localhost:3002

# 3. 构建生产版本（验证）
npm run build

# 4. 本地运行生产构建
npm start
```

---

## ✅ 环境检查清单

```bash
# 1. 检查环境变量
cat brand-space-web/.env.local
# 应包含：NEXT_PUBLIC_ENV=development

# 2. 检查图片文件
ls brand-space-web/public/project-images | wc -l
# 应显示：47（47 张图片）

# 3. 清理缓存重启
rm -rf brand-space-web/.next
npm run dev

# 4. 验证开发环境
# 打开 http://localhost:3000
# 检查 DevTools Network 标签页
# 图片应该来自 /project-images
```

---

## 🔧 常见问题速查

| 问题 | 症状 | 解决方案 |
|------|------|--------|
| 黑色矩形 | 页面显示纯黑色块 | 检查 `.env.local`，清除 `.next`，重启 |
| 图片 404 | Network 显示 404 | 检查 `/project-images/` 目录存在 |
| 端口被占用 | 启动失败 | 使用自动分配的端口（3002 等） |
| 环境变量未生效 | 重启后仍无效 | 检查文件名必须是 `.env.local` |

---

## 📁 文件位置速记

```
项目根目录/
├── brand-space-web/
│   ├── .env.local                    ← 本地环境变量
│   ├── public/project-images/        ← 47 张项目图片（关键）
│   ├── data/projects.ts              ← 图片 URL 映射逻辑
│   └── next.config.ts                ← Feishu URL 配置
├── DEVELOPMENT_SETUP.md              ← 详细设置指南
└── LESSONS_LEARNED.md                ← 问题分析和预防策略
```

---

## 🔄 环境对比表

| 配置项 | 本地开发 | 生产部署 |
|-------|--------|--------|
| NEXT_PUBLIC_ENV | development | production |
| 图片来源 | `/project-images/` | Feishu 后端 |
| 启动命令 | `npm run dev` | 自动构建 |
| 端口 | 3000 或自动 | 由 Vercel 分配 |

---

## 📝 提交前检查

```bash
# 确保以下都正常：
npm run build    # ✅ 生产构建成功
npm test         # ✅ 所有测试通过
npm run lint     # ✅ 无代码风格问题

# 检查关键文件
ls -la brand-space-web/.env.local          # ✅ 存在
ls brand-space-web/public/project-images/ # ✅ 47 张图片

# 最后验证
npm start        # ✅ 本地运行生产构建
```

---

## 🎯 核心概念

**为什么需要本地图片？**
- 本地网络无法访问内部 Feishu 服务器
- 生产环境（Vercel）可以正常访问
- 本地图片保证开发流畅

**如何选择图片来源？**
- 自动检测 `NEXT_PUBLIC_ENV` 环境变量
- 开发环境 → 本地图片 `/project-images/`
- 生产环境 → 原始 Feishu URL

**为什么会出现黑色矩形？**
1. 图片 URL 无法访问 → 加载失败
2. Next.js Image 组件显示空白
3. 加上 CSS 黑色渐变 → 整体呈现黑色

---

## 🚨 故障排查流程

```
问题：页面显示黑色矩形

  ↓ 开启浏览器 DevTools (F12)

  ↓ 切换到 Network 标签页

  ↓ 刷新页面

  ↓ 查看图片请求状态

  ├─ Status 200 → 图片加载成功
  │   检查 CSS 样式是否有问题
  │
  └─ Status 404/503 → 图片加载失败
      ↓ 检查 URL 是否正确
      ↓ 确认图片文件存在
      ↓ 检查环境变量设置
      ↓ 清除缓存重试
```

---

## 📞 获取帮助

**快速诊断**：运行以下命令
```bash
# 显示所有诊断信息
echo "Env: $NEXT_PUBLIC_ENV"
ls -la brand-space-web/.env.local
ls brand-space-web/public/project-images | wc -l
cat brand-space-web/.next/BUILD_ID 2>/dev/null || echo "需要运行 npm run build"
```

**有问题时参考**：
1. `DEVELOPMENT_SETUP.md` - 详细设置步骤
2. `LESSONS_LEARNED.md` - 问题分析和预防
3. `data/projects.ts` - 代码中的注释说明

---

**最后更新**：2026-04-01
**快速参考版本**：1.0
