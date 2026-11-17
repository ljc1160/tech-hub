import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticles } from '@/lib/articles'
import { pageMetadata } from '@/lib/site'
import { ArticleCard } from '@/components/ArticleCard'
const PAGE_SIZE = 36
export function generateStaticParams() {
  return Array.from({ length: Math.ceil(getArticles().length / PAGE_SIZE) }, (_, i) => ({
    page: String(i + 1),
  }))
}
export const dynamicParams = false
export function generateMetadata({ params }: { params: { page: string } }) {
  return pageMetadata(
    `技术内容归档 · 第 ${params.page} 页`,
    '按原始发布日期浏览 INS 技术雷达完整内容归档，发现 AI 研究、开源项目、技术社区与开发工具。',
    `/archive/${params.page}`
  )
}
export default function Archive({ params }: { params: { page: string } }) {
  const page = Number(params.page),
    articles = getArticles().sort((a, b) => Date.parse(b.pubDate) - Date.parse(a.pubDate)),
    total = Math.ceil(articles.length / PAGE_SIZE)
  if (!Number.isInteger(page) || page < 1 || page > total) notFound()
  return (
    <div className="archive-page">
      <header className="category-header">
        <nav className="breadcrumb" aria-label="面包屑">
          <Link href="/">发现</Link>
          <span>/</span>
          <span>内容归档</span>
        </nav>
        <h1>每一次发现，都有迹可循。</h1>
        <p>
          完整收录 {articles.length} 条内容 · 第 {page} / {total} 页
        </p>
      </header>
      <div className="article-list">
        {articles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map((a, i) => (
          <ArticleCard key={i} article={a} />
        ))}
      </div>
      <nav className="pagination" aria-label="归档分页">
        {page > 1 ? (
          <Link href={`/archive/${page - 1}`} rel="prev">
            ← 上一页
          </Link>
        ) : (
          <span>已是第一页</span>
        )}
        <span>
          {page} / {total}
        </span>
        {page < total ? (
          <Link href={`/archive/${page + 1}`} rel="next">
            下一页 →
          </Link>
        ) : (
          <Link href="/">回到发现</Link>
        )}
      </nav>
    </div>
  )
}
