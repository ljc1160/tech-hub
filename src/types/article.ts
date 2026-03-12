export interface Article {
  title: string
  summary: string
  link: string
  source: string
  category: 'ai' | 'opensource' | 'news' | 'general'
  pubDate: string
}

export interface CuratedItem {
  title: string
  link: string
  source: string
  category: 'ai' | 'opensource' | 'news' | 'general'
  note: string
  addedAt: string
}
