import type { NextConfig } from 'next'
import path from 'node:path'

const nextConfig: NextConfig = {
  // Pin Turbopack's workspace root to this project so it doesn't inherit
  // the outer claude-budget-app/ lockfile.
  turbopack: {
    root: path.resolve(__dirname),
  },
}

export default nextConfig
