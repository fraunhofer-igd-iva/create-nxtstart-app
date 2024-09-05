/** @type {import('next').NextConfig} */
<§pwa§>import withPWA from 'next-pwa'

// disable service worker in development to prevent warning spam https://github.com/GoogleChrome/workbox/issues/1790.
// enable again to test service worker locally
const withPWAWrapper = withPWA({dest: 'public', disable: process.env.NODE_ENV === 'development'})</§pwa§>

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // comment in if local build fails due to "glob error [Error: EPERM: operation not permitted, scandir <path>"
  // deprecated and will be removed in NextJS 15
  //outputFileTracing: false,
}

export default <§pwa§>withPWAWrapper(</§pwa§>nextConfig<§pwa§>)</§pwa§>
