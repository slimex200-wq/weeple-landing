# Project State

## Purpose

Weeple marketing landing site. Treat this as the public product surface for the budget app, not a generic Next.js demo.

## Current Status

- Canonical GitHub default branch is `main`.
- The abandoned `redesign/pixel` branch was not merged because the redesign direction was cancelled.
- Local WIP from before the harness sync is preserved in `stash@{0}: wip-before-harness-github-sync-2026-04-30`.
- The landing should reflect real Weeple features only. Check the app/source/docs before writing claims.

## Next Work Queue

- Keep copy and visuals aligned with actual app capabilities.
- Verify landing changes in browser after any layout, animation, or 3D work.
- Continue SEO Phase 2 work tracked in GitHub issue #12.

## Known Blockers

- Some SEO/ASO tasks depend on Play Console assets and app-store copy decisions.

## Last Verified

- 2026-04-30: `npm run build` passed on the previous harness pass after clearing stale `.next` cache.
- Known gap: browser visual inspection was not run in this harness-only pass.

## Related Vault Notes

- `C:/Users/slime/claude-projects/Obsidian Vault/Projects/weeple-landing/`

## Handoff Rule

When a session changes behavior, layout, copy, dependencies, or deployment config, update this file with the new status and the next concrete action.
