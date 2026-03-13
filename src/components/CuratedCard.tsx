import type { CuratedItem } from '@/types/article'

export function CuratedCard({ item }: { item: CuratedItem }) {
  return (
    <div className="group relative bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 border border-accent-border overflow-hidden">
      {/* 左侧 accent 装饰线 */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent rounded-l-2xl" />

      <div className="pl-3">
        {/* 标签行 */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-accent bg-accent/8 px-2.5 py-0.5 rounded-md">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            站长精选
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-mono text-slate-500 bg-slate-50 border border-slate-100">
            {item.source}
          </span>
          <span className="text-xs text-slate-400">{item.addedAt}</span>
        </div>

        {/* 标题 */}
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm font-semibold text-slate-900 hover:text-accent transition-colors line-clamp-2 leading-relaxed"
        >
          {item.title}
        </a>

        {/* 站长点评 */}
        {item.note && (
          <p className="mt-2 text-xs text-slate-500 italic leading-relaxed">
            "{item.note}"
          </p>
        )}
      </div>
    </div>
  )
}
