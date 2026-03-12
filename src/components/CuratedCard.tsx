import type { CuratedItem } from '@/types/article'

export function CuratedCard({ item }: { item: CuratedItem }) {
  return (
    <div className="border border-amber-200 bg-amber-50 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-medium text-amber-700">⭐ 站长推荐</span>
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
          {item.source}
        </span>
        <span className="text-xs text-gray-400">{item.addedAt}</span>
      </div>
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-base font-medium text-gray-900 hover:text-blue-600 line-clamp-2"
      >
        {item.title}
      </a>
      <p className="mt-1 text-sm text-amber-800 italic">{item.note}</p>
    </div>
  )
}
