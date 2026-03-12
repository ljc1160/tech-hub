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
