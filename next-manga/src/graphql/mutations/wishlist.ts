import { gql } from '@apollo/client'
import { MangaCardFragment } from 'graphql/fragments/home'

export const QUERY_CREATE_WISHLIST = gql`
  mutation MutatioCreateWhislist($input: createWishlistInput!) {
    createWishlist(input: $input) {
      wishlist {
        mangases {
          ...MangaCardFragment
        }
      }
    }
  }
  ${MangaCardFragment}
`
export const QUERY_UPDATE_WISHLIST = gql`
  mutation MutatioUpdateWhislist($input: updateWishlistInput!) {
    updateWishlist(input: $input) {
      wishlist {
        mangases {
          ...MangaCardFragment
        }
      }
    }
  }
  ${MangaCardFragment}
`
