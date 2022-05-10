module.exports = ({ env }) => ({
  settings: {
    cache: {
      enabled: true,
      type: 'redis',
      maxAge: 2600000,
      max: 400,
      cacheTimeout: 400,
      logs: true,
      models: ['banners', 'rank','mangas'],
      redisConfig: {
        host: 'localhost',
        port: 6379
      },
    }
  }
});
