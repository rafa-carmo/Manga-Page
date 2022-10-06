
module.exports = {
  images: {
    domains: ['localhost', '192.168.5.25', 's4.anilist.co']
  },

  output: 'standalone',
  staticPageGenerationTimeout: 150,
  experimental: {
    outputStandalone: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}
