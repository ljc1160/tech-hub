export function Mark({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="1.5" opacity=".3" />
      <circle cx="20" cy="20" r="9" stroke="currentColor" strokeWidth="1.5" opacity=".55" />
      <path
        d="M20 20 31 9M20 4v4M4 20h4M20 32v4M32 20h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="20" cy="20" r="3" fill="currentColor" />
      <circle cx="30.5" cy="9.5" r="2.5" fill="currentColor" />
    </svg>
  )
}
