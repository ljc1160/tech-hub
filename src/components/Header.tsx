import Link from 'next/link'

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-gray-900">
          itcsdn.com
        </Link>
        <nav className="flex items-center gap-6 text-sm text-gray-600">
          <Link href="/ai" className="hover:text-gray-900">AI</Link>
          <Link href="/opensource" className="hover:text-gray-900">开源</Link>
          <Link href="/news" className="hover:text-gray-900">资讯</Link>
          <Link href="/about" className="hover:text-gray-900">关于</Link>
        </nav>
      </div>
    </header>
  )
}
