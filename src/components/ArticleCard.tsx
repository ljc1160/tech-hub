import type { Article } from '@/types/article'

export function ArticleCard({ article }: { article: Article }) {
  const date = new Date(article.pubDate).toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className="group bg-white border border-slate-100 rounded-2xl p-5 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200">
      {/* 元信息行 */}
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-mono font-medium bg-slate-50 text-slate-500 border border-slate-100">
          {article.source}
        </span>
        <span className="text-xs text-slate-400">{date}</span>
      </div>

      {/* 标题 */}
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-sm font-semibold text-slate-900 hover:text-accent transition-colors line-clamp-2 leading-relaxed"
      >
        {article.title}
      </a>

      {/* 摘要 */}
      {article.summary && (
        <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {article.summary}
        </p>
      )}

      {/* 阅读箭头 */}
      <div className="mt-3 flex items-center gap-1 text-xs text-slate-400 group-hover:text-accent transition-colors">
        <span>阅读原文</span>
        <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  )
}
