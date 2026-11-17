import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Link from 'next/link'
import './globals.css'
import { Header } from '@/components/Header'
import { SITE_URL, SITE_NAME } from '@/lib/site'
const geist = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  display: 'swap',
  weight: '100 900',
})
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'INS 技术雷达｜AI 前沿、开源项目与开发者资讯', template: '%s | INS 技术雷达' },
  description:
    'INS 技术雷达聚合人工智能、开源项目、开发工具与技术社区内容。按分类、信源与关键词发现值得阅读的技术动态。',
  applicationName: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: { icon: '/icon.svg' },
  alternates: { types: { 'application/rss+xml': SITE_URL + '/feed.xml' } },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'zh_CN',
    url: SITE_URL,
    title: SITE_NAME,
    description: '发现技术的下一步。AI 前沿、开源项目与开发者资讯。',
    images: [
      { url: '/og-cover.png', width: 1200, height: 630, alt: 'INS 技术雷达 — 发现技术的下一步' },
    ],
  },
  twitter: { card: 'summary_large_image', title: SITE_NAME, images: ['/og-cover.png'] },
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structured = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_URL + '/#website',
    url: SITE_URL,
    name: SITE_NAME,
    alternateName: 'INS Insights',
    inLanguage: 'zh-CN',
    description: '开发者技术趋势聚合与发现',
  }
  return (
    <html lang="zh-CN" className={geist.variable}>
      <body>
        <a className="skip-link" href="#main">
          跳至正文
        </a>
        <Header />
        <main id="main" className="site-main">
          {children}
        </main>
        <footer className="site-footer">
          <div>
            <Link className="footer-brand" href="/">
              ins<span>.</span>
              <small>保持好奇，持续发现。</small>
            </Link>
            <p>内容与观点归原作者所有，本站保留原始信源与链接。</p>
          </div>
          <nav aria-label="页脚导航">
            <Link href="/about">关于雷达</Link>
            <Link href="/archive/1">内容归档</Link>
            <a href="/feed.xml">RSS 订阅</a>
            <a href="https://itcsdn.com/" target="_blank" rel="noopener noreferrer">
              ITCSDN 主站 ↗
            </a>
          </nav>
          <span className="footer-copyright">© {new Date().getFullYear()} INS · ITCSDN</span>
        </footer>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, '\\u003c') }}
        />
      </body>
    </html>
  )
}
