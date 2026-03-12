const { dedup } = require('./fetch')

test('dedup 移除相同链接的文章', () => {
  const articles = [
    { title: 'A', link: 'https://example.com/1', summary: '', source: 'HN', category: 'news', pubDate: '' },
    { title: 'A duplicate', link: 'https://example.com/1', summary: '', source: 'HN', category: 'news', pubDate: '' },
    { title: 'B', link: 'https://example.com/2', summary: '', source: 'HN', category: 'news', pubDate: '' },
  ]
  const result = dedup(articles)
  expect(result).toHaveLength(2)
  expect(result[0].link).toBe('https://example.com/1')
  expect(result[1].link).toBe('https://example.com/2')
})

test('dedup 保留最新的 200 篇文章', () => {
  const articles = Array.from({ length: 250 }, (_, i) => ({
    title: `Article ${i}`,
    link: `https://example.com/${i}`,
    summary: '',
    source: 'HN',
    category: 'news',
    pubDate: new Date(2026, 0, i + 1).toISOString(),
  }))
  const result = dedup(articles)
  expect(result).toHaveLength(200)
})
