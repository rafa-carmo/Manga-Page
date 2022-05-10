import { gql, QueryHookOptions, useQuery } from '@apollo/client'
import { MangaCardFragment } from 'graphql/fragments/home'
import {
  QueryFavorite,
  QueryFavoriteVariables
} from 'graphql/generated/QueryFavorite'

export const QUERY_FAVORITE = gql`
  query QueryFavorite($identifier: String!) {
    favorites(where: { user: { email: $identifier } }) {
      id
      mangases {
        ...MangaCardFragment
      }
    }
  }
  ${MangaCardFragment}
`

export const QUERY_USER_FAVORITE = gql`
  query QueryUserFavorites {
    favoriteForUser {
      ...MangaCardFragment
    }
  }
  ${MangaCardFragment}
`

export function useQueryFavorite(
  options?: QueryHookOptions<QueryFavorite, QueryFavoriteVariables>
) {
  return useQuery<QueryFavorite, QueryFavoriteVariables>(
    QUERY_FAVORITE,
    options
  )
}
