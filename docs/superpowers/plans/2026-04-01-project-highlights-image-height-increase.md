# 项目亮点图片高度增加实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 Apple 风格项目详情页的项目亮点图片轮播高度从 384px 增加到 576px（1.5倍）

**Architecture:** 修改单个 Tailwind CSS 类值，从 `h-96` 改为 `h-[576px]`，影响轮播容器及其内部三张图片（左、中、右）的高度

**Tech Stack:** Next.js, React, Tailwind CSS, TypeScript

---

## 文件结构

### 需要修改的文件
- **Modify:** `brand-space-web/components/AppleStyleProjectDetail.tsx:118` - 修改轮播容器高度类

### 不需要修改的文件
- `brand-space-web/app/projects/[id]/page.tsx` - 标准项目详情页不受影响
- `brand-space-web/data/projects.ts` - 数据层不受影响

---

## 任务分解

### Task 1: 修改轮播容器高度

**Files:**
- Modify: `brand-space-web/components/AppleStyleProjectDetail.tsx:118`

- [ ] **Step 1: 验证当前代码状态**

打开文件并确认第 118 行当前内容：

```bash
# 查看第 118 行的内容
sed -n '118p' brand-space-web/components/AppleStyleProjectDetail.tsx
```

Expected output:
```tsx
            <div className="flex items-stretch cursor-pointer group h-96">
```

- [ ] **Step 2: 修改高度类**

将第 118 行的 `h-96` 替换为 `h-[576px]`：

修改前：
```tsx
<div className="flex items-stretch cursor-pointer group h-96">
```

修改后：
```tsx
<div className="flex items-stretch cursor-pointer group h-[576px]">
```

使用 Edit 工具进行精确替换。

- [ ] **Step 3: 验证修改结果**

确认修改已正确应用：

```bash
# 查看修改后的第 118 行
sed -n '118p' brand-space-web/components/AppleStyleProjectDetail.tsx
```

Expected output:
```tsx
            <div className="flex items-stretch cursor-pointer group h-[576px]">
```

- [ ] **Step 4: 启动开发服务器进行视觉测试**

```bash
cd brand-space-web && npm run dev
```

Expected: 开发服务器在 http://localhost:3000 启动成功

- [ ] **Step 5: 手动视觉验证**

在浏览器中访问使用 Apple 风格的项目详情页（如 project-7）：
- URL: `http://localhost:3000/projects/project-7`
- 滚动到"项目亮点"部分
- 使用浏览器开发者工具检查轮播容器的高度
- 验证点：
  - [ ] 轮播容器高度为 576px
  - [ ] 左侧预览图高度为 576px
  - [ ] 中间主图高度为 576px
  - [ ] 右侧预览图高度为 576px
  - [ ] 图片显示正常，无裁剪异常
  - [ ] 轮播功能正常（点击切换）
  - [ ] 圆角和阴影效果正常

- [ ] **Step 6: 测试响应式布局**

在浏览器开发者工具中测试不同屏幕尺寸：
- 桌面端（1920x1080）
- 平板端（768x1024）
- 移动端（375x667）

验证点：
- [ ] 各尺寸下图片高度保持 576px
- [ ] 移动端隐藏左右预览图，只显示中间主图
- [ ] 图片加载和显示正常

- [ ] **Step 7: 检查性能**

在浏览器开发者工具中：
- 打开 Performance 面板
- 刷新页面并滚动到项目亮点部分
- 验证没有性能问题或布局抖动

- [ ] **Step 8: 停止开发服务器**

```bash
# 按 Ctrl+C 停止开发服务器
```

- [ ] **Step 9: 提交变更**

```bash
git add brand-space-web/components/AppleStyleProjectDetail.tsx
git commit -m "$(cat <<'EOF'
feat: Increase project highlights carousel height to 576px

- Change carousel container height from h-96 (384px) to h-[576px]
- Maintains width and responsive behavior
- Improves visual impact and content display

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

Expected: 提交成功，显示 1 file changed

- [ ] **Step 10: 验证 git 状态**

```bash
git status
```

Expected: "working tree clean" 或 "nothing to commit"

```bash
git log -1 --oneline
```

Expected: 显示刚才的提交信息

---

## 自我审查清单

### 1. Spec 覆盖检查
- ✅ 将高度从 384px 增加到 576px（1.5倍）
- ✅ 宽度保持不变
- ✅ 只影响 AppleStyleProjectDetail 组件
- ✅ 不影响其他页面

### 2. 占位符扫描
- ✅ 无 TBD、TODO 或占位符
- ✅ 所有步骤都有具体的命令或代码
- ✅ 验证步骤包含预期输出

### 3. 类型和命名一致性
- ✅ 文件路径一致：`brand-space-web/components/AppleStyleProjectDetail.tsx`
- ✅ CSS 类名一致：从 `h-96` 到 `h-[576px]`
- ✅ 没有函数或方法调用，无需检查签名一致性

### 4. 测试覆盖
- ✅ 视觉测试（开发服务器）
- ✅ 响应式测试（多尺寸）
- ✅ 性能测试（无回退）

### 5. 遗漏检查
- ✅ 无遗漏需求
- ✅ 所有规格要求都已映射到任务

---

## 执行注意事项

1. **简单修改**：这是一个单行 CSS 类修改，实施时间约 5-10 分钟
2. **无需单元测试**：UI 样式修改主要通过视觉验证
3. **可快速回滚**：如有问题，只需将 `h-[576px]` 改回 `h-96` 即可
4. **无破坏性更改**：只影响一个组件的视觉呈现，不影响功能逻辑

---

## 回滚计划

如果需要回滚：

```bash
# 方式 1: 撤销提交
git revert HEAD

# 方式 2: 直接修改回原值
# 将 h-[576px] 改回 h-96
```

---

## 验收标准

- [ ] 项目亮点轮播容器高度为 576px
- [ ] 左、中、右三张图片高度一致，都是 576px
- [ ] 图片显示正常，无异常裁剪
- [ ] 轮播切换功能正常
- [ ] 响应式布局在各尺寸下正常
- [ ] 代码已提交到 git
- [ ] 无控制台错误或警告
