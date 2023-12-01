/** @type {import('next').NextConfig} */
// disable service worker in development to prevent warning spam https://github.com/GoogleChrome/workbox/issues/1790.
// enable again to test service worker locally
// const withPWA = require('next-pwa')({ dest: 'public', disable: process.env.NODE_ENV === 'development' })

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
}

//module.exports = withPWA(nextConfig)
module.exports = nextConfig
