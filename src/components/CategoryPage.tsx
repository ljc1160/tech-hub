import Link from 'next/link'
import { getArticlesByCategory } from '@/lib/articles'
import { categories, SITE_URL } from '@/lib/site'
import { ArticleExplorer } from './ArticleExplorer'
export function CategoryPage({ category }: { category: string }) {
  const info = categories.find((c) => c.key === category)!
  const articles = getArticlesByCategory(category)
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    url: SITE_URL + info.href,
    name: info.label,
    description: info.description,
    inLanguage: 'zh-CN',
    isPartOf: { '@id': SITE_URL + '/#website' },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '发现', item: SITE_URL + '/' },
        { '@type': 'ListItem', position: 2, name: info.label, item: SITE_URL + info.href },
      ],
    },
  }
  return (
    <>
      <header className="category-header">
        <nav className="breadcrumb" aria-label="面包屑">
          <Link href="/">发现</Link>
          <span>/</span>
          <span aria-current="page">{info.label}</span>
        </nav>
        <h1>{info.title}</h1>
        <p>{info.description}</p>
        <span className="category-total">
          {articles.length} 条内容，{new Set(articles.map((a) => a.source)).size} 个信源
        </span>
      </header>
      <ArticleExplorer articles={articles} category={category} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
      />
    </>
  )
}
