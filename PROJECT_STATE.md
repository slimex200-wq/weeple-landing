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

## Next Work Queue

- Keep copy and visuals aligned with actual app capabilities.
- Verify landing changes in browser after any layout, animation, or 3D work.
- Continue SEO Phase 2 work tracked in GitHub issue #12.

## Known Blockers

- Some SEO/ASO tasks depend on Play Console assets and app-store copy decisions.

## Last Verified

- 2026-04-30: `npm run build` passed on the previous harness pass after clearing stale `.next` cache.
- 2026-05-03: Live `https://weeple.app/og-image.png` returned 200 PNG, 1200x630, ~337 KB before the metadata copy fix.
- 2026-05-03: Local static export includes `/guides/couple-budget-app`, `/guides/shared-budget`, and `/guides/natural-language-budget`.
- Known gap: browser visual inspection was not run in this harness-only pass.

## Related Vault Notes

- `C:/Users/slime/claude-projects/Obsidian Vault/Projects/weeple-landing/`

## Handoff Rule

When a session changes behavior, layout, copy, dependencies, or deployment config, update this file with the new status and the next concrete action.
