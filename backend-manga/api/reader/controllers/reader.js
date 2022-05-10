'use strict';
const { sanitizeEntity } = require('strapi-utils');
const { getRedis, setRedis } = require('../../../config/redisConfig');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

 module.exports = {
  async find(ctx){
    const token = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx)
    const entity = await strapi.services.reader.find({'user.id': token.id})
    return sanitizeEntity(entity, {model: strapi.models.reader})

   },
  async create(ctx) {
    const token = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx)
    const body = {
      ...ctx.request.body,
      user: token.id
    }
    const entity = await strapi.services.reader.create(body)
    const sanitized = sanitizeEntity(entity, {model: strapi.models.reader})
    return sanitized
  },
  async update(ctx) {
    // const token = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx)

    try {
      const entity = await strapi.services.reader.update({id: ctx.params.id}, ctx.request.body)
      const sanitized = sanitizeEntity(entity, {model: strapi.models.reader})
      return sanitized
    } catch (error) {
      throw strapi.errors.unauthorized(error)
    }
  }
};
