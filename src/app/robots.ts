import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // iframe 안 임베드되는 3D 프로모 페이지는 본 페이지와 콘텐츠 중복.
      // SEO cannibalization 방지를 위해 직접 인덱싱 차단.
      disallow: ['/weeple-3d-promo.html'],
    },
    sitemap: 'https://weeple.app/sitemap.xml',
    host: 'https://weeple.app',
  }
}
