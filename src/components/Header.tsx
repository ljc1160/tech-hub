'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/ai', label: 'AI' },
  { href: '/opensource', label: '开源' },
  { href: '/news', label: '资讯' },
  { href: '/about', label: '关于' },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* 品牌 Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center shadow-sm">
              <span className="text-white text-xs font-bold">I</span>
            </div>
            <span className="font-semibold text-slate-900 group-hover:text-accent transition-colors">
              itcsdn<span className="text-accent font-bold">.com</span>
            </span>
          </Link>

          {/* 桌面导航 */}
          <nav className="hidden sm:flex items-center gap-1">
            {navItems.map(({ href, label }) => {
              const isActive = pathname === href || pathname.startsWith(href + '/')
              return (
                <Link
                  key={href}
                  href={href}
                  className={`
                    relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive
                      ? 'text-accent bg-accent/8'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }
                  `}
                >
                  {label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* 移动端导航（小屏幕横排） */}
          <nav className="flex sm:hidden items-center gap-0.5">
            {navItems.map(({ href, label }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={`
                    px-3 py-1.5 rounded-md text-xs font-medium transition-colors
                    ${isActive ? 'text-accent bg-accent/8' : 'text-slate-500 hover:text-slate-900'}
                  `}
                >
                  {label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}
