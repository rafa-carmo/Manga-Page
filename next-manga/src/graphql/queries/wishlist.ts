import { gql, QueryHookOptions, useQuery } from '@apollo/client'
import { MangaCardFragment } from 'graphql/fragments/home'
import { QueryWishlist } from 'graphql/generated/QueryWishlist'
import { QueryWishlistVariables } from '../generated/QueryWishlist'

export const QUERY_WISHLIST = gql`
  query QueryWishlist($identifier: String!) {
    wishlists(where: { user: { email: $identifier } }) {
      id
      user {
        username
      }
      mangases {
        ...MangaCardFragment
      }
    }
  }
  ${MangaCardFragment}
`

export const QUERY_USER_WISHLIST = gql`
  query QueryUserWishlist {
    wishlistForUser {
      ...MangaCardFragment
    }
  }
  ${MangaCardFragment}
`

export function useQueryWishlist(
  options?: QueryHookOptions<QueryWishlist, QueryWishlistVariables>
) {
  return useQuery<QueryWishlist, QueryWishlistVariables>(
    QUERY_WISHLIST,
    options
  )
}
