# itcsdn.com — 技术内容聚合站设计文档

**日期**：2026-03-01
**域名**：itcsdn.com
**定位**：自动聚合技术 RSS 内容 + 站长偶尔手动精选推荐

---

## 核心约束

- 低成本（目标 $0）
- 低运维（配置好后几乎不管）
- 合规（只使用官方 RSS，不爬取全文）
- 偶尔人工参与（站长手动添加精选推荐）

---

## 整体架构

```
RSS 数据源（5个官方 RSS）
        ↓
GitHub Actions（每小时触发）
  → scripts/fetch.js 抓取 RSS
  → 去重，保留最新 200 条
  → 写入 data/articles.json
  → git commit + push
        ↓
Vercel 检测到新提交
  → 自动构建 Next.js 静态站
  → 部署到 itcsdn.com
        ↓
用户访问网站
```

站长手动推荐流程：
1. 编辑 `data/curated.json`，添加一条记录
2. Push 到 GitHub
3. Vercel 自动更新上线（约 1 分钟）

---

## 页面结构

```
itcsdn.com/
├── /          首页（精选推荐置顶 + 各分类最新内容）
├── /ai        AI 资讯专栏
├── /opensource 开源项目专栏
├── /news      技术新闻专栏
└── /about     关于页
```

### 内容卡片

普通卡片：
- 来源标签（如 Hacker News）
- 发布时间
- 标题（链接到原文）
- RSS 原生摘要
- "阅读原文" 按钮

精选推荐卡片（额外字段）：
- ⭐ 站长推荐标记
- 站长推荐语（`note` 字段）
- 来源（知乎 / 公众号 / 任意）

---

## RSS 数据来源

| 分类 | 来源 | RSS 地址 |
|------|------|----------|
| 开源项目 | GitHub Explore | `https://github.com/explore.atom` |
| 技术新闻 | Hacker News | `https://news.ycombinator.com/rss` |
| 编程讨论 | Reddit r/programming | `https://www.reddit.com/r/programming.rss` |
| AI 资讯 | Reddit r/MachineLearning | `https://www.reddit.com/r/MachineLearning.rss` |
| AI 论文 | arXiv CS.AI | `https://arxiv.org/rss/cs.AI` |

全部为官方提供的 RSS，合规使用。

---

## 数据结构

### data/articles.json（自动生成）

```json
[
  {
    "title": "文章标题",
    "summary": "RSS 原生摘要",
    "link": "原文链接",
    "source": "Hacker News",
    "category": "news",
    "pubDate": "2026-03-01T10:00:00Z"
  }
]
```

### data/curated.json（手动维护）

```json
[
  {
    "title": "文章标题",
    "link": "https://zhuanlan.zhihu.com/p/xxxxxx",
    "source": "知乎",
    "category": "ai",
    "note": "站长推荐语，说明为什么值得读",
    "addedAt": "2026-03-01"
  }
]
```

---

## 技术栈

| 模块 | 选型 |
|------|------|
| 前端框架 | Next.js 14（静态导出） |
| RSS 抓取 | Node.js + `rss-parser` |
| 数据存储 | JSON 文件（Git 仓库内） |
| 自动化 | GitHub Actions（每小时 cron） |
| 部署 | Vercel 免费版 |
| 样式 | Tailwind CSS |

---

## 项目目录结构

```
itcsdn.com/
├── .github/
│   └── workflows/
│       └── fetch.yml         # 定时抓取任务
├── scripts/
│   └── fetch.js              # RSS 抓取脚本
├── data/
│   ├── articles.json         # 自动生成（勿手动修改）
│   └── curated.json          # 站长手动维护的精选推荐
├── src/
│   ├── app/                  # Next.js App Router 页面
│   │   ├── page.tsx          # 首页
│   │   ├── ai/page.tsx       # AI 专栏
│   │   ├── opensource/page.tsx
│   │   ├── news/page.tsx
│   │   └── about/page.tsx
│   └── components/
│       ├── ArticleCard.tsx   # 普通文章卡片
│       └── CuratedCard.tsx   # 精选推荐卡片
├── public/
├── package.json
└── next.config.js
```

---

## 合规说明

- 只使用 RSS 官方字段（title、description、link）
- 不抓取原文全文
- 每条内容标注来源并链接原文
- 手动推荐内容为站长自行选取的外部链接，等同于分享链接，不涉及版权

---

## 成本估算

| 服务 | 费用 |
|------|------|
| GitHub | 免费 |
| Vercel | 免费（Hobby 计划） |
| 域名 itcsdn.com | 已有，无额外费用 |
| **合计** | **$0/月** |
