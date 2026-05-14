import type { NextConfig } from 'next'
import { withSentryConfig } from '@sentry/nextjs'
import path from 'node:path'

const sentryBuildEnabled = Boolean(process.env.SENTRY_AUTH_TOKEN && process.env.SENTRY_ORG && process.env.SENTRY_PROJECT)

const nextConfig: NextConfig = {
  // Pin Turbopack's workspace root to this project so it doesn't inherit
  // the outer claude-budget-app/ lockfile.
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Static export — build to ./out, served by Cloudflare Workers Static Assets.
  // No server routes/actions in this marketing page, so pure export is fine.
  output: 'export',
  trailingSlash: false,
  images: {
    // next/image with static export requires unoptimized.
    // Cloudflare Image Resizing can layer on later if we need optimization.
    unoptimized: true,
  },
}

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  sourcemaps: {
    disable: !sentryBuildEnabled,
  },
  release: {
    name: process.env.SENTRY_RELEASE,
    create: sentryBuildEnabled,
  },
})
