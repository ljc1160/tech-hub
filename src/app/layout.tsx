import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'itcsdn.com — 开发者技术趋势聚合',
  description: '自动聚合 GitHub、Hacker News、Reddit、arXiv 最新技术内容，面向开发者的技术趋势导航站。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-gray-200 mt-16 py-8 text-center text-sm text-gray-400">
          itcsdn.com · 内容来自官方 RSS · 点击链接访问原文
        </footer>
      </body>
    </html>
  )
}
