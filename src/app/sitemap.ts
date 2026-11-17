import type { MetadataRoute } from 'next'
import { getArticles } from '@/lib/articles'
import { SITE_URL, categories } from '@/lib/site'
export const dynamic = 'force-static'
export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getArticles(),
    latest = articles.reduce(
      (m, a) => (Date.parse(a.pubDate) > Date.parse(m) ? a.pubDate : m),
      articles[0].pubDate
    )
  return [
    ...categories.map((c) => ({ url: SITE_URL + c.href, lastModified: new Date(latest) })),
    { url: SITE_URL + '/about' },
    ...Array.from({ length: Math.ceil(articles.length / 36) }, (_, i) => ({
      url: `${SITE_URL}/archive/${i + 1}`,
      lastModified: new Date(latest),
    })),
  ]
}
