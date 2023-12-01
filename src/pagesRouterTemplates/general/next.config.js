/** @type {import('next').NextConfig} */
<%i18n%>const { i18n } = require('./next-i18next.config')</%i18n%>
<%pwa%>// disable service worker in development to prevent warning spam https://github.com/GoogleChrome/workbox/issues/1790.
// enable again to test service worker locally
const withPWA = require('next-pwa')({dest: 'public', disable: process.env.NODE_ENV === 'development'})</%pwa%>

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  <%i18n%>i18n: i18n,</%i18n%>
}

module.exports = <%pwa%>withPWA(</%pwa%>nextConfig<%pwa%>)</%pwa%>
