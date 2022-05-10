import { gql, QueryHookOptions, useQuery } from '@apollo/client'
import { QueryReaders, QueryReadersVariables } from '../generated/QueryReaders'

export const QUERY_READER = gql`
  query QueryReaders($identifier: String!) {
    readers(where: { user: { email: $identifier } }) {
      id
      user {
        username
      }
      readers
    }
  }
`

export function useQueryReader(
  options?: QueryHookOptions<QueryReaders, QueryReadersVariables>
) {
  return useQuery<QueryReaders, QueryReadersVariables>(QUERY_READER, options)
}
