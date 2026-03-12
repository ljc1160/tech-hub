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
