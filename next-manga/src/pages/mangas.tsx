import { QueryFilterItems } from 'graphql/generated/QueryFilterItems'
import {
  QueryPageMangas,
  QueryPageMangasVariables
} from 'graphql/generated/QueryPageMangas'
import { QUERY_FILTER_ITEMS, QUERY_PAGE_MANGAS } from 'graphql/queries/mangas'
import { GetServerSidePropsContext } from 'next'

import MangasTemplate, { MangasProps } from 'templates/Mangas'
import { initializeApollo } from 'utils/apollo'
import { parseQueryStringToWhere } from 'utils/filter'
import { FilterLists } from '../utils/mappers'

export default function Mangas(props: MangasProps) {
  return (
    <div>
      <MangasTemplate {...props} />
    </div>
  )
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<QueryFilterItems>({
    query: QUERY_FILTER_ITEMS
  })
  const filterItems = await FilterLists(
    data.origins,
    data.statuses,
    data.genres
  )

  await apolloClient.query<QueryPageMangas, QueryPageMangasVariables>({
    query: QUERY_PAGE_MANGAS,
    variables: {
      where: parseQueryStringToWhere({ queryString: query, filterItems }),
      sort: 'title:Asc'
    }
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      filterItems
    }
  }
}
