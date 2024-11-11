import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // build standalone app for deployment, currently set in Dockerfile
  // reduces docker image size a lot
  output: process.env.BUILD_STANDALONE === '1' ? 'standalone' : undefined,
  poweredByHeader: false,
  reactStrictMode: true,
}

export default nextConfig
