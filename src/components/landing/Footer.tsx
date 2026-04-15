'use client'

export default function Footer() {
  return (
    <footer
      className="relative"
      style={{
        background: 'var(--bg-darkest)',
        borderTop: '1px solid var(--border-soft)',
        padding: '40px 0 60px',
      }}
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 flex flex-wrap items-baseline justify-between gap-4">
        <span
          className="display"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 20,
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
          }}
        >
          weeple
        </span>
        <span
          className="eyebrow"
          style={{ color: 'var(--text-muted)' }}
        >
          © 2026 weeple · seoul · all rights reserved
        </span>
        <span className="mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>
          BUILD · OR-LDG-01 · v2026.04
        </span>
      </div>
    </footer>
  )
}
