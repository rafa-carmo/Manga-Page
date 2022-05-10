import { InMemoryCache } from '@apollo/client'
import { concatPagination } from '@apollo/client/utilities'

export default new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        chapters: concatPagination(['where', 'sort']),
        mangases: concatPagination(['where', 'sort']),
        mangas: concatPagination(['where', 'sort'])
      }
    }
  }
})
