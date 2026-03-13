import type { Metadata } from 'next'

export const metadata: Metadata = { title: '关于 — itcsdn.com' }

const sources = [
  { name: 'GitHub Trending', desc: '每日热门开源项目' },
  { name: 'Hacker News', desc: '技术社区精华讨论' },
  { name: 'Reddit', desc: 'r/programming 等开发者社区' },
  { name: 'arXiv', desc: 'AI / ML 最新研究论文' },
]

export default function AboutPage() {
  return (
    <div className="max-w-2xl">
      {/* 页面头部 */}
      <div className="mb-10 pb-8 border-b border-slate-100">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-4">
          关于
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">关于 itcsdn.com</h1>
        <p className="text-slate-500 leading-relaxed">
          一个面向开发者的技术内容聚合平台，帮你在信息洪流中筛出真正有价值的技术动态。
        </p>
      </div>

      {/* 内容说明 */}
      <div className="space-y-8">
        <div>
          <h2 className="text-base font-semibold text-slate-900 mb-3">数据来源</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {sources.map(s => (
              <div
                key={s.name}
                className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-slate-100"
              >
                <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-slate-900">{s.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-accent/5 border border-accent/20">
          <h2 className="text-base font-semibold text-slate-900 mb-2">内容说明</h2>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">·</span>
              所有内容均来自各平台官方 RSS 订阅源
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">·</span>
              仅展示标题与摘要，点击链接访问原文
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">·</span>
              站长会不定期手动添加「精选推荐」
            </li>
          </ul>
        </div>

        <p className="text-xs text-slate-400">内容每小时通过 GitHub Actions 自动更新。</p>
      </div>
    </div>
  )
}
