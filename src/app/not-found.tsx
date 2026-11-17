import Link from 'next/link'
export default function NotFound() {
  return (
    <section className="not-found">
      <span>404 / Signal not found</span>
      <h1>这条信号，暂时不在雷达上。</h1>
      <p>页面可能已移动，回到发现页继续探索。</p>
      <Link className="primary-button" href="/">
        回到发现 ↗
      </Link>
    </section>
  )
}
