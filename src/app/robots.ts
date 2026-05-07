import type { MetadataRoute } from 'next'

// Static export 호환: 빌드 시 정적 robots.txt 로 출력
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // iframe 안에 임베드되는 3D 프로모 페이지는 본 페이지와 콘텐츠 중복.
      // SEO cannibalization 방지를 위해 직접 인덱싱 차단.
      disallow: ['/weeple-3d-promo.html'],
    },
    sitemap: 'https://weeple.app/sitemap.xml',
    host: 'https://weeple.app',
  }
}
