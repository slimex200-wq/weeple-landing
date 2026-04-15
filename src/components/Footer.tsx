'use client'

/**
 * Footer — Editorial Warm v2.
 *
 * Brand "weeple" 는 Instrument Serif italic + teal 마침표.
 * 링크는 Pretendard, 호버 시 teal.
 */

type LinkGroup = {
  title: string
  links: { label: string; href: string }[]
}

const groups: LinkGroup[] = [
  {
    title: '제품',
    links: [
      { label: '기능', href: '#' },
      { label: '가격', href: '#pricing' },
      { label: '3D 체험', href: '#experience' },
      { label: '업데이트 노트', href: '#' },
    ],
  },
  {
    title: '회사',
    links: [
      { label: '소개', href: '#' },
      { label: '블로그', href: '#' },
      { label: '보도자료', href: '#' },
      { label: '채용', href: '#' },
    ],
  },
  {
    title: '지원',
    links: [
      { label: '고객센터', href: '#' },
      { label: '자주 묻는 질문', href: '#' },
      { label: '문의하기', href: 'mailto:support@weeple.app' },
      { label: '상태 페이지', href: '#' },
    ],
  },
  {
    title: '법적 고지',
    links: [
      { label: '이용약관', href: '/terms-of-service.html' },
      { label: '개인정보처리방침', href: '/privacy-policy.html' },
      { label: '위치정보 약관', href: '#' },
      { label: '사업자 정보', href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer
      className="relative mt-20"
      style={{
        background: 'var(--paper)',
        borderTop: '1px solid var(--rule)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main grid */}
        <div className="grid gap-10 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
          {/* Brand column */}
          <div>
            <div className="flex items-baseline gap-1 mb-4">
              <span
                className="text-3xl tracking-tight"
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  color: 'var(--ink)',
                  letterSpacing: '-0.01em',
                }}
              >
                weeple
              </span>
              <span
                className="text-3xl"
                style={{
                  fontFamily: 'var(--serif)',
                  color: 'var(--teal)',
                }}
              >
                .
              </span>
            </div>
            <p
              className="text-sm leading-relaxed max-w-xs mb-6"
              style={{ color: 'var(--ink-2)' }}
            >
              둘이 쓰는 돈, 한눈에. 자연어 입력부터 AI 분석까지 한 앱에서.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              <SocialIcon label="Instagram">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </SocialIcon>
              <SocialIcon label="X (Twitter)">
                <path d="M18 4 6 20M6 4l12 16" />
              </SocialIcon>
              <SocialIcon label="GitHub">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </SocialIcon>
              <SocialIcon label="Threads">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
                <path d="M8 12c1.5 2.5 4 4 8 3.5" />
                <path d="M8.5 8.5c2-1 5-1 6 1" />
              </SocialIcon>
            </div>
          </div>

          {/* Link groups */}
          {groups.map((g) => (
            <div key={g.title}>
              <h4
                className="text-[11px] font-semibold uppercase tracking-[0.12em] mb-4"
                style={{ color: 'var(--ink)' }}
              >
                {g.title}
              </h4>
              <ul className="space-y-3">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm transition-colors"
                      style={{ color: 'var(--ink-2)' }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = 'var(--teal)')
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = 'var(--ink-2)')
                      }
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 pt-8 flex flex-col sm:flex-row justify-between gap-4 text-xs"
          style={{
            borderTop: '1px solid var(--rule-soft)',
            color: 'var(--ink-3)',
          }}
        >
          <div>
            © 2026 weeple. All rights reserved. ·
            <span className="num ml-1">v1.0</span>
          </div>
          <div className="flex gap-4">
            <span>Made in Seoul</span>
            <span className="num">· Supabase + Expo SDK 55</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href="#"
      aria-label={label}
      className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105"
      style={{
        background: 'var(--white)',
        border: '1px solid var(--rule)',
        color: 'var(--ink-3)',
        boxShadow: 'var(--shadow-1)',
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
    </a>
  )
}
