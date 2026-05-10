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

## Next Work Queue

- Keep copy and visuals aligned with actual app capabilities.
- Verify landing changes in browser after any layout, animation, or 3D work.
- Continue SEO Phase 2 work tracked in GitHub issue #12.
- After the Play Store listing is public, add the public store URL to Organization/SoftwareApplication structured data and use it in launch CTAs where appropriate.
- Continue the visual cleanup below the new founder section: pricing, FAQ, and final CTA still carry more of the older rounded/glassy SaaS treatment.

## Known Blockers

- Some SEO/ASO tasks depend on Play Console assets and app-store copy decisions.

## Last Verified

- 2026-04-30: `npm run build` passed on the previous harness pass after clearing stale `.next` cache.
- 2026-05-03: Live `https://weeple.app/og-image.png` returned 200 PNG, 1200x630, ~337 KB before the metadata copy fix.
- 2026-05-03: Local static export includes `/guides/couple-budget-app`, `/guides/shared-budget`, and `/guides/natural-language-budget`.
- 2026-05-03: Play Store package URL still returns 404 externally while the app is not public, so it was not added to Organization `sameAs`.
- 2026-05-09: Local generated share image verified at 1200x630 before build.
- Known gap: browser visual inspection was not run in this harness-only pass.

## Related Vault Notes

- `C:/Users/slime/claude-projects/Obsidian Vault/Projects/weeple-landing/`

## Handoff Rule

When a session changes behavior, layout, copy, dependencies, or deployment config, update this file with the new status and the next concrete action.
