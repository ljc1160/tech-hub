# INS 技术雷达

`ins.itcsdn.com`：面向开发者的 AI 前沿、开源项目、技术资讯与工具发现站。主域名 `itcsdn.com` 承载「华夏长歌」品牌官网，此项目独立部署。

## 本地运行

```bash
npm ci
npm run dev -- --port 3002
```

本次改版在 `.worktrees/feature/20261117-ins-redesign` 独立工作区中，分支 `feature/20261117-ins-redesign`。原目录与 3001 原版预览保留，用户已有 CLAUDE.md 与 DESIGN.md 不被覆盖。

## 构建和部署

```bash
npm run build
```

产物在 `out/`，包含完整页面正文、12 页归档（随内容数量自动变化）、RSS、robots 和站点地图。可部署到 Nginx、Pages 或其他静态托管。Nginx 示例见 `deploy/ins.nginx.conf`，HTTPS 和 DNS 由实际服务器环境配置。

Next.js 14 开发模式对 export + 动态参数存在兼容问题，因此 `next.config.mjs` 在开发时使用普通路由渲染，生产构建使用 `output: export`。无需迁移框架或增加数据库。

## 内容与界面

- `data/`：采集任务维护的 JSON，本次改版未修改。
- `src/lib/articles.ts`：原数据读取机制。
- `src/lib/site.ts`：域名、页面元信息、分类和日期格式。
- `src/components/ArticleExplorer.tsx`：本地关键词搜索、信源筛选、排序、分批阅读和空状态。
- `src/app/archive/[page]/page.tsx`：每 36 条生成可通过普通链接遍历的完整归档。
- `src/app/feed.xml/route.ts`：最近 100 条内容的 RSS 订阅。
- `src/app/sitemap.ts`、`robots.ts`：自动生成爬虫入口。
- `src/app/fonts/`：仓库已有的本地 Geist，不依赖境外字体服务。
- `DESIGN.md`：设计规范与本次实施档；继续采用现有白色、slate、Indigo tokens。

采集工作流配置为每 6 小时运行，实际更新取决于任务执行与站点发布；界面呈现真实内容日期，不声称实时更新。观点及内容版权归原作者。

## SEO 与迁移

每个页面独立维护 Title、Description、Canonical、Open Graph 与 Twitter。域名固定 `https://ins.itcsdn.com`，首页 WebSite、分类页 CollectionPage 与 BreadcrumbList 均为实际内容建模，不将外部文章标记为本站原创。

上线前配置 ins 域名和 HTTPS，提交 `https://ins.itcsdn.com/sitemap.xml`；验证原主站 `/ai`、`/opensource`、`/news`、`/about` 的路径对应关系后再配置精确 301/308。主域名 `/` 继续用于华夏长歌，不做全站重定向。DNS、证书、旧站迁移与上线发布未在本次本地改版中执行。

验证记录见 `docs/01-features/20261117-ins-redesign/06-ins-redesign-task.md`。
