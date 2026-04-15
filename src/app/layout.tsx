import type { Metadata } from 'next'
import { Geist_Mono, Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'weeple — 통장은 따로, 대시보드는 같이',
  description:
    '동거 · 신혼 커플을 위한 AI 가계부. 통장을 합치지 않아도, 두 사람의 소비가 하나의 대시보드에 모입니다. 증여세 없이, 투명하게.',
  openGraph: {
    title: 'weeple — 통장은 따로, 대시보드는 같이',
    description:
      '동거 · 신혼 커플을 위한 AI 가계부. 자연어 입력, 커플 모드 3가지, AI 월간 리포트.',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ko"
      className={`${spaceGrotesk.variable} ${inter.variable} ${geistMono.variable} dark`}
      style={{
        // Override the CSS vars with next/font-loaded families.
        ['--font-display' as string]: `var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif`,
        ['--font-body' as string]: `var(--font-inter), 'Pretendard Variable', 'Pretendard', system-ui, sans-serif`,
      }}
    >
      <body>
        <noscript>
          <div
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              padding: '48px 32px',
              background: '#0A0806',
              color: '#F5EDD8',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                opacity: 0.6,
              }}
            >
              WEEPLE · COUPLE LEDGER · 2026
            </div>
            <h1
              style={{
                fontSize: 'min(20vw, 180px)',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                lineHeight: 0.9,
                margin: 0,
              }}
            >
              weeple
            </h1>
            <p style={{ fontSize: 20, maxWidth: 420, lineHeight: 1.4 }}>
              통장은 따로,
              <br />
              대시보드는 같이.
              <br />
              <span style={{ color: '#E8743A' }}>
                JavaScript 를 켜면 전체 경험이 열립니다.
              </span>
            </p>
          </div>
        </noscript>
        {children}
      </body>
    </html>
  )
}
