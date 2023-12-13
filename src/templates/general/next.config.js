/** @type {import('next').NextConfig} */
<§pwa§>// disable service worker in development to prevent warning spam https://github.com/GoogleChrome/workbox/issues/1790.
// enable again to test service worker locally
const withPWA = require('next-pwa')({dest: 'public', disable: process.env.NODE_ENV === 'development'})</§pwa§>

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // comment in if local build fails due to "glob error [Error: EPERM: operation not permitted, scandir <path>"
  // deprecated and will be removed in NextJS 15
  //outputFileTracing: false,
}

module.exports = <§pwa§>withPWA(</§pwa§>nextConfig<§pwa§>)</§pwa§>