/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");

const withPwa = require('next-pwa')({
  dest: "public",
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  runtimeCaching,
  buildExcludes: [/manifest.json$/],

})

const nextConfig = withPwa({
  reactStrictMode: true,
  images: {
    domains: ['localhost', '192.168.5.25', 's4.anilist.co']
  },
  typescript: {
    ignoreBuildErrors: true,
  }
})

module.exports = nextConfig