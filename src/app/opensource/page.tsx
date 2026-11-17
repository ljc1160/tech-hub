import { CategoryPage } from '@/components/CategoryPage'
import { pageMetadata } from '@/lib/site'
export const metadata = pageMetadata(
  '开源项目与开发框架',
  '发现开源项目、开发框架和社区实践，按信源浏览值得关注的开源技术内容。',
  '/opensource'
)
export default function Page() {
  return <CategoryPage category="opensource" />
}
