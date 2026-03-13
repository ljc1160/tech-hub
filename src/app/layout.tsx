import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'itcsdn.com — 开发者技术趋势聚合',
  description: '自动聚合 GitHub、Hacker News、Reddit、arXiv 最新技术内容，面向开发者的技术趋势导航站。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" className={inter.variable}>
      <body className="bg-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 lg:px-8">
          {children}
        </main>
        <footer className="border-t border-slate-100 mt-20">
          <div className="max-w-7xl mx-auto px-6 py-10 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm font-semibold text-slate-900">itcsdn.com</p>
              <p className="text-xs text-slate-400">
                内容来自官方 RSS · 每小时自动更新 · 点击链接访问原文
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
