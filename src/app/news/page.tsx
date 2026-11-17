import { CategoryPage } from '@/components/CategoryPage'
import { pageMetadata } from '@/lib/site'
export const metadata = pageMetadata(
  '技术资讯与开发者社区',
  '阅读技术行业资讯、开发者观察与社区讨论，了解技术生态正在发生的变化。',
  '/news'
)
export default function Page() {
  return <CategoryPage category="news" />
}
