import { getArticlesByCategory } from '@/lib/articles'
import { ArticleCard } from '@/components/ArticleCard'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: '开源项目 — itcsdn.com' }

export default function OpenSourcePage() {
  const articles = getArticlesByCategory('opensource')
  return (
    <div>
      {/* 页面头部 */}
      <div className="mb-10 pb-8 border-b border-slate-100">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-4">
          Open Source
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">开源项目精选</h1>
        <p className="text-slate-500">
          来自 GitHub Trending、HN 社区的热门开源项目，共 {articles.length} 个
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
