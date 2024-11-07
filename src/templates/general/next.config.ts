import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  output: process.env.BUILD_STANDALONE === '1' ? 'standalone' : undefined,
  poweredByHeader: false,
  reactStrictMode: true,
}

export default nextConfig
