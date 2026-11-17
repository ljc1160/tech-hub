import { CategoryPage } from '@/components/CategoryPage'
import { pageMetadata } from '@/lib/site'
export const metadata = pageMetadata(
  'AI 前沿与人工智能资讯',
  '发现 AI 模型、研究进展和应用工程内容，按信源与关键词浏览人工智能领域动态。',
  '/ai'
)
export default function Page() {
  return <CategoryPage category="ai" />
}
