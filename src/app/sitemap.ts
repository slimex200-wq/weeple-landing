import type { MetadataRoute } from 'next'
import { GUIDES } from '@/data/guides'

export const dynamic = 'force-static'

const BASE_URL = 'https://weeple.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: `${BASE_URL}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/terms-of-service`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/delete-account`,
      lastModified,
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
