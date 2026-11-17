import Image from 'next/image'
import Link from 'next/link'
import { pageMetadata } from '@/lib/site'
import { getArticles } from '@/lib/articles'
export const metadata = pageMetadata(
  '关于 INS · 收录方式与内容来源',
  '了解 INS 技术雷达的公开 RSS 聚合方式、内容来源、更新机制与版权说明，以及 ITCSDN 独立作品空间。',
  '/about'
)
export default function AboutPage() {
  const articles = getArticles(),
    sources = Array.from(new Set(articles.map((a) => a.source)))
  return (
    <div className="about-page">
      <nav className="breadcrumb" aria-label="面包屑">
        <Link href="/">发现</Link>
        <span>/</span>
        <span aria-current="page">关于</span>
      </nav>
      <header className="category-header">
        <p className="hero-eyebrow">Insights, with curiosity.</p>
        <h1>为好奇心，留一扇窗。</h1>
        <p>
          INS 是 ITCSDN 的独立技术雷达。我们连接分散的技术内容，
          <br className="desktop-break" />
          让发现新知成为一件简单、轻松的事。
        </p>
      </header>
      <div className="about-grid">
        <section>
          <h2>来自真实的技术世界</h2>
          <p>
            内容通过公开 RSS
            信源自动收录，覆盖人工智能、开源项目、开发工具与社区资讯。每条内容保留原始来源与访问链接，不把聚合内容包装成本站原创。
          </p>
          <div className="about-sources">
            {sources.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <h2>更新与筛选</h2>
          <p>
            采集工作流配置为每 6
            小时运行一次；实际更新取决于采集执行和站点发布。页面显示内容自身的发布日期，首页注明最近内容日期，不以“实时”标签替代真实状态。
          </p>
          <p>
            站内关键词搜索与信源筛选在浏览器中完成。排序依据原始发布日期；编辑收藏单独展示，未经核实的热度和排名不作呈现。
          </p>
          <h2>尊重原作，回到原文</h2>
          <p>
            文章观点、内容与版权归原作者及其发布平台所有。本站用于内容发现和索引，完整内容请通过“阅读原文”前往原始页面阅读。
          </p>
          <a
            className="text-link"
            href="https://itcsdn.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            走进 ITCSDN · 华夏长歌 ↗
          </a>
        </section>
        <aside className="recommendation">
          <span className="aside-eyebrow">创作者的另一件小作品</span>
          <h2>免费证件照制作</h2>
          <p>支持一寸、二寸等多种尺寸，自由更换底色。</p>
          <Image
            src="/sponsors/gh_2bf4a7d2a911_344.jpg"
            width={160}
            height={160}
            alt="免费证件照制作微信小程序二维码"
          />
          <span>微信扫码体验</span>
          <p className="recommendation-note">独立工具推荐，与资讯收录分开呈现。</p>
        </aside>
      </div>
    </div>
  )
}
