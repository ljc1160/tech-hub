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
