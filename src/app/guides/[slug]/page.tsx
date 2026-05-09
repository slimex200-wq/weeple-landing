import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GUIDES, getGuide } from '@/data/guides'

const SITE_URL = 'https://weeple.app'
// 가이드별 동적 OG 는 Next.js 16 + static export 조합에서 generateImageMetadata
// 지원이 불완전해 루트 OG 이미지를 공유. 가이드별 제목이 OG 카드에 들어가는
// 형태가 필요하면 후처리 스크립트로 PNG 별도 생성하는 후속 PR.
// .png 확장자는 카카오톡 등 스크레이퍼 호환을 위해 유지.
// Dated filename bypasses KakaoTalk's separately cached preview image URL.
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image-20260509.png`

function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuide(slug)

  if (!guide) {
    return {}
  }

  const url = `${SITE_URL}/guides/${guide.slug}`

  return {
    title: `${guide.title} | weeple`,
    description: guide.description,
    keywords: guide.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${guide.title} | weeple`,
      description: guide.description,
      type: 'article',
      url,
      siteName: 'weeple',
      locale: 'ko_KR',
      images: [
        {
          url: OG_IMAGE_URL,
          secureUrl: OG_IMAGE_URL,
          type: 'image/png',
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${guide.title} | weeple`,
      description: guide.description,
      images: [OG_IMAGE_URL],
    },
  }
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  const url = `${SITE_URL}/guides/${guide.slug}`
  const relatedGuides = GUIDES.filter((item) => item.slug !== guide.slug)
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    inLanguage: 'ko-KR',
    dateModified: guide.updatedAt,
    datePublished: guide.updatedAt,
    mainEntityOfPage: url,
    image: OG_IMAGE_URL,
    author: {
      '@type': 'Organization',
      name: 'weeple',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'weeple',
      logo: {
        '@type': 'ImageObject',
        url: OG_IMAGE_URL,
      },
    },
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'weeple',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '가이드',
        item: `${SITE_URL}/guides`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: guide.title,
        item: url,
      },
    ],
  }
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <main className="min-h-screen px-6 py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqJsonLd) }}
      />

      <article className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex text-sm font-semibold text-mint transition-colors hover:text-fg"
        >
          weeple 홈으로
        </Link>

        <header className="mt-12 border-b border-divider pb-10">
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-mint">
            Weeple Guide
          </div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-fg sm:text-6xl">
            {guide.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-fg-secondary">
            {guide.intro}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {guide.keywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-mint/30 bg-mint-bg px-3 py-1 text-xs font-semibold text-mint"
              >
                {keyword}
              </span>
            ))}
          </div>
        </header>

        <div className="space-y-12 py-12">
          {guide.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                {section.heading}
              </h2>
              <div className="mt-5 space-y-4 text-base leading-8 text-fg-secondary">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="border-y border-divider py-10">
          <h2 className="text-2xl font-bold tracking-tight text-fg">자주 묻는 질문</h2>
          <div className="mt-6 space-y-6">
            {guide.faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-bold text-fg">{faq.question}</h3>
                <p className="mt-2 leading-7 text-fg-secondary">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-10">
          <h2 className="text-xl font-bold text-fg">관련 가이드</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {relatedGuides.map((item) => (
              <Link
                key={item.slug}
                href={`/guides/${item.slug}`}
                className="rounded-2xl border border-border-app bg-bg-surface p-5 transition-colors hover:border-mint"
              >
                <div className="font-bold text-fg">{item.title}</div>
                <p className="mt-2 text-sm leading-6 text-fg-secondary">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </main>
  )
}
