import type { Metadata } from 'next'
import { Geist_Mono } from 'next/font/google'
import './globals.css'
import ScrollProgress from '@/components/ScrollProgress'

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'weeple — 둘이 쓰는 돈, 한눈에',
  description:
    '개인부터 커플 공동 예산까지. 자연어 빠른 입력, 영수증 OCR, 실시간 공유, AI 분석이 한 앱에.',
  openGraph: {
    title: 'weeple — 둘이 쓰는 돈, 한눈에',
    description: '커플 가계부 + AI 분석. 자연어 빠른 입력으로 3초 만에 기록.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${geistMono.variable} h-full light`}>
      <body className="min-h-full flex flex-col text-fg">
        <ScrollProgress />
        {children}
      </body>
    </html>
  )
}
