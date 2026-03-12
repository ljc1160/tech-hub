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
