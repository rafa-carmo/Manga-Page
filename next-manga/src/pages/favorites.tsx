import List from 'templates/List'
import { initializeApollo } from 'utils/apollo'
import protectedRoutes from 'utils/protected-routes'
import { GetServerSidePropsContext } from 'next'
import { QueryPageMangas_mangas } from '../graphql/generated/QueryPageMangas'
import { QUERY_USER_FAVORITE } from 'graphql/queries/favorite'
import { QueryUserFavorites } from '../graphql/generated/QueryUserFavorites'

type WishlistProps = {
  favoriteList: QueryPageMangas_mangas[]
}

function Wishlist({ favoriteList }: WishlistProps) {
  return <List title="Favoritos" list={favoriteList} />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<QueryUserFavorites>({
    context: { session },
    query: QUERY_USER_FAVORITE,
    fetchPolicy: 'no-cache'
  })
  return {
    props: {
      favoriteList: data ? data.favoriteForUser : []
    }
  }
}

export default Wishlist
