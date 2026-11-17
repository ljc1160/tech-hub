'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { Article } from '@/types/article'
import { categories, formatDate } from '@/lib/site'
import { ArticleCard } from './ArticleCard'
export function ArticleExplorer({
  articles,
  category = 'all',
}: {
  articles: Article[]
  category?: string
}) {
  const [query, setQuery] = useState(''),
    [source, setSource] = useState('all'),
    [sort, setSort] = useState('newest'),
    [visible, setVisible] = useState(18)
  const sources = useMemo(
    () =>
      Array.from(new Set(articles.map((a) => a.source))).sort((a, b) =>
        a.localeCompare(b, 'zh-CN')
      ),
    [articles]
  )
  const filtered = useMemo(
    () =>
      articles
        .filter(
          (a) =>
            (source === 'all' || a.source === source) &&
            `${a.title} ${a.summary} ${a.source}`
              .toLocaleLowerCase()
              .includes(query.trim().toLocaleLowerCase())
        )
        .sort((a, b) =>
          sort === 'newest'
            ? Date.parse(b.pubDate) - Date.parse(a.pubDate)
            : Date.parse(a.pubDate) - Date.parse(b.pubDate)
        ),
    [articles, query, source, sort]
  )
  function reset() {
    setQuery('')
    setSource('all')
    setSort('newest')
    setVisible(18)
  }
  const latest = articles
    .filter((a) => !Number.isNaN(Date.parse(a.pubDate)))
    .reduce(
      (max, a) => (Date.parse(a.pubDate) > Date.parse(max) ? a.pubDate : max),
      articles[0]?.pubDate || ''
    )
  return (
    <section className="discovery" id="discover" aria-label="浏览技术动态">
      <div className="category-bar">
        <nav aria-label="内容分类">
          {categories.map((c) => (
            <Link key={c.key} href={c.href} aria-current={category === c.key ? 'page' : undefined}>
              {c.label}
              {category === 'all' && (
                <span>
                  {c.key === 'all'
                    ? articles.length
                    : articles.filter((a) => a.category === c.key).length}
                </span>
              )}
            </Link>
          ))}
        </nav>
        <span className="collection-count">{articles.length} 条已收录</span>
      </div>
      <div className="discovery-grid">
        <div className="feed">
          <div className="feed-tools">
            <label className="search-box">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.6" />
                <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              <input
                type="search"
                value={query}
                placeholder="搜索标题、摘要或来源…"
                aria-label="搜索技术动态"
                onChange={(e) => {
                  setQuery(e.target.value)
                  setVisible(18)
                }}
              />
            </label>
            <label className="sort-control">
              <span className="sr-only">排序方式</span>
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value)
                  setVisible(18)
                }}
              >
                <option value="newest">最新优先</option>
                <option value="oldest">较早优先</option>
              </select>
            </label>
            <label className="mobile-source-control">
              <span>信源</span>
              <select
                aria-label="筛选信源"
                value={source}
                onChange={(event) => {
                  setSource(event.target.value)
                  setVisible(18)
                }}
              >
                <option value="all">全部信源</option>
                {sources.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="feed-heading">
            <h2>{query ? '搜索结果' : source === 'all' ? '内容动态' : source}</h2>
            <span aria-live="polite">
              共 {filtered.length} 条
              {source !== 'all' && (
                <button
                  onClick={() => {
                    setSource('all')
                    setVisible(18)
                  }}
                >
                  清除信源筛选 ×
                </button>
              )}
            </span>
          </div>
          {filtered.length > 0 ? (
            <>
              <div className="article-list">
                {filtered.slice(0, visible).map((a, i) => (
                  <ArticleCard key={`${a.link}-${i}`} article={a} />
                ))}
              </div>
              {visible < filtered.length ? (
                <button className="load-more" onClick={() => setVisible((v) => v + 18)}>
                  再看 18 条{' '}
                  <span>
                    已显示 {Math.min(visible, filtered.length)} / {filtered.length}
                  </span>
                </button>
              ) : (
                <p className="feed-end">已浏览当前筛选下的全部内容</p>
              )}
            </>
          ) : (
            <div className="empty-state">
              <h3>还没有找到匹配的内容</h3>
              <p>试试其他关键词，或清除当前筛选。</p>
              <button onClick={reset}>清除筛选</button>
            </div>
          )}
        </div>
        <aside className="discovery-aside">
          <section className="source-directory">
            <div className="aside-heading">
              <h2>信源索引</h2>
              <span>{sources.length} 个</span>
            </div>
            <p>从不同视角，观察同一个技术世界。</p>
            <div className="source-options">
              <button
                className={source === 'all' ? 'selected' : ''}
                aria-pressed={source === 'all'}
                onClick={() => {
                  setSource('all')
                  setVisible(18)
                }}
              >
                <span>全部信源</span>
                <span>{articles.length}</span>
              </button>
              {sources.map((name) => (
                <button
                  key={name}
                  className={source === name ? 'selected' : ''}
                  aria-pressed={source === name}
                  onClick={() => {
                    setSource(name)
                    setVisible(18)
                  }}
                >
                  <span>{name}</span>
                  <span>{articles.filter((a) => a.source === name).length}</span>
                </button>
              ))}
            </div>
          </section>
          <section className="snapshot-note">
            <span className="aside-eyebrow">关于这份雷达</span>
            <h2>
              少一点噪声，
              <br />
              多一点发现。
            </h2>
            <p>
              自动聚合公开 RSS 内容，保留原始信源与链接。观点与版权归原作者，点击标题即可前往原文。
            </p>
            {latest && (
              <p className="snapshot-date">
                最近内容日期
                <br />
                <time dateTime={new Date(latest).toISOString()}>{formatDate(latest)}</time>
              </p>
            )}
            <Link href="/archive/1" className="archive-entry">
              按页浏览完整归档 ↗
            </Link>
            <Link href="/about">
              了解收录方式 <span aria-hidden="true">↗</span>
            </Link>
          </section>
        </aside>
      </div>
    </section>
  )
}
