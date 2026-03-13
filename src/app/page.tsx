import Link from 'next/link'
import { getArticles, getCurated } from '@/lib/articles'
import { ArticleCard } from '@/components/ArticleCard'
import { CuratedCard } from '@/components/CuratedCard'

function SectionHeader({
  title,
  href,
  cta = '查看全部',
}: {
  title: string
  href: string
  cta?: string
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <Link
        href={href}
        className="flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
      >
        {cta}
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  )
}

export default function Home() {
  const articles = getArticles()
  const curated = getCurated()
  const aiArticles = articles.filter(a => a.category === 'ai').slice(0, 6)
  const opensourceArticles = articles.filter(a => a.category === 'opensource').slice(0, 6)
  const newsArticles = articles.filter(a => a.category === 'news').slice(0, 6)

  return (
    <div className="space-y-20">
      {/* ── Hero Section ── */}
      <section className="-mx-6 -mt-12 lg:-mx-8 px-6 lg:px-8 pt-20 pb-16 relative overflow-hidden">
        {/* 背景渐变 */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, #eef2ff 0%, transparent 70%)',
          }}
        />
        {/* 装饰点阵 */}
        <div
          className="absolute inset-0 -z-10 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle, #c7d2fe 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="max-w-3xl">
          {/* 角标 */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            每小时自动更新
          </div>

          {/* Slogan */}
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
            开发者的
            <span className="text-accent"> 技术雷达</span>
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
            聚合 GitHub、Hacker News、Reddit、arXiv 精华内容，
            帮你在信息洪流中找到真正值得关注的技术动态。
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="/ai"
              className="px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors shadow-sm"
            >
              探索 AI 资讯
            </Link>
            <Link
              href="/opensource"
              className="px-5 py-2.5 rounded-xl bg-white text-slate-700 text-sm font-medium border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors"
            >
              开源项目
            </Link>
          </div>
        </div>
      </section>

      {/* ── 站长精选 ── */}
      {curated.length > 0 && (
        <section>
          <SectionHeader title="站长精选" href="/about" cta="关于站长" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {curated.map((item, i) => (
              <CuratedCard key={i} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* ── AI 资讯 ── */}
      <section>
        <SectionHeader title="AI 资讯" href="/ai" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aiArticles.map((a, i) => (
            <ArticleCard key={i} article={a} />
          ))}
        </div>
      </section>

      {/* ── 开源项目 ── */}
      <section>
        <SectionHeader title="开源项目" href="/opensource" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {opensourceArticles.map((a, i) => (
            <ArticleCard key={i} article={a} />
          ))}
        </div>
      </section>

      {/* ── 技术资讯 ── */}
      <section>
        <SectionHeader title="技术资讯" href="/news" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {newsArticles.map((a, i) => (
            <ArticleCard key={i} article={a} />
          ))}
        </div>
      </section>
    </div>
  )
}
