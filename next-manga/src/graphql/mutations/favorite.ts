import { gql } from '@apollo/client'

export const MUTATION_CREATE_FAVORITE = gql`
  mutation MutatioCreateFavorite($input: createFavoriteInput!) {
    createFavorite(input: $input) {
      favorite {
        mangases {
          id
        }
      }
    }
  }
`

export const MUTATION_UPDATE_FAVORITE = gql`
  mutation MutationUpdateFavorite($input: updateFavoriteInput!) {
    updateFavorite(input: $input) {
      favorite {
        mangases {
          id
        }
      }
    }
  }
`
