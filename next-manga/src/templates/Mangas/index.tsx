import { Container } from 'components/Container'
import GridManga from 'components/GridManga'
import ScrollToTop from 'components/ScrollToTop'
import SearchBar from 'components/SearchBar'
import NewsBanner from 'components/NewsBanner'
import { Divider } from 'components/Divider'
import Base from 'templates/Base'
import { useQuery } from '@apollo/client'

// import * as S from './styles'

import { QUERY_PAGE_MANGAS } from 'graphql/queries/mangas'
import {
  FilterLists,
  MangaCardMapper,
  MangaCardSliderMapper
} from 'utils/mappers'
import {
  QueryPageMangas,
  QueryPageMangasVariables
} from 'graphql/generated/QueryPageMangas'
import { useRouter } from 'next/router'
import { ItemProps } from '../../components/SearchBar/index'
import { parseQueryStringToFilter, parseQueryStringToWhere } from 'utils/filter'
import { ParsedUrlQueryInput } from 'querystring'
import Head from 'next/head'
import Loading from 'templates/Loading'

// import Spinner from 'components/Spinner'
// import { ArrowDown } from '@styled-icons/bootstrap'

export type MangasProps = {
  filterItems: ItemProps[]
}

const Mangas = ({ filterItems }: MangasProps) => {
  const { push, query } = useRouter()

  const { data } = useQuery<QueryPageMangas, QueryPageMangasVariables>(
    QUERY_PAGE_MANGAS,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
        where: parseQueryStringToWhere({ queryString: query, filterItems }),
        sort: 'title:Asc'
      },
      fetchPolicy: 'no-cache'
    }
  )

  const handleFilter = (items: ParsedUrlQueryInput) => {
    push({
      pathname: '/mangas',
      query: items
    })
    return
  }

  // const onBottomShowMore = () => {
  //   fetchMore({
  //     variables: {
  //       start: data?.mangas.length,
  //       limit: 20,
  //       where: parseQueryStringToWhere({ queryString: query, filterItems }),
  //       sort: 'title:Asc'
  //     }
  //   })
  // }
  if (!data) return <Loading />
  // if active has more change graphql query and uncomment mangasesConnection query.
  // const hasMore =
  //   data.mangas.length < (data.mangasesConnection?.values?.length || 0)
  // const hasMore = false
  return (
    <Base>
      <Head>
        <title>Todos os Mangas</title>

        <meta name="description" content="Todos os mangas" />
        <meta name="keywords" content="manga, manga online" />
      </Head>
      {Object.keys(query).length <= 0 && (
        <>
          <Container>
            <NewsBanner
              heading="Ultimos Adicionados"
              items={MangaCardSliderMapper(data!.lastMangas)}
            />
          </Container>
        </>
      )}
      <Divider />
      <Container>
        <SearchBar
          initialValues={parseQueryStringToFilter({
            queryString: query,
            filterItems
          })}
          items={FilterLists(data!.origins, data!.statuses, data!.genres)}
          onFilter={handleFilter}
        />
        <GridManga items={MangaCardMapper(data!.mangas)} />
        {/* {!!hasMore && (
          <S.ShowMore>
            {loading ? (
              <Spinner />
            ) : (
              <S.ShowMoreButton role="button" onClick={onBottomShowMore}>
                <p>Carregar Mais</p>
                <ArrowDown size={35} />
              </S.ShowMoreButton>
            )}
          </S.ShowMore>
        )} */}
      </Container>
      <ScrollToTop />
    </Base>
  )
}

export default Mangas
