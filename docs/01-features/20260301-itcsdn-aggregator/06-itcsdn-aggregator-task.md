# itcsdn.com — RSS 聚合站实现计划

> **给 Claude：** 执行此计划时必须使用 superpowers:executing-plans 技能，逐任务执行。

**目标：** 构建 itcsdn.com — 一个静态技术内容聚合站，每小时自动抓取 RSS，支持站长手动精选推荐。

**架构：** GitHub Actions 每小时运行 Node.js RSS 抓取脚本，将结果写入 `data/articles.json`。Next.js 在构建时读取这些 JSON 文件生成静态页面。每次提交自动触发 Vercel 部署。手动推荐内容存放在 `data/curated.json`，站长直接编辑即可。

**技术栈：** Next.js 14（App Router，静态导出）、Tailwind CSS、TypeScript、`rss-parser`（Node.js）、GitHub Actions、Vercel

---

## 任务 1：初始化 Next.js 项目

**文件：**
- 创建：`package.json`、`tsconfig.json`、`next.config.js`、`tailwind.config.ts`、`postcss.config.js`
- 创建：`src/app/layout.tsx`、`src/app/globals.css`

**步骤 1：初始化项目**

在 `/Users/leonpad/xchuan/tech-open-hub` 目录运行：
```bash
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```
当提示已有文件时，选择继续。其余接受默认值。

**步骤 2：安装额外依赖**

```bash
npm install rss-parser
npm install --save-dev @types/node
```

**步骤 3：配置 Next.js 静态导出**

替换 `next.config.js` 内容为：
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
}

module.exports = nextConfig
```

**步骤 4：验证开发服务器能启动**

```bash
npm run dev
```
预期：服务器在 http://localhost:3000 启动，显示默认 Next.js 页面。

**步骤 5：提交**

```bash
git init
git add .
git commit -m "feat: 初始化 Next.js 项目"
```

---

## 任务 2：创建数据目录和种子文件

**文件：**
- 创建：`data/articles.json`
- 创建：`data/curated.json`
- 创建：`src/types/article.ts`

**步骤 1：创建 TypeScript 类型定义**

创建 `src/types/article.ts`：
```typescript
export interface Article {
  title: string
  summary: string
  link: string
  source: string
  category: 'ai' | 'opensource' | 'news' | 'general'
  pubDate: string
}

export interface CuratedItem {
  title: string
  link: string
  source: string
  category: 'ai' | 'opensource' | 'news' | 'general'
  note: string
  addedAt: string
}
```

**步骤 2：创建空的 articles.json**

创建 `data/articles.json`：
```json
[]
```

**步骤 3：创建带示���的 curated.json**

创建 `data/curated.json`：
```json
[
  {
    "title": "示例推荐：理解 RAG 检索增强生成",
    "link": "https://example.com",
    "source": "知乎",
    "category": "ai",
    "note": "这篇文章对向量检索的解释非常清晰，适合入门。",
    "addedAt": "2026-03-01"
  }
]
```

**步骤 4：提交**

```bash
git add data/ src/types/
git commit -m "feat: 添加文章类型定义和种子数据文件"
```

---

## 任务 3：编写 RSS 抓取脚本（TDD 方式）

**文件：**
- 创建：`scripts/fetch.js`
- 创建：`scripts/fetch.test.js`

**步骤 1：安装 Jest 用于脚本测试**

```bash
npm install --save-dev jest
```

在 `package.json` 的 scripts 部分添加：
```json
"test": "jest scripts/",
"fetch": "node scripts/fetch.js"
```

**步骤 2：编写去重逻辑的失败测试**

创建 `scripts/fetch.test.js`：
```javascript
const { dedup } = require('./fetch')

test('dedup 移除相同链接的文章', () => {
  const articles = [
    { title: 'A', link: 'https://example.com/1', summary: '', source: 'HN', category: 'news', pubDate: '' },
    { title: 'A duplicate', link: 'https://example.com/1', summary: '', source: 'HN', category: 'news', pubDate: '' },
    { title: 'B', link: 'https://example.com/2', summary: '', source: 'HN', category: 'news', pubDate: '' },
  ]
  const result = dedup(articles)
  expect(result).toHaveLength(2)
  expect(result[0].link).toBe('https://example.com/1')
  expect(result[1].link).toBe('https://example.com/2')
})

test('dedup 保留最新的 200 篇文章', () => {
  const articles = Array.from({ length: 250 }, (_, i) => ({
    title: `Article ${i}`,
    link: `https://example.com/${i}`,
    summary: '',
    source: 'HN',
    category: 'news',
    pubDate: new Date(2026, 0, i + 1).toISOString(),
  }))
  const result = dedup(articles)
  expect(result).toHaveLength(200)
})
```

**步骤 3：运行测试确认失败**

```bash
npm test
```
预期：失败 — "Cannot find module './fetch'"

**步骤 4：编写抓取脚本**

创建 `scripts/fetch.js`：
```javascript
const RSSParser = require('rss-parser')
const fs = require('fs')
const path = require('path')

const parser = new RSSParser()

const RSS_SOURCES = [
  { url: 'https://github.com/explore.atom',                      source: 'GitHub Explore',        category: 'opensource' },
  { url: 'https://news.ycombinator.com/rss',                     source: 'Hacker News',           category: 'news' },
  { url: 'https://www.reddit.com/r/programming.rss',             source: 'Reddit/programming',    category: 'news' },
  { url: 'https://www.reddit.com/r/MachineLearning.rss',         source: 'Reddit/ML',             category: 'ai' },
  { url: 'https://arxiv.org/rss/cs.AI',                          source: 'arXiv AI',              category: 'ai' },
]

function dedup(articles) {
  const seen = new Set()
  const unique = articles.filter(a => {
    if (seen.has(a.link)) return false
    seen.add(a.link)
    return true
  })
  // 按日期降序排列，保留最新 200 条
  return unique
    .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
    .slice(0, 200)
}

async function fetchFeed({ url, source, category }) {
  try {
    const feed = await parser.parseURL(url)
    return feed.items.map(item => ({
      title: item.title || '',
      summary: item.contentSnippet || item.summary || '',
      link: item.link || '',
      source,
      category,
      pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
    }))
  } catch (err) {
    console.error(`抓取 ${source} 失败:`, err.message)
    return []
  }
}

async function main() {
  console.log('正在抓取 RSS 数据源...')
  const results = await Promise.all(RSS_SOURCES.map(fetchFeed))
  const all = results.flat()
  const articles = dedup(all)
  const outPath = path.join(__dirname, '..', 'data', 'articles.json')
  fs.writeFileSync(outPath, JSON.stringify(articles, null, 2))
  console.log(`完成。已写入 ${articles.length} 篇文章。`)
}

if (require.main === module) {
  main()
}

module.exports = { dedup }
```

**步骤 5：运行测试确认通过**

```bash
npm test
```
预期：通过 — 2 个测试全部通过

**步骤 6：手动运行脚本验证功能**

```bash
npm run fetch
```
预期：输出"完成。已写入 N 篇文章。"，`data/articles.json` 中有真实数据。

**步骤 7：提交**

```bash
git add scripts/ data/articles.json package.json
git commit -m "feat: 添加 RSS 抓取脚本（含去重逻辑）"
```

---

## 任务 4：Next.js 数据加载工具

**文件：**
- 创建：`src/lib/articles.ts`

**步骤 1：编写数据加载器**

创建 `src/lib/articles.ts`：
```typescript
import fs from 'fs'
import path from 'path'
import type { Article, CuratedItem } from '@/types/article'

export function getArticles(): Article[] {
  const filePath = path.join(process.cwd(), 'data', 'articles.json')
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw)
}

export function getCurated(): CuratedItem[] {
  const filePath = path.join(process.cwd(), 'data', 'curated.json')
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw)
}

export function getArticlesByCategory(category: string): Article[] {
  return getArticles().filter(a => a.category === category)
}
```

**步骤 2：提交**

```bash
git add src/lib/
git commit -m "feat: 添加数据加载工具函数"
```

---

## 任务 5：UI 组件

**文件：**
- 创建：`src/components/ArticleCard.tsx`
- 创建：`src/components/CuratedCard.tsx`
- 创建：`src/components/Header.tsx`

**步骤 1：创建文章卡片组件**

创建 `src/components/ArticleCard.tsx`：
```typescript
import type { Article } from '@/types/article'

export function ArticleCard({ article }: { article: Article }) {
  const date = new Date(article.pubDate).toLocaleDateString('zh-CN')

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-400 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
          {article.source}
        </span>
        <span className="text-xs text-gray-400">{date}</span>
      </div>
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-base font-medium text-gray-900 hover:text-blue-600 line-clamp-2"
      >
        {article.title}
      </a>
      {article.summary && (
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{article.summary}</p>
      )}
    </div>
  )
}
```

**步骤 2：创建精选推荐卡片组件**

创建 `src/components/CuratedCard.tsx`：
```typescript
import type { CuratedItem } from '@/types/article'

export function CuratedCard({ item }: { item: CuratedItem }) {
  return (
    <div className="border border-amber-200 bg-amber-50 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-medium text-amber-700">⭐ 站长推荐</span>
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
          {item.source}
        </span>
        <span className="text-xs text-gray-400">{item.addedAt}</span>
      </div>
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-base font-medium text-gray-900 hover:text-blue-600 line-clamp-2"
      >
        {item.title}
      </a>
      <p className="mt-1 text-sm text-amber-800 italic">{item.note}</p>
    </div>
  )
}
```

**步骤 3：创建页头组件**

创建 `src/components/Header.tsx`：
```typescript
import Link from 'next/link'

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-gray-900">
          itcsdn.com
        </Link>
        <nav className="flex items-center gap-6 text-sm text-gray-600">
          <Link href="/ai" className="hover:text-gray-900">AI</Link>
          <Link href="/opensource" className="hover:text-gray-900">开源</Link>
          <Link href="/news" className="hover:text-gray-900">资讯</Link>
          <Link href="/about" className="hover:text-gray-900">关于</Link>
        </nav>
      </div>
    </header>
  )
}
```

**步骤 4：提交**

```bash
git add src/components/
git commit -m "feat: 添加文章卡片、精选卡片和页头组件"
```

---

## 任务 6：根布局和全局样式

**文件：**
- 修改：`src/app/layout.tsx`

**步骤 1：更新根布局**

替换 `src/app/layout.tsx`：
```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'itcsdn.com — 开发者技术趋势聚合',
  description: '自动聚合 GitHub、Hacker News、Reddit、arXiv 最新技术内容，面向开发者的技术趋势导航站。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-gray-200 mt-16 py-8 text-center text-sm text-gray-400">
          itcsdn.com · 内容来自官方 RSS · 点击链接访问原文
        </footer>
      </body>
    </html>
  )
}
```

**步骤 2：提交**

```bash
git add src/app/layout.tsx
git commit -m "feat: 更新根布局（含页头页脚）"
```

---

## 任务 7：首页

**文件：**
- 修改：`src/app/page.tsx`

**步骤 1：编写首页**

替换 `src/app/page.tsx`：
```typescript
import { getArticles, getCurated } from '@/lib/articles'
import { ArticleCard } from '@/components/ArticleCard'
import { CuratedCard } from '@/components/CuratedCard'

export default function Home() {
  const articles = getArticles()
  const curated = getCurated()
  const aiArticles = articles.filter(a => a.category === 'ai').slice(0, 5)
  const opensourceArticles = articles.filter(a => a.category === 'opensource').slice(0, 5)
  const newsArticles = articles.filter(a => a.category === 'news').slice(0, 5)

  return (
    <div className="space-y-12">
      {curated.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">⭐ 站长精选</h2>
          <div className="grid gap-4">
            {curated.map((item, i) => <CuratedCard key={i} item={item} />)}
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">🤖 AI 资讯</h2>
          <a href="/ai" className="text-sm text-blue-600 hover:underline">查看全部 →</a>
        </div>
        <div className="grid gap-3">
          {aiArticles.map((a, i) => <ArticleCard key={i} article={a} />)}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">🔧 开源项目</h2>
          <a href="/opensource" className="text-sm text-blue-600 hover:underline">查看全部 →</a>
        </div>
        <div className="grid gap-3">
          {opensourceArticles.map((a, i) => <ArticleCard key={i} article={a} />)}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">📰 技术资讯</h2>
          <a href="/news" className="text-sm text-blue-600 hover:underline">查看全部 →</a>
        </div>
        <div className="grid gap-3">
          {newsArticles.map((a, i) => <ArticleCard key={i} article={a} />)}
        </div>
      </section>
    </div>
  )
}
```

**步骤 2：验证首页渲染**

```bash
npm run dev
```
访问 http://localhost:3000。预期：首页显示精选、AI、开源、资讯四个区块。

**步骤 3：提交**

```bash
git add src/app/page.tsx
git commit -m "feat: 构建首页（含精选和分类区块）"
```

---

## 任务 8：分类页面

**文件：**
- 创建：`src/app/ai/page.tsx`
- 创建：`src/app/opensource/page.tsx`
- 创建：`src/app/news/page.tsx`

**步骤 1：创建 AI 分类页**

创建 `src/app/ai/page.tsx`：
```typescript
import { getArticlesByCategory } from '@/lib/articles'
import { ArticleCard } from '@/components/ArticleCard'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'AI 资讯 — itcsdn.com' }

export default function AIPage() {
  const articles = getArticlesByCategory('ai')
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">🤖 AI 资讯</h1>
      <div className="grid gap-3">
        {articles.map((a, i) => <ArticleCard key={i} article={a} />)}
      </div>
    </div>
  )
}
```

**步骤 2：创建开源分类页**

创建 `src/app/opensource/page.tsx`：
```typescript
import { getArticlesByCategory } from '@/lib/articles'
import { ArticleCard } from '@/components/ArticleCard'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: '开源项目 — itcsdn.com' }

export default function OpenSourcePage() {
  const articles = getArticlesByCategory('opensource')
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">🔧 开源项目</h1>
      <div className="grid gap-3">
        {articles.map((a, i) => <ArticleCard key={i} article={a} />)}
      </div>
    </div>
  )
}
```

**步骤 3：创建资讯分类页**

创建 `src/app/news/page.tsx`：
```typescript
import { getArticlesByCategory } from '@/lib/articles'
import { ArticleCard } from '@/components/ArticleCard'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: '技术资讯 — itcsdn.com' }

export default function NewsPage() {
  const articles = getArticlesByCategory('news')
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">📰 技术资讯</h1>
      <div className="grid gap-3">
        {articles.map((a, i) => <ArticleCard key={i} article={a} />)}
      </div>
    </div>
  )
}
```

**步骤 4：验证所有分类页面**

开发服务器运行时，访问：
- http://localhost:3000/ai
- http://localhost:3000/opensource
- http://localhost:3000/news

预期：每个页面显示对应分类的文章列表。

**步骤 5：提交**

```bash
git add src/app/ai/ src/app/opensource/ src/app/news/
git commit -m "feat: 添加 AI、开源、资讯分类页面"
```

---

## 任务 9：关于页面

**文件：**
- 创建：`src/app/about/page.tsx`

**步骤 1：创建关于页面**

创建 `src/app/about/page.tsx`：
```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = { title: '关于 — itcsdn.com' }

export default function AboutPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">关于 itcsdn.com</h1>
      <div className="prose prose-gray space-y-4 text-gray-600">
        <p>
          itcsdn.com 是一个面向开发者的技术内容聚合站，自动收集来自
          GitHub、Hacker News、Reddit 和 arXiv 的最新技术动态。
        </p>
        <p>
          所有内容来自各平台官方 RSS 订阅源，仅展示标题与摘要，
          点击链接可访问原文。
        </p>
        <p>
          站长会不定期添加精选推荐，分享个人觉得值得一读的文章和工具。
        </p>
        <p className="text-sm text-gray-400">
          内容每小时自动更新。
        </p>
      </div>
    </div>
  )
}
```

**步骤 2：提交**

```bash
git add src/app/about/
git commit -m "feat: 添加关于页面"
```

---

## 任务 10：GitHub Actions 工作流

**文件：**
- 创建：`.github/workflows/fetch.yml`

**步骤 1：创建工作流文件**

创建 `.github/workflows/fetch.yml`：
```yaml
name: 抓取 RSS 数据源

on:
  schedule:
    - cron: '0 * * * *'   # 每小时整点执行
  workflow_dispatch:       # 支持从 GitHub UI 手动触发

jobs:
  fetch:
    runs-on: ubuntu-latest
    permissions:
      contents: write

    steps:
      - name: 检出代码
        uses: actions/checkout@v4

      - name: 配置 Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: 安装依赖
        run: npm ci

      - name: 抓取 RSS 数据
        run: node scripts/fetch.js

      - name: 提交更新后的文章数据
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add data/articles.json
          git diff --staged --quiet || git commit -m "chore: 更新文章数据 $(date -u +%Y-%m-%dT%H:%M:%SZ)"
          git push
```

**步骤 2：提交**

```bash
git add .github/
git commit -m "feat: 添加每小时自动抓取 RSS 的 GitHub Actions 工作流"
```

---

## 任务 11：Vercel 部署

**步骤 1：创建 GitHub 仓库**

访问 https://github.com/new 创建新仓库（如 `itcsdn-web`）。

**步骤 2：推送到 GitHub**

```bash
git remote add origin https://github.com/你的用户名/itcsdn-web.git
git branch -M main
git push -u origin main
```

**步骤 3：在 Vercel 部署**

1. 访问 https://vercel.com/new
2. 导入刚创建的 GitHub 仓库
3. 框架：Next.js（自动检测）
4. 构建命令：`npm run build`（默认）
5. 输出目录：`out`（因为 next.config.js 中设置了 `output: 'export'`）
6. 点击 Deploy

**步骤 4：添加自定义域名**

在 Vercel 项目设置 → Domains → 添加 `itcsdn.com`
按照 DNS 指引将域名指向 Vercel。

**步骤 5：验证部署**

访问 https://itcsdn.com — 预期：线上站点显示真实文章数据。

**步骤 6：测试 GitHub Actions**

在 GitHub 仓库 → Actions → "抓取 RSS 数据源" → Run workflow（手动触发）。
预期：工作流运行成功，提交新的 `data/articles.json`，Vercel 自动部署。

---

## 如何添加手动推荐

1. 在编辑器或直接在 GitHub 上编辑 `data/curated.json`
2. 添加条目：
```json
{
  "title": "文章标题",
  "link": "https://...",
  "source": "知乎",
  "category": "ai",
  "note": "你的推荐语",
  "addedAt": "2026-03-01"
}
```
3. `git commit -m "curate: 添加推荐 - [文章标题]" && git push`
4. Vercel 约 1 分钟后自动部署上线
