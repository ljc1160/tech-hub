import type { Metadata } from 'next'
export const SITE_URL = 'https://ins.itcsdn.com'
export const SITE_NAME = 'INS 技术雷达'
export const categories = [
  {
    key: 'all',
    href: '/',
    label: '全部动态',
    title: '开发者的技术雷达',
    description:
      '聚合 AI 研究、开源项目、开发工具与技术社区资讯，从真实信源发现值得阅读的技术内容。',
  },
  {
    key: 'ai',
    href: '/ai',
    label: '人工智能',
    title: '人工智能，持续向前。',
    description: '追踪人工智能研究、模型应用与工程实践，阅读来自技术社区和研究团队的一手内容。',
  },
  {
    key: 'opensource',
    href: '/opensource',
    label: '开源项目',
    title: '好代码，值得被发现。',
    description: '发现开源项目、开发框架与技术实践，从项目与社区讨论中寻找下一份灵感。',
  },
  {
    key: 'news',
    href: '/news',
    label: '技术资讯',
    title: '听见技术社区的声音。',
    description: '汇集行业资讯、开发者观察与社区讨论，在不同的观点之间，理解正在发生的变化。',
  },
  {
    key: 'tools',
    href: '/tools',
    label: '开发工具',
    title: '让创造，多一件趁手的工具。',
    description: '探索开发工具、效率应用与实用资源，让日常开发和技术探索更顺手。',
  },
] as const
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'zh_CN',
      title,
      description,
      url: SITE_URL + path,
      images: [
        { url: '/og-cover.png', width: 1200, height: 630, alt: 'INS 技术雷达 — 发现技术的下一步' },
      ],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/og-cover.png'] },
  }
}
export function formatDate(value: string) {
  const d = new Date(value)
  return Number.isNaN(d.getTime())
    ? '日期待确认'
    : new Intl.DateTimeFormat('zh-CN', {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(d)
}
export function cleanSummary(value: string) {
  const text = value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(?:nbsp|amp|lt|gt|quot);/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return /^(点击查看原文|阅读原文|查看更多)[>＞\s]*$/.test(text) ? '' : text
}
