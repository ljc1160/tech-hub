'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { categories } from '@/lib/site'
import { Mark } from './Mark'
export function Header() {
  const pathname = usePathname()
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="INS 技术雷达首页">
          <Mark />
          <span className="brand-word">
            ins<span>.</span>
          </span>
          <span className="brand-description">技术雷达</span>
        </Link>
        <nav className="main-nav" aria-label="主导航">
          {categories.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              aria-current={pathname === c.href ? 'page' : undefined}
            >
              {c.key === 'all' ? '发现' : c.label}
            </Link>
          ))}
        </nav>
        <div className="header-end">
          <Link href="/about" aria-current={pathname === '/about' ? 'page' : undefined}>
            关于
          </Link>
          <a
            className="home-link"
            href="https://itcsdn.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            万象主站 <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </header>
  )
}
