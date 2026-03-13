import { getArticlesByCategory } from '@/lib/articles'
import { ArticleCard } from '@/components/ArticleCard'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: '技术资讯 — itcsdn.com' }

export default function NewsPage() {
  const articles = getArticlesByCategory('news')
  return (
    <div>
      {/* 页面头部 */}
      <div className="mb-10 pb-8 border-b border-slate-100">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-4">
          资讯
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">技术行业资讯</h1>
        <p className="text-slate-500">
          来自 Hacker News、Reddit 的开发者社区精华讨论，共 {articles.length} 篇
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a, i) => (
          <ArticleCard key={i} article={a} />
        ))}
      </div>
    </div>
  )
}
