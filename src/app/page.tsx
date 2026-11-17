import { getArticles, getCurated } from '@/lib/articles'
import { pageMetadata, formatDate } from '@/lib/site'
import { CuratedCard } from '@/components/CuratedCard'
import { ArticleExplorer } from '@/components/ArticleExplorer'
export const metadata = pageMetadata(
  'AI 前沿、开源项目与开发者资讯',
  'INS 技术雷达聚合人工智能、开源项目、开发工具与技术社区内容，支持关键词搜索与信源筛选，帮助开发者发现值得阅读的技术动态。',
  '/'
)
export default function Home() {
  const articles = getArticles(),
    curated = getCurated()
  const latest = articles.reduce(
    (m, a) => (Date.parse(a.pubDate) > Date.parse(m) ? a.pubDate : m),
    articles[0]?.pubDate || ''
  )
  const sources = new Set(articles.map((a) => a.source)).size
  return (
    <>
      <section className="home-hero">
        <div className="hero-copy">
          <p className="hero-eyebrow">
            <span></span>来自真实信源，保持独立视角
          </p>
          <h1>
            技术的下一步，
            <br />
            在这里看见。
          </h1>
          <p className="hero-description">
            从 AI 前沿到开源世界，从新工具到新观点。
            <br className="desktop-break" />
            把纷繁的信息，整理成值得你停下来的发现。
          </p>
          <div className="hero-bottom">
            <a className="primary-button" href="#discover">
              开始探索 <span aria-hidden="true">↓</span>
            </a>
            <span>
              收录 <strong>{articles.length}</strong> 条内容 <i> / </i>
              <strong>{sources}</strong> 个信源
            </span>
          </div>
        </div>
        <div className="radar-panel" aria-hidden="true">
          <div className="radar-top">
            <span>Signal / Discovery</span>
            <span>INS</span>
          </div>
          <svg viewBox="0 0 420 290" fill="none">
            <circle cx="220" cy="146" r="110" />
            <circle cx="220" cy="146" r="78" />
            <circle cx="220" cy="146" r="43" />
            <path d="M220 18v256M92 146h256" />
            <path d="m139 65 162 162m-162 0L301 65" strokeDasharray="3 7" />
            <g className="radar-scan">
              <path
                d="M220 146V36a110 110 0 0 1 94 53Z"
                fill="currentColor"
                fillOpacity=".08"
                stroke="none"
              />
              <path d="m220 146 94-57" className="radar-ray" />
            </g>
            <circle className="radar-dot" cx="266" cy="94" r="5" />
            <circle className="radar-dot" cx="151" cy="170" r="4" />
            <circle className="radar-dot" cx="279" cy="207" r="4" />
            <circle cx="220" cy="146" r="5" fill="currentColor" />
            <text x="280" y="82">
              AI
            </text>
            <text x="70" y="191">
              Open source
            </text>
            <text x="292" y="228">
              Tools
            </text>
          </svg>
          <div className="radar-foot">
            <span>连接信源，发现新知。</span>
            <span>↗</span>
          </div>
        </div>
      </section>
      <div className="snapshot-bar">
        <span>当前内容快照</span>
        <time dateTime={new Date(latest).toISOString()}>{formatDate(latest)}</time>
        <p>持续收集，按原始发布日期呈现。</p>
        <a href="/feed.xml">RSS 订阅 ↗</a>
      </div>
      {curated.length > 0 && (
        <section className="curated-section" aria-labelledby="curated-title">
          <div className="section-heading">
            <h2 id="curated-title">值得慢读</h2>
            <span>从编辑收藏开始，找到新的思路。</span>
          </div>
          <div className="curated-grid">
            {curated.map((item, i) => (
              <CuratedCard key={i} item={item} />
            ))}
          </div>
        </section>
      )}
      <ArticleExplorer articles={articles} />
    </>
  )
}
