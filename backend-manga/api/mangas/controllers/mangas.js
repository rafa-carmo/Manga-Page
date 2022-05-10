'use strict';


/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

  async createApi(ctx){

    const data = await strapi.services.mangas.createApi(ctx.request.body)
    ctx.send(data)
  },

  async updateData(ctx){
    console.log(ctx.params)
    const {id} = ctx.params
    const data = await strapi.services.mangas.updateData(id)
    ctx.send(data)
  },
  async banner(ctx) {
    await strapi.services.mangas.banner()
    ctx.send("updated")
  },
  async rank(ctx) {
    await strapi.services.mangas.rank()
    ctx.send("ended")
  }
};
