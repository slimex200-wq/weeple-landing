# Weeple Landing

Public marketing landing site for Weeple.

This repository is the product-facing landing surface, not a default Next.js starter. Copy, visuals, and feature claims should reflect the actual Weeple app and documented product decisions.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Motion
- Lenis

## AI Harness

Before asking Claude, Codex, or another coding agent to work here, read:

- `AGENTS.md` — repository rules for AI agents
- `PROJECT_STATE.md` — current status and next work
- `CHECKS.md` — build and visual verification expectations
- `DECISIONS.md` — product and visual decisions

## Commands

```bash
npm install
npm run dev
npm run build
npm run start
```

## Local Development

```bash
npm run dev
```

Open the printed local URL in a browser. After visual or animation changes, inspect desktop and mobile widths; a successful build does not prove visual quality.

## Product Rules

- Do not invent features, metrics, screenshots, or app behavior.
- Verify claims against source, product docs, or explicit user decisions.
- Keep landing copy concrete and product-specific.
- For Next.js behavior, prefer local docs under `node_modules/next/dist/docs/` because this repo uses a newer Next version.

## Verification

```bash
npm run build
```

For layout, animation, 3D, or responsive changes, also run a browser check and record any gap in the handoff.
