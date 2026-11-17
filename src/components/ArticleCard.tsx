import type { Article } from '@/types/article'
import { cleanSummary, formatDate, categories } from '@/lib/site'
export function ArticleCard({ article }: { article: Article }) {
  const summary = cleanSummary(article.summary)
  const category = categories.find((c) => c.key === article.category)
  return (
    <article className="article-row">
      <div className="article-meta">
        <span className="source-symbol" aria-hidden="true">
          {article.source.slice(0, 1)}
        </span>
        <span className="article-source">{article.source}</span>
        <span className="meta-dot">·</span>
        <time
          dateTime={
            Number.isNaN(Date.parse(article.pubDate))
              ? undefined
              : new Date(article.pubDate).toISOString()
          }
        >
          {formatDate(article.pubDate)}
        </time>
        {category && <span className="article-category">{category.label}</span>}
      </div>
      <h3>
        <a href={article.link} target="_blank" rel="noopener noreferrer">
          {article.title}
          <span className="external-arrow" aria-hidden="true">
            ↗
          </span>
        </a>
      </h3>
      {summary && <p className="article-summary">{summary}</p>}
      <a
        className="read-original"
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`阅读原文：${article.title}`}
      >
        阅读原文 <span aria-hidden="true">↗</span>
      </a>
    </article>
  )
}
