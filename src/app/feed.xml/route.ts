import { getArticles } from '@/lib/articles'
import { SITE_URL, cleanSummary } from '@/lib/site'
export const dynamic = 'force-static'
function escape(value: string) {
  return value.replace(
    /[<>&"']/g,
    (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[c]!
  )
}
export function GET() {
  const articles = getArticles()
    .sort((a, b) => Date.parse(b.pubDate) - Date.parse(a.pubDate))
    .slice(0, 100)
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>INS 技术雷达</title><link>${SITE_URL}</link><description>AI 前沿、开源项目、开发工具与技术社区资讯</description><language>zh-CN</language><atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>${articles.map((a) => `<item><title>${escape(a.title)}</title><link>${escape(a.link)}</link><guid isPermaLink="true">${escape(a.link)}</guid><pubDate>${new Date(a.pubDate).toUTCString()}</pubDate><description>${escape(cleanSummary(a.summary).slice(0, 400))}</description></item>`).join('')}</channel></rss>`,
    { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } }
  )
}
