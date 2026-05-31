import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // 3D 프로모 페이지(본 페이지와 콘텐츠 중복)의 SEO cannibalization 은
      // 페이지 자체의 <meta name="robots" content="noindex"> 로 차단한다.
      // robots.txt 의 disallow 로 막으면 크롤러가 페이지를 못 읽어 noindex 메타도
      // 인식하지 못하고 오히려 "차단됐지만 색인됨" 상태가 되므로 disallow 하지 않는다.
    },
    sitemap: 'https://weeple.app/sitemap.xml',
    host: 'https://weeple.app',
  }
}
