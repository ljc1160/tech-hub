import fs from 'fs'
import path from 'path'
import type { Article, CuratedItem } from '@/types/article'

export function getArticles(): Article[] {
  const filePath = path.join(process.cwd(), 'data', 'articles.json')
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw)
}

export function getCurated(): CuratedItem[] {
  const filePath = path.join(process.cwd(), 'data', 'curated.json')
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw)
}

export function getArticlesByCategory(category: string): Article[] {
  return getArticles().filter(a => a.category === category)
}
