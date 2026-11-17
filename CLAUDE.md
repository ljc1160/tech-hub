# tech-hub 项目说明

开发者技术趋势聚合平台，自动聚合 GitHub、Hacker News、Reddit、arXiv 最新技术内容。

## 🌿 分支规范

只保留 `main` 单分支（2026-11-17 起）：开发、提交、推送都直接在 main 上进行，不再使用 develop / feature 分支与 worktree 流程。

- 提交前本地 `npm run build` 验证静态导出通过。
- GitHub Actions 每小时自动向 main 提交数据更新；本地推送前先 `git pull --ff-only`。
- 服务器部署：`bash /home/ins.itcsdn.com/deploy/deploy.sh`（拉取 + 构建，out/ 即 Nginx 站点目录）。

## 🏗 技术栈

- **框架**：Next.js 14 (App Router)
- **样式**：Tailwind CSS
- **数据**：JSON 文件（GitHub Actions 每小时自动更新）
- **字体**：Inter（via next/font/google）

## 🎨 设计系统

生成或修改任何 UI / 样式代码前，先读根目录 `DESIGN.md`，颜色、字体、圆角、间距一律引用其 tokens，不得使用清单外色值。

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

## 📋 文档规范

见 `docs/00-base/docs-convention.md`

## 🤖 AI 协作规则

- 未明确说"开发/实现/实施"时，**默认只修改对应文档 md**，不动代码

## ⚠️ 注意事项

- `data/` 目录由 CI 自动维护，不要手动提交数据文件
- `.worktrees/` 已加入 `.gitignore`，勿删除该条目
