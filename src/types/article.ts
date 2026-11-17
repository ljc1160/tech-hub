export interface Article {
  title: string
  summary: string
  link: string
  source: string
  category: 'ai' | 'opensource' | 'news' | 'general' | 'tools'
  pubDate: string
}

export interface CuratedItem {
  title: string
  link: string
  source: string
  category: 'ai' | 'opensource' | 'news' | 'general' | 'tools'
  note: string
  addedAt: string
}
