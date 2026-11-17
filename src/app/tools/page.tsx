import { CategoryPage } from '@/components/CategoryPage'
import { pageMetadata } from '@/lib/site'
export const metadata = pageMetadata(
  '开发工具与效率资源',
  '发现开发工具、效率应用和实用资源，按关键词与信源筛选适合你的技术工具。',
  '/tools'
)
export default function Page() {
  return <CategoryPage category="tools" />
}
