import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js'

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => ({
  // Next 14's dev server misidentifies generated archive routes in export mode.
  // Production builds remain fully static; development uses normal route rendering.
  output: phase === PHASE_DEVELOPMENT_SERVER ? undefined : 'export',
  images: { unoptimized: true },
})

export default nextConfig
