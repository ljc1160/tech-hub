# tech-hub 项目说明

开发者技术趋势聚合平台，自动聚合 GitHub、Hacker News、Reddit、arXiv 最新技术内容。

## 🌿 分支规范

| 分支 | 用途 |
|------|------|
| `main` | 生产分支，只接受来自 `develop` 的合并 |
| `develop` | 开发主干，所有 feature 分支的合并目标 |
| `feature/YYYYMMDD-xxx` | 功能开发分支，从 `develop` 拉出 |

### 标准工作流

```bash
# 1. 新功能：基于 develop 创建 worktree 分支
git checkout develop
git worktree add .worktrees/feature/20260314-xxx -b feature/20260314-xxx

# 2. 开发完成后合并到 develop
git checkout develop
git merge feature/20260314-xxx --no-ff

# 3. 测试稳定后，develop → main
git checkout main
git merge develop --no-ff
```

## 🏗 技术栈

- **框架**：Next.js 14 (App Router)
- **样式**：Tailwind CSS
- **数据**：JSON 文件（GitHub Actions 每小时自动更新）
- **字体**：Inter（via next/font/google）

## 🎨 设计系统

- **强调色**：Indigo `#4F46E5`（极客紫）
- **背景层级**：白色 `#fff` / 浅灰 `#f8fafc`
- **卡片阴影**：`shadow-card` / `shadow-card-hover`（定义在 globals.css）

## 📂 关键目录

```
src/
├── app/           # Next.js 页面（layout / page / 各分类页）
├── components/    # 组件（Header、ArticleCard、CuratedCard）
├── lib/           # 数据读取（articles.ts）
└── types/         # 类型定义（article.ts）
data/              # JSON 数据文件（由 GitHub Actions 写入，勿手动修改）
scripts/           # 自动化脚本
```

## ⚠️ 注意事项

- `data/` 目录由 CI 自动维护，不要手动提交数据文件
- `.worktrees/` 已加入 `.gitignore`，勿删除该条目
