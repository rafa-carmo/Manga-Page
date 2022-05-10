'use strict';

const { sanitizeEntity } = require('strapi-utils')

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

  async create(ctx) {
    const token = await strapi.plugins["users-permissions"].services.jwt.getToken(ctx)

    const body = {
      ...ctx.request.body,
      user: token.id
    }

    const entity = await strapi.services.favorites.create(body)
    return sanitizeEntity(entity, {model: strapi.models.favorites})
  },
  async update(ctx) {
    try {
      const entity = await strapi.services.favorites.update(
        {id: ctx.params.id}, ctx.request.body)
        return sanitizeEntity(entity, {model: strapi.models.favorites})
    } catch (error) {
      throw strapi.errors.unauthorized(err)
    }
  }

};
