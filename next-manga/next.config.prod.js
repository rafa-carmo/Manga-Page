// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')
const path = require('path')

const isProd = process.env.NODE_ENV === 'production'

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: !isProd
  },
  images: {
    domains: ['localhost', '192.168.5.25', 's4.anilist.co']
  },

  output: 'standalone',
  staticPageGenerationTimeout: 150,
  experimental: {
    outputStandalone: true
  },
  typescript: {
    ignoreBuildErrors: true,
  },
})
