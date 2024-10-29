import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  poweredByHeader: false,
  reactStrictMode: true,
  // comment in if local build fails due to "glob error [Error: EPERM: operation not permitted, scandir <path>"
  // deprecated and will be removed in NextJS 15
  //outputFileTracing: false,
}

export default nextConfig
