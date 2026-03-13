import { getArticlesByCategory } from '@/lib/articles'
import { ArticleCard } from '@/components/ArticleCard'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'AI 资讯 — itcsdn.com' }

export default function AIPage() {
  const articles = getArticlesByCategory('ai')
  return (
    <div>
      {/* 页面头部 */}
      <div className="mb-10 pb-8 border-b border-slate-100">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-4">
          AI 资讯
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">人工智能前沿动态</h1>
        <p className="text-slate-500">
          来自 arXiv、Hugging Face、AI 社区的最新研究与工程进展，共 {articles.length} 篇
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
