'use client'

import WeepleLogo from './WeepleLogo'

type LinkGroup = {
  title: string
  links: { label: string; href: string }[]
}

const groups: LinkGroup[] = [
  {
    title: '제품',
    links: [
      { label: '기능', href: '#smart-insights' },
      { label: '가격', href: '#pricing' },
      { label: '3D 체험', href: '#live-demo' },
    ],
  },
  {
    title: '지원',
    links: [
      { label: '소개', href: '#about' },
      { label: '자주 묻는 질문', href: '#faq' },
      { label: '문의하기', href: 'mailto:support@weeple.app' },
    ],
  },
  {
    title: '가이드',
    links: [
      { label: '가계부 앱 추천', href: '/guides/budget-app-recommendation' },
      { label: '공유 가계부 앱 비교', href: '/guides/shared-budget-app-comparison' },
      { label: '커플 가계부 앱', href: '/guides/couple-budget-app' },
      { label: '공동 예산 관리', href: '/guides/shared-budget' },
      { label: '자연어 가계부 입력', href: '/guides/natural-language-budget' },
    ],
  },
  {
    title: '법적 고지',
    links: [
      { label: '이용약관', href: '/terms-of-service.html' },
      { label: '개인정보처리방침', href: '/privacy-policy.html' },
      { label: '계정 삭제', href: '/delete-account.html' },
    ],
  },
]

const businessInfo = [
  '윗플 (weeple)',
  '대표 정성훈',
  '사업자등록번호 239-49-00999',
  '통신판매업신고 추후 등록 예정',
  '서울특별시 동작구',
]

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-divider bg-bg">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main grid */}
        <div className="grid gap-10 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <WeepleLogo size={36} />
              <div
                className="text-2xl font-extrabold tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #0EA5A0 0%, #5EEAD4 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                weeple
              </div>
            </div>
            <p className="text-sm text-fg-secondary leading-relaxed max-w-xs mb-6">
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
              <SocialIcon label="GitHub" href="https://github.com/slimex200-wq/">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </SocialIcon>
              <SocialIcon label="Threads" href="https://www.threads.net/@hype.boyo">
                <path
                  fill="currentColor"
                  stroke="none"
                  d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.74-1.757-.504-.58-1.288-.875-2.327-.875h-.03c-.8 0-1.886.218-2.58 1.25l-1.7-1.142c.93-1.382 2.445-2.144 4.28-2.144h.043c3.07.019 4.899 1.904 5.081 5.199.104.045.207.09.309.136 1.44.669 2.493 1.682 3.045 2.93.77 1.742.84 4.582-1.46 6.835-1.757 1.72-3.891 2.495-6.922 2.515Zm1.03-7.02c-.27 0-.543.009-.822.025-1.84.107-2.981.956-2.916 2.167.062 1.15 1.254 1.683 2.457 1.614 1.081-.06 2.5-.481 2.74-3.584a10.715 10.715 0 0 0-1.46-.22z"
                />
              </SocialIcon>
            </div>
          </div>

          {/* Link groups */}
          {groups.map((g) => (
            <div key={g.title}>
              <h4 className="text-xs font-semibold text-fg uppercase tracking-wider mb-4">
                {g.title}
              </h4>
              <ul className="space-y-3">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-fg-secondary hover:text-mint transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          lang="ko"
          className="mt-10 border-t border-divider pt-6 text-xs leading-6 text-fg-muted sm:mt-14 sm:pt-8"
        >
          <div className="mb-2 font-semibold text-fg-secondary">사업자 정보</div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {businessInfo.map((item) => (
              <span key={item}>{item}</span>
            ))}
            <a
              href="mailto:support@weeple.app"
              className="hover:text-mint transition-colors"
            >
              support@weeple.app
            </a>
          </div>
          <p className="mt-1">세부 주소는 고객지원 이메일로 문의할 수 있습니다.</p>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 border-t border-divider pt-6 flex flex-col sm:flex-row justify-between gap-4 text-xs text-fg-muted">
          <div>
            © 2026 weeple. All rights reserved. ·
            <span className="num ml-1">v1.0</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span>커플을 위한 가계부 · 서울</span>
            <a
              href="mailto:support@weeple.app"
              className="hover:text-mint transition-colors"
            >
              문의 support@weeple.app
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({
  label,
  href = '#',
  children,
}: {
  label: string
  href?: string
  children: React.ReactNode
}) {
  const isExternal = href.startsWith('http')
  return (
    <a
      href={href}
      aria-label={label}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="w-9 h-9 rounded-full border border-divider bg-bg-surface flex items-center justify-center text-fg-muted transition-all hover:border-mint hover:text-mint hover:scale-105"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
    </a>
  )
}
