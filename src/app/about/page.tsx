import type { Metadata } from 'next'
import Image from 'next/image'

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

      <div className="space-y-8">
        {/* 数据来源 */}
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

        {/* 站长推荐 */}
        <div>
          <h2 className="text-base font-semibold text-slate-900 mb-3">站长推荐</h2>
          <div className="relative bg-white rounded-2xl p-5 border border-slate-100 shadow-card overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400 rounded-l-2xl" />
            <div className="pl-3 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-amber-50 text-amber-700">
                    工具推荐
                  </span>
                  <span className="text-xs text-slate-400">微信小程序</span>
                </div>
                <p className="text-sm font-semibold text-slate-900 mb-1">免费证件照制作</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  一键制作高清证件照，支持一寸、二寸等多种尺寸，自由更换底色，免费使用。
                </p>
              </div>
              <div className="flex-shrink-0 flex flex-col items-center gap-1">
                <Image
                  src="/sponsors/gh_2bf4a7d2a911_344.jpg"
                  alt="免费证件照制作小程序二维码"
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
                <span className="text-xs text-slate-400">扫码体验</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
