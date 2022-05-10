import { gql } from '@apollo/client'

export const MUTATION_CREATE_READER = gql`
  mutation MutationCreateReader($input: createReaderInput!) {
    createReader(input: $input) {
      reader {
        readers
      }
    }
  }
`
export const MUTATION_UPDATE_READER = gql`
  mutation MutationUpdateReader($input: updateReaderInput!) {
    updateReader(input: $input) {
      reader {
        readers
      }
    }
  }
`
