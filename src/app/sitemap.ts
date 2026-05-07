import { execSync } from 'node:child_process'
import type { MetadataRoute } from 'next'
import { GUIDES } from '@/data/guides'

export const dynamic = 'force-static'

const BASE_URL = 'https://weeple.app'

/**
 * 빌드 시점에 해당 경로(들)의 마지막 git commit 시각을 추출.
 * 매 배포마다 모든 URL 의 lastmod 가 동일하게 갱신되면 검색엔진이
 * "이 사이트는 매번 모든 페이지가 변한다"로 오해해 크롤 효율과
 * 신뢰도가 떨어짐. 실제 변경된 페이지만 lastmod 가 움직이도록 함.
 *
 * 빌드 환경에 git 없거나 실패하면 fallback 으로 현재 시각 사용.
 */
function gitLastModified(...paths: string[]): Date {
  try {
    const args = paths.map((p) => `"${p}"`).join(' ')
    const cmd = `git log -1 --format=%cI -- ${args}`
    const out = execSync(cmd, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    if (out) return new Date(out)
  } catch {
    // git 없거나 실행 실패 — fallback 으로 현재 시각
  }
  return new Date()
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      // 메인은 layout/page/components 어느 것이 바뀌어도 변경된 것으로 간주
      lastModified: gitLastModified(
        'src/app/page.tsx',
        'src/app/layout.tsx',
        'src/components',
      ),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: gitLastModified('public/privacy-policy.html'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/terms-of-service`,
      lastModified: gitLastModified('public/terms-of-service.html'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/delete-account`,
      lastModified: gitLastModified('public/delete-account.html'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...GUIDES.map((guide) => ({
      url: `${BASE_URL}/guides/${guide.slug}`,
      lastModified: new Date(guide.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
