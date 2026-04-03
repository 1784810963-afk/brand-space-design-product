# 经验教训：避免本地与生产环境差异问题

## 问题概述

**发生时间**：2026-04-01
**问题症状**：本地开发环境页面显示黑色矩形，线上生产环境正常
**影响范围**：品牌空间设计平台 (brand-space-web)
**根本原因**：网络环境差异导致内部服务器无法访问

## 根本原因分析

### 网络拓扑差异

| 环节 | 本地环境 | 生产环境 |
|------|--------|--------|
| **运行位置** | 本机/局域网 | Vercel 云服务 |
| **内网访问** | ❌ 无 | ✅ 有 |
| **Feishu 后端** | 无法解析/超时 | 正常访问 |
| **图片加载** | 失败 → 404 | 成功 → 200 |
| **渲染结果** | 黑色矩形 | 正常显示 |

### 代码链条

```
data/projects.ts (所有 URL 指向内部服务器)
    ↓
ProjectCard 组件 (使用 Next.js Image)
    ↓
next.config.ts (remotePatterns 配置)
    ↓
[本地] 网络无法访问 → 图片加载失败
[云] 内网访问 → 图片加载成功
    ↓
CSS 黑色渐变覆盖 → 显示纯黑色矩形
```

## 预防策略

### 1. 架构设计原则

**原则 1：显式环境隔离**
```typescript
// ✅ 好的做法
const isDevelopment = process.env.NEXT_PUBLIC_ENV === 'development';
const imageSource = isDevelopment
  ? '/local-images'
  : 'https://internal-server.com/images';

// ❌ 避免：隐式依赖
const imageUrl = project.image; // 假设总是可访问
```

**原则 2：集中化配置管理**
```typescript
// ✅ 创建环境配置文件
// config/environment.ts
export const IMAGE_SOURCE = process.env.NEXT_PUBLIC_ENV === 'development'
  ? 'LOCAL'
  : 'FEISHU_BACKEND';

// ❌ 避免：分散在多个文件
// app/page.tsx 中的硬编码
// components/Card.tsx 中的硬编码
```

**原则 3：映射表而非转换逻辑**
```typescript
// ✅ 维护映射表便于更新和调试
const urlMap = {
  'uuid-1': '/local-path-1',
  'uuid-2': '/local-path-2',
};

// ❌ 避免：复杂的条件判断
if (isDev && category === 'retail' && index > 5) {
  // ... 转换逻辑
}
```

### 2. 开发流程优化

**建立验收清单**

```markdown
## 功能开发完成清单

- [ ] 代码更改完成
- [ ] **本地构建测试**：`npm run build`
- [ ] **生产模拟**：`NEXT_PUBLIC_ENV=production npm start`
- [ ] **环境差异检查**：验证两个环境的行为一致
- [ ] 单元测试通过
- [ ] 集成测试通过
- [ ] 代码审查通过
```

**自动化验证脚本**

```bash
#!/bin/bash
# scripts/verify-environments.sh

echo "🔍 Verifying environment differences..."

# 检查本地环境变量
if [ ! -f .env.local ]; then
  echo "❌ .env.local not found"
  exit 1
fi

# 验证关键依赖存在
if [ ! -d public/project-images ]; then
  echo "❌ public/project-images not found"
  exit 1
fi

# 测试两个环境的构建
echo "📦 Building for development..."
NEXT_PUBLIC_ENV=development npm run build

echo "📦 Building for production..."
npm run build

echo "✅ Environment verification passed"
```

### 3. 测试策略

**环境切换测试**

```typescript
// __tests__/environment.test.ts
describe('Environment Configuration', () => {
  const originalEnv = process.env.NEXT_PUBLIC_ENV;

  afterEach(() => {
    process.env.NEXT_PUBLIC_ENV = originalEnv;
  });

  it('should use local images in development', () => {
    process.env.NEXT_PUBLIC_ENV = 'development';
    const { projects } = require('../data/projects');

    expect(projects[0].image).toMatch(/^\/project-images\//);
  });

  it('should use Feishu URLs in production', () => {
    process.env.NEXT_PUBLIC_ENV = 'production';
    delete require.cache[require.resolve('../data/projects')];
    const { projects } = require('../data/projects');

    expect(projects[0].image).toContain('cfe-doc-backend.inner.chj.cloud');
  });
});
```

### 4. 监控和告警

**部署前检查**

```yaml
# .github/workflows/pre-deployment-check.yml
name: Pre-Deployment Check

on: [pull_request]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3

      - name: Check environment variables
        run: |
          if ! grep -q "NEXT_PUBLIC_ENV" brand-space-web/.env.local; then
            echo "⚠️  Warning: NEXT_PUBLIC_ENV not set in .env.local"
            exit 1
          fi

      - name: Build for both environments
        run: |
          cd brand-space-web
          npm ci
          NEXT_PUBLIC_ENV=development npm run build
          npm run build  # production

      - name: Check for external URL dependencies
        run: |
          # 扫描代码中的硬编码 URL
          if grep -r "cfe-doc-backend" brand-space-web/app; then
            echo "⚠️  Warning: Found hardcoded internal URLs in components"
            exit 1
          fi
```

### 5. 文档标准化

**必须包含的文档**

```markdown
# 项目 README 中必须的部分

## 本地开发

1. **环境设置**
   - 说明必需的环境变量
   - 给出 .env.local 示例

2. **本地与生产差异**
   - 明确列出不同之处
   - 解释为什么存在差异

3. **验证检查**
   - 如何验证本地开发环境正确设置
   - 如何验证生产构建无破坏性改动
```

## 具体建议

### 立即行动（已完成）✅

- [x] 识别网络访问问题的根本原因
- [x] 实现环境变量隔离
- [x] 创建 URL 映射表
- [x] 下载本地图片资源
- [x] 验证本地和生产环境

### 短期行动（1-2 周）

- [ ] 编写 `scripts/verify-environments.sh` 脚本
- [ ] 添加预提交钩子检查环境变量
- [ ] 创建 GitHub Actions 工作流
- [ ] 更新项目 README

### 中期行动（1-2 月）

- [ ] 实现自动化图片同步脚本
- [ ] 建立内部资源管理系统
- [ ] 创建开发环境标准化指南
- [ ] 培训团队成员

### 长期行动（3-6 月）

- [ ] 评估 CDN 代理方案
- [ ] 构建通用环境隔离框架
- [ ] 建立监控和告警系统
- [ ] 实现自动化回归测试

## 团队学习要点

### 需要理解的概念

1. **网络隔离** - 为什么内部服务器在本地无法访问
2. **环境差异** - 开发、测试、生产环境的区别
3. **优雅降级** - 当资源不可用时的替代方案
4. **配置管理** - 环境变量的正确使用方式

### 代码审查重点

```
检查清单：
□ 是否有硬编码的内部 URL？
□ 是否正确使用了环境变量？
□ 是否在两个环境中都进行了测试？
□ 是否有自动化测试覆盖环境差异？
□ 是否更新了相关文档？
```

## 相关文件

- **主修改文件**：`brand-space-web/data/projects.ts`
- **配置文件**：`brand-space-web/.env.local`
- **资源文件**：`brand-space-web/public/project-images/`（47 张图片）
- **文档**：`DEVELOPMENT_SETUP.md`（本文件）

## 参考资源

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [12 Factor App - Config](https://12factor.net/config)
- [Environment-Driven Configuration Patterns](https://martinfowler.com/articles/configuration-patterns.html)

---

**文档版本**：1.0
**最后更新**：2026-04-01
**维护者**：AI Assistant
