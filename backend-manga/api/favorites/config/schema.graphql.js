module.exports = {
  definition: ``,
  query: `
    favoriteForUser: [Mangas]!
  `,
  type: {},
  resolver: {
    Query: {
      favoriteForUser: {
        description: "Get all mangas favorites from user",
        resolverOf: 'application::favorites.favorites.find',
        resolver: async(obj, options, {context}) => {
          const token = await strapi.plugins['users-permissions'].services.jwt.getToken(context)
          const data = await strapi.services.favorites.findOne({'user.id': token.id})
          console.log("Favorites - ")
          return data ? data.mangases : `There are no products on this category.`;
        }
      }
    },
    Mutation: {},
  },
};
