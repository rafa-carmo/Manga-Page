module.exports = {
  definition: ``,
  query: `
    wishlistForUser: [Mangas]!
  `,
  type: {},
  resolver: {
    Query: {
      wishlistForUser: {
        description: "Get all mangas for wishlist user",
        resolverOf: 'application::wislhist.wishlist.find',
        resolver: async(obj, options, {context}) => {
          const token = await strapi.plugins['users-permissions'].services.jwt.getToken(context)
          const data = await strapi.services.wishlist.findOne({'user.id': token.id})
          return data ? data.mangases : `There are no products on this category.`;
        }
      }
    },
    Mutation: {},
  },
};
