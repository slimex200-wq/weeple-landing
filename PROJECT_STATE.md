# Project State

## Purpose

Weeple marketing landing site. Treat this as the public product surface for the budget app, not a generic Next.js demo.

## Current Status

- Canonical GitHub default branch is `main`.
- The abandoned `redesign/pixel` branch was not merged because the redesign direction was cancelled.
- Local WIP from before the harness sync is preserved in `stash@{0}: wip-before-harness-github-sync-2026-04-30`.
- The landing should reflect real Weeple features only. Check the app/source/docs before writing claims.
- 2026-05-03: Open Graph/Twitter metadata copy was centralized and the share image URL was made absolute with PNG type hints for preview crawler compatibility.
- 2026-05-03: Added three indexable guide pages for long-tail search intent: couple budget app, shared budget, and natural-language budget input.
- 2026-05-03: Landing pricing/JSON-LD offers were aligned to the current Android IAP set: Premium monthly/yearly plus 10/30/100 credit packs.
- 2026-05-03: Added `docs/seo-research-2026-05-03.md` with category-search research and the next SEO page queue.
- 2026-05-09: Share thumbnail switched from generated text-only OG art to the provided product-phone banner. `public/opengraph-image.png` is the current canonical share image, and `public/og-image.png` was updated for stale crawler compatibility.
- 2026-05-09: Strengthened category-search copy for `커플 가계부 앱`, `커플 가계부 앱 추천`, and `공유 가계부 앱 비교`; added guide FAQ JSON-LD and a Naver IndexNow notification script/key for post-deploy crawl refresh.
- 2026-05-09: Added `public/opengraph-image-20260509.png` and pointed `og:image` to that dated URL to bypass KakaoTalk's separately cached image preview.
- 2026-05-10: Started a less generic landing redesign pass: replaced the glassy scroll hero with an editorial product-image hero, moved the founder/about story directly after the problem section, and reframed the story around a non-developer solo founder without adding ungrounded product claims.
- 2026-05-10: Clipped the hero background image to the desktop product area and removed it from mobile so the embedded OG banner text cannot sit behind the landing headline.
- 2026-05-10: Added Korean line-break rules for the landing and grouped the hero headline so short Korean words do not fall alone onto a new line.
- 2026-05-10: Replaced the share/hero banner with a phone-only product image and pointed OG metadata, JSON-LD, guide metadata, and the hero background at `public/opengraph-image-20260510.png`; `public/opengraph-image.png` and `public/og-image.png` were kept in sync for stale crawler compatibility.
- 2026-05-10: Restored the text-and-phone banner as the canonical share thumbnail via `public/opengraph-image-20260510-text-banner.png`; stale crawler fallback files `public/opengraph-image.png` and `public/og-image.png` were copied back to the same text banner, while the phone-only image remains available for hero/product visuals.
- 2026-05-10: Increased desktop hero product-phone visibility by widening the background image layer, raising image opacity, and reducing the white overlay on the right side while preserving the mobile text-only hero.
- 2026-05-10: Moved the product-proof mockup sections into the production landing below the existing hero, using public `/product-proof/*` app-screen images and replacing the older 3D/demo/trust/voices middle sections while keeping pricing, FAQ, and final CTA.
- 2026-05-10: Converted the product-proof middle section into a scroll-driven product story: text steps now drive a sticky desktop product visual, mobile stacks the same steps with images inline, and Korean headline/callout wrapping preserves whole words.
- 2026-05-10: Reworked the scroll-driven product story after review: desktop sticky panels now include explicit feature names, one-line explanations, three feature details, non-cropped `object-contain` product images, and secondary preview cards where available; mobile shows the feature details before images.
- 2026-05-10: Replaced the feature-explainer product story with an image-first scroll sequence: each chapter now shows the category and product image first, fades the image away, then leaves a short explanation before the next chapter repeats the pattern.
- 2026-05-10: Added a lightweight JPEG share image at `public/opengraph-image-20260510-kakao-mobile.jpg` and pointed OG/Twitter/JSON-LD image metadata to it so KakaoTalk mobile gets a fresh, smaller preview asset instead of the ~987 KB PNG.
- 2026-05-10: Reframed the hero, problem, product sequence, and founder story around newlywed couples trying to manage shared money well; the product sequence now follows state check -> shared/personal split -> budget rules -> report/AI.
- 2026-05-10: Tightened Korean line-break handling in the newlywed story sections and reduced the mobile sticky CTA size so it does not visually dominate content screenshots.
- 2026-05-10: Polished the lower landing sections so Pricing, FAQ, and FinalCTA match the newer editorial product-story direction; removed the older glassy/rounded SaaS treatment and replaced the gradient final CTA with a dark product-backed close.
- 2026-05-10: Elevated Android notification-based candidate transaction recording into the hero and product flow, broadened primary positioning from newlyweds to couples/couples-married/shared households, corrected the annual discount to 25%, and aligned Premium benefits around OCR, AI, premium categories, and ad-free use.
- 2026-05-10: Restored the softer pre-editorial Pricing card treatment while keeping corrected 25% yearly discount and Premium benefit policy; tightened review findings around hero CTA priority, product-screen anchor behavior, Android notification visual proof, Korean line breaks, and mobile sticky CTA overlap.
- 2026-05-13: Android launch CTA wiring moved from public-test/mail/internal anchors to the public Google Play listing `https://play.google.com/store/apps/details?id=com.weeple.app&hl=ko&gl=KR`; the URL is centralized in `src/lib/links.ts` and added to Organization/SoftwareApplication structured data.
- 2026-05-13: Legal pages were updated for release compliance: `privacy-policy.html` now reflects Supabase Australia/Sydney cross-border processing and Android notification-based recording limits; `terms-of-service.html` now names the current IAP products/prices, store refund flow, and pending Korean mail-order sales notice field.
- 2026-05-13: Legal-page follow-up fixed compressed privacy-policy tables with horizontal scroll containers and added Weeple business registration details to the footer, terms, and privacy pages using the mp3 Suno repo's latest legal/footer pattern as reference.
- 2026-05-14: Landing copy now explicitly explains the solo-first path: users can start as a personal budget app and later invite a partner for couple/shared budget management; added a visible solo-to-couple section, moved the solo-use FAQ to the top, updated SEO metadata/JSON-LD, and added `docs/play-store-aso-2026-05-14.md` with Play Console title/short-description guidance.

- 2026-05-14: Added first-party admin traffic tracking for `weeple.app` via the `claude-budget` Supabase `track-event` Edge Function so admin.weeple.app can show app traffic, country/device/page breakdowns, and app-level traffic.
- 2026-05-15: Landing CTA analytics now also writes first-party product events into the admin console event taxonomy, and Sentry Next.js client monitoring/source-map upload is wired behind `NEXT_PUBLIC_SENTRY_*` and `SENTRY_*` env vars.
- 2026-05-15: Hero/final CTA image masks were tightened so the phone banner does not sit behind text/cards on smaller desktop widths, and the product-story scroll chapters were lengthened so explanation copy stays on screen longer.

## Next Work Queue

- Keep copy and visuals aligned with actual app capabilities.
- Verify landing changes in browser after any layout, animation, or 3D work.
- Continue SEO Phase 2 work tracked in GitHub issue #12.
- Apply Play Console ASO copy updates manually because store listing metadata is not managed by this repo; follow-up tracked in GitHub issue #51.

## Known Blockers

- Some SEO/ASO tasks depend on Play Console assets and app-store copy decisions.

## Last Verified

- 2026-04-30: `npm run build` passed on the previous harness pass after clearing stale `.next` cache.
- 2026-05-03: Live `https://weeple.app/og-image.png` returned 200 PNG, 1200x630, ~337 KB before the metadata copy fix.
- 2026-05-03: Local static export includes `/guides/couple-budget-app`, `/guides/shared-budget`, and `/guides/natural-language-budget`.
- 2026-05-03: Play Store package URL still returns 404 externally while the app is not public, so it was not added to Organization `sameAs`.
- 2026-05-09: Local generated share image verified at 1200x630 before build.
- 2026-05-10: Hero background crop checked with desktop and mobile screenshots; `npm.cmd run build` and `npx.cmd tsc --noEmit` passed. Browser plugin backend was unavailable, so Playwright screenshot evidence was used instead.
- 2026-05-10: Korean line-break pass checked locally at mobile, tablet, and desktop widths with Playwright screenshots.
- 2026-05-10: Sticky product-story pass verified with `npm.cmd run build`, `npx.cmd tsc --noEmit`, and Playwright screenshots for `#live-demo`, `#couple`, `#insights`, `#budget`, and mobile `#couple` on the local dev server.
- 2026-05-10: Feature-explainer product-story pass verified with `npm.cmd run build`, `npx.cmd tsc --noEmit`, and Playwright screenshots for `#couple`, `#insights`, `#budget`, and mobile `#couple`.
- 2026-05-10: Image-first scroll-sequence pass verified with `npm.cmd run build`, `npx.cmd tsc --noEmit`, and Playwright desktop/mobile screenshots for `#couple` and `#insights` image/text phases.
- 2026-05-10: Lightweight Kakao mobile share image verified locally at 1200x630 and ~75 KB before metadata update.
- 2026-05-10: Newlywed story polish verified with `npm.cmd run build`, `npx.cmd tsc --noEmit`, and Playwright screenshots for hero, problem, product sequence intro, budget, and founder sections on desktop and mobile. Visual verdict saved under `.omx/state/newlywed-story-polish/ralph-progress.json`.
- 2026-05-10: Lower landing polish verified with `npx.cmd tsc --noEmit`, `npm.cmd run build`, and Playwright screenshots for `#pricing`, `#faq`, and `#final-cta` on desktop and mobile. Visual verdict saved under `.omx/state/lower-landing-polish/ralph-progress.json`.
- 2026-05-10: Notification/positioning/pricing fix verified with `npx.cmd tsc --noEmit`, `npm.cmd run build`, stale-copy `rg` checks for old-discount/partner-sharing/newlywed-main strings, and Playwright screenshots for hero, notification recording, pricing, and FAQ on desktop/mobile. Visual verdict saved under `.omx/state/notification-positioning-pricing-fix/ralph-progress.json`.
- 2026-05-10: Review-fix pass verified with `npx.cmd tsc --noEmit`, `npm.cmd run build`, stale-copy `rg` checks, and Playwright screenshots for hero, product screen anchor, notification proof, pricing, FAQ, and final CTA on desktop/mobile. Visual verdict saved under `.omx/state/review-fixes-pricing-restore/ralph-progress.json`.
- 2026-05-13: Google Play launch CTA pass verified with direct Play Store HTTP 200, `npx.cmd tsc --noEmit`, `npm.cmd run build`, Playwright screenshots, anchor href inspection, and JSON-LD inspection. Visual verdict saved under `.omx/state/play-store-launch-cta/ralph-progress.json`.
- 2026-05-13: Release legal-page update verified with `npx.cmd tsc --noEmit` and `npm.cmd run build`; no visual/browser pass was required because only static legal copy changed.
- 2026-05-13: Legal table/business-info follow-up verified with `npx.cmd tsc --noEmit`, `npm.cmd run build`, static HTML checks for table wrappers/business info, and Playwright screenshots of privacy/terms/footer on desktop and mobile.
- 2026-05-14: Solo-first/couple-later positioning verified with `npx.cmd tsc --noEmit`, `npm.cmd run build`, local HTTP checks for home and `/guides/personal-to-couple-budget`, Playwright screenshots for desktop/mobile hero, solo-to-couple section, and mobile FAQ. Live Play Store web metadata and search-result presence were checked for `가계부`, `커플 가계부`, and `AI 가계부`.

- 2026-05-14: Admin traffic tracker verified with `npx.cmd tsc --noEmit`, `npm.cmd run build`, production bundle scan for `track-event`, and Supabase smoke insert/delete against `admin_traffic_events`.
- 2026-05-15: Admin product-event and Sentry pass verified with `npx.cmd tsc --noEmit` and Sentry-enabled `npm.cmd run build`; production deployment verification remains tied to the current release pass.
- 2026-05-15: Hero/final CTA gradient and product-story scroll timing pass verified with `npx.cmd tsc --noEmit`, `npm.cmd run build`, and Chrome CDP screenshots at 1045x559 for hero/final CTA/product story.

## Related Vault Notes

- `C:/Users/slime/claude-projects/Obsidian Vault/Projects/weeple-landing/`

## Handoff Rule

When a session changes behavior, layout, copy, dependencies, or deployment config, update this file with the new status and the next concrete action.
