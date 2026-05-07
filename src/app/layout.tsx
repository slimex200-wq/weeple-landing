import type { Metadata } from 'next'
import { Geist_Mono } from 'next/font/google'
import './globals.css'
import ScrollProgress from '@/components/ScrollProgress'

// Geist Mono 만 Google Fonts 로 로드. Pretendard 는 globals.css 의 @import 로.
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const SITE_URL = 'https://weeple.app'
const SITE_NAME = 'weeple'
const TITLE = 'weeple — 커플·신혼·부부 가계부 | 둘이 쓰는 돈, 한눈에'
const DESCRIPTION =
  'weeple은 커플·신혼·부부를 위한 공동 가계부 앱. 자연어 빠른 입력, 영수증 OCR, 실시간 공유, AI 분석을 한 앱에서. 3초 만에 기록하고 둘이 쓰는 돈을 한눈에 보세요.'
const OG_IMAGE = `${SITE_URL}/og.png`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    '커플 가계부',
    '신혼 가계부',
    '부부 가계부',
    '공동 가계부',
    '공유 가계부',
    'AI 가계부',
    '영수증 OCR',
    '자동 가계부',
    '예산 관리 앱',
    'weeple',
    '윕플',
    '위플',
  ],
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
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: TITLE,
    description:
      '커플·신혼·부부 공동 가계부 + AI 분석. 자연어 빠른 입력으로 3초 만에 기록.',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'weeple — 둘이 쓰는 돈, 한눈에',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description:
      '커플·신혼·부부 공동 가계부 + AI 분석. 3초 만에 기록.',
    images: [OG_IMAGE],
  },
  appLinks: {
    android: {
      package: 'com.hypeboyo.weeple',
      app_name: 'weeple',
    },
  },
  category: 'finance',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  name: 'weeple',
  alternateName: ['윕플', '위플'],
  description: DESCRIPTION,
  url: SITE_URL,
  image: OG_IMAGE,
  inLanguage: 'ko-KR',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'ANDROID',
  installUrl:
    'https://play.google.com/store/apps/details?id=com.hypeboyo.weeple',
  downloadUrl:
    'https://play.google.com/store/apps/details?id=com.hypeboyo.weeple',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'KRW',
  },
  publisher: {
    '@type': 'Organization',
    name: '윕플',
    url: SITE_URL,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${geistMono.variable} h-full dark`}>
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollProgress />
        {children}
      </body>
    </html>
  )
}
