const RSSParser = require('rss-parser')
const fs = require('fs')
const path = require('path')

const parser = new RSSParser()

const RSS_SOURCES = [
  { url: 'https://github.com/explore.atom',                      source: 'GitHub Explore',        category: 'opensource' },
  { url: 'https://news.ycombinator.com/rss',                     source: 'Hacker News',           category: 'news' },
  { url: 'https://www.reddit.com/r/programming.rss',             source: 'Reddit/programming',    category: 'news' },
  { url: 'https://www.reddit.com/r/MachineLearning.rss',         source: 'Reddit/ML',             category: 'ai' },
  { url: 'https://arxiv.org/rss/cs.AI',                          source: 'arXiv AI',              category: 'ai' },
]

function dedup(articles) {
  const seen = new Set()
  const unique = articles.filter(a => {
    if (seen.has(a.link)) return false
    seen.add(a.link)
    return true
  })
  // 按日期降序排列，保留最新 200 条
  return unique
    .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
    .slice(0, 200)
}

async function fetchFeed({ url, source, category }) {
  try {
    const feed = await parser.parseURL(url)
    return feed.items.map(item => ({
      title: item.title || '',
      summary: item.contentSnippet || item.summary || '',
      link: item.link || '',
      source,
      category,
      pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
    }))
  } catch (err) {
    console.error(`抓取 ${source} 失败:`, err.message)
    return []
  }
}

async function main() {
  console.log('正在抓取 RSS 数据源...')
  const results = await Promise.all(RSS_SOURCES.map(fetchFeed))
  const all = results.flat()
  const articles = dedup(all)
  const outPath = path.join(__dirname, '..', 'data', 'articles.json')
  fs.writeFileSync(outPath, JSON.stringify(articles, null, 2))
  console.log(`完成。已写入 ${articles.length} 篇文章。`)
}

if (require.main === module) {
  main()
}

module.exports = { dedup }
