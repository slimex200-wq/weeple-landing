# SEO Research - 2026-05-03

## Current Search Reality

- Brand/address search can find `weeple.app`.
- Category searches such as `가계부 앱 추천`, `커플 가계부 앱 추천`, `공동 가계부 앱`, and `자연어 가계부 앱` are dominated by comparison articles, app-store listings, and broad recommendation pages.
- The landing now has basic technical SEO, but category discovery needs focused pages that match search intent.

## What We Added In PR #13

- `guides/couple-budget-app` for `커플 가계부`, `커플 가계부 앱`, `데이트 비용 정산`.
- `guides/shared-budget` for `공동 예산`, `공동 가계부`, `커플 생활비`.
- `guides/natural-language-budget` for `자연어 가계부`, `AI 가계부`, `영수증 OCR`.
- Sitemap entries and footer links for crawler discovery.
- Article JSON-LD on guide pages and Breadcrumb JSON-LD for guide hierarchy.
- Organization `sameAs` for currently reachable channels only. Do not add the Play Store URL until the public listing stops returning 404.

## Next Best SEO Additions

1. Add a comparison-intent page:
   - `/guides/budget-app-recommendation`
   - Target: `가계부 앱 추천`, `무료 가계부 앱`, `AI 가계부 앱`
   - Angle: how to choose by input method, sharing needs, privacy, OCR, and AI analysis.

2. Add a couple-specific comparison page:
   - `/guides/shared-budget-app-comparison`
   - Target: `공유 가계부 앱`, `부부 가계부 앱`, `커플 생활비 앱`
   - Angle: shared categories, private spending boundaries, settlement, recurring budgets.

3. Add trust pages after public launch:
   - `/security` or `/trust`
   - Target: privacy and data safety queries.
   - Include clear data handling, partner visibility, deletion, and AI analysis boundaries.

4. Add Play Store public URL to Organization and SoftwareApplication once public:
   - `sameAs`
   - `downloadUrl`
   - `installUrl`

5. Search Console follow-up after deployment:
   - Submit `https://weeple.app/sitemap.xml`.
   - Request indexing for the three guide pages.
   - Review queries after 1-2 weeks before writing more pages.

## Research Notes

- Google recommends people-first content that gives original value rather than pages made only for rankings.
- Google supports SoftwareApplication structured data for app details and offers.
- Google supports Breadcrumb structured data and uses clear URL/site structure to understand page hierarchy.
- Naver recommends JSON-LD or Microdata structured data and sitemap declaration in `robots.txt`.
- Naver related-channel markup can help, but exposure is not guaranteed and should only point to real reachable channels.

## Sources

- Google Search Central: SEO Starter Guide
  https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Search Central: Creating helpful, reliable, people-first content
  https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google Search Central: SoftwareApplication structured data
  https://developers.google.com/search/docs/appearance/structured-data/software-app
- Google Search Central: Structured data gallery
  https://developers.google.com/search/docs/guides/search-gallery
- Naver Search Advisor: structured data intro
  https://searchadvisor.naver.com/guide/structured-data-intro
- Naver Search Advisor: related channels
  https://searchadvisor.naver.com/guide/structured-data-channel
- Naver Search Advisor: robots.txt and sitemap
  https://searchadvisor.naver.com/guide/seo-basic-robots
