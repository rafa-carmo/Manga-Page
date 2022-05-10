'use strict';
const { sanitizeEntity } = require('strapi-utils');
const { getRedis, setRedis } = require('../../../config/redisConfig');
const Parser = require('rss-parser');
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx){
    const parsedUrlList = ctx.req.url.split('?')[1].split('&')
    let searchQueries = {}
    await Promise.all(parsedUrlList.map(async (item)=> await(searchQueries[item.split('=')[0]] = item.split('=')[1])))

    let parameters = {}
    let query = {}
    await Promise.all(parsedUrlList.filter((item)=> item.includes('_')).map(async (item)=> await(parameters[item.split('=')[0].replace("%3A", ":")] = item.split('=')[1].replace("%3A", ":"))))
    await Promise.all(parsedUrlList.filter((item)=> !item.includes('_')).map(async (item)=> await(query[item.split('=')[0].replace("%3A", ":")] = item.split('=')[1].replace("%3A", ":"))))

    if(parameters._limit === '10000'){
      delete parameters._limit
    }

    if(query['mangas.id']){
      const redis = await getRedis(`chapters-manga-id-${query['mangas.id']}`)
      console.log(query,parameters)

        if(redis){
          const entity = sanitizeEntity(JSON.parse(redis), {model: strapi.models.reader})
          return entity
        }
        const entity = await strapi.services.chapter.find({ "_limit": 2000, ...query, ...parameters})
        await setRedis(`chapters-manga-id-${query['mangas.id']}`, JSON.stringify(entity))
        return sanitizeEntity(entity, {model: strapi.models.reader})

    }

    const entity = await strapi.services.chapter.find({ ...query, ...parameters})
    // console.log(entity)
    return sanitizeEntity(entity, {model: strapi.models.reader})
  },
  async createApi(ctx) {
    const data = await strapi.services.chapter.createChapeterApi(ctx.request.body)
    ctx.send(data)
  },

  async updateChapters(ctx){
    const data = await strapi.services.chapter.updateChaptersApi(ctx.request.body)
    ctx.send(data)
  }
};
