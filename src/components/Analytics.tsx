'use client'

import Script from 'next/script'
import { GA_MEASUREMENT_ID } from '@/lib/analytics'

// gtag.js 를 afterInteractive 로 로드 — hydration 후라 LCP/FCP 영향 없음.
// page_view 는 향상된 측정(Enhanced measurement) 이 자동 처리하므로 별도 호출 X.
// CTA 같은 사용자 행동만 trackEvent helper 로 명시 추적.
export default function Analytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  )
}
