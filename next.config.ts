import type { NextConfig } from 'next'
import path from 'node:path'

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

export default nextConfig
