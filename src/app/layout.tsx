import type { Metadata } from 'next'
import { Geist_Mono } from 'next/font/google'
import './globals.css'
import ScrollProgress from '@/components/ScrollProgress'

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const siteUrl = 'https://weeple.app'
const siteTitle = 'weeple - 둘이 쓰는 돈, 한눈에'
const siteDescription =
  '커플·부부·동거 커플을 위한 공동 가계부. 생활비 관리부터 데이트 비용 정산까지. 자연어 빠른 입력, 영수증 OCR, Android 결제 알림 확인 후 저장, AI 월간 분석을 한 앱에. iOS 는 준비 중.'
const shareDescription =
  '커플·부부 공동 가계부 + AI 분석. 자연어 한 줄로 3초 기록, 생활비·데이트 비용 정산까지. Android 우선 출시.'
const ogImageUrl = `${siteUrl}/og-image.png`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: shareDescription,
    type: 'website',
    url: siteUrl,
    siteName: 'weeple',
    locale: 'ko_KR',
    images: [
      {
        url: ogImageUrl,
        secureUrl: ogImageUrl,
        type: 'image/png',
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: shareDescription,
    images: [ogImageUrl],
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  keywords: [
    '커플 가계부',
    '부부 가계부',
    '공동 가계부',
    '가계부 앱',
    '공동 예산',
    '커플 머니',
    '생활비 관리',
    '데이트 비용 정산',
    '동거 커플 가계부',
    '자연어 가계부',
    'AI 가계부',
    '영수증 OCR',
    'Android 가계부',
    'weeple',
    '위플',
  ],
  verification: {
    google: 'GuyuHoNqZlVgRG8pw0wAxnNP8y3oEsYB9iFREzEwLKU',
    other: {
      'naver-site-verification': 'ac7d3bb349b7066e744c77a53ec60ebd02965885',
    },
  },
  category: 'finance',
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
