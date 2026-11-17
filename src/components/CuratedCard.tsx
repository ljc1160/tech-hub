import type { CuratedItem } from '@/types/article'
import { formatDate } from '@/lib/site'
export function CuratedCard({ item }: { item: CuratedItem }) {
  return (
    <article className="curated-card">
      <div className="curated-meta">
        <span>编辑收藏</span>
        <span>{item.source}</span>
      </div>
      <h3>
        <a href={item.link} target="_blank" rel="noopener noreferrer">
          {item.title}
        </a>
      </h3>
      <div className="curated-bottom">
        <time dateTime={item.addedAt}>{formatDate(item.addedAt)}</time>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`阅读精选：${item.title}`}
        >
          阅读精选 <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  )
}
