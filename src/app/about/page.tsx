import type { Metadata } from 'next'

export const metadata: Metadata = { title: '关于 — itcsdn.com' }

export default function AboutPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">关于 itcsdn.com</h1>
      <div className="prose prose-gray space-y-4 text-gray-600">
        <p>
          itcsdn.com 是一个面向开发者的技术内容聚合站，自动收集来自
          GitHub、Hacker News、Reddit 和 arXiv 的最新技术动态。
        </p>
        <p>
          所有内容来自各平台官方 RSS 订阅源，仅展示标题与摘要，
          点击链接可访问原文。
        </p>
        <p>
          站长会不定期添加精选推荐，分享个人觉得值得一读的文章和工具。
        </p>
        <p className="text-sm text-gray-400">
          内容每小时自动更新。
        </p>
      </div>
    </div>
  )
}
