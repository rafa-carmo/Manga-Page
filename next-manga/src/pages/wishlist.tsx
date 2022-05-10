import { QUERY_USER_WISHLIST } from 'graphql/queries/wishlist'
import List from 'templates/List'
import { initializeApollo } from 'utils/apollo'
import protectedRoutes from 'utils/protected-routes'
import { QueryUserWishlist } from '../graphql/generated/QueryUserWishlist'
import { GetServerSidePropsContext } from 'next'
import { QueryPageMangas_mangas } from '../graphql/generated/QueryPageMangas'

type WishlistProps = {
  wishList: QueryPageMangas_mangas[]
}

function Wishlist({ wishList }: WishlistProps) {
  return <List title="Mangas para ler" list={wishList} />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<QueryUserWishlist>({
    context: { session },
    query: QUERY_USER_WISHLIST,
    fetchPolicy: 'no-cache'
  })
  return {
    props: {
      wishList: data ? data.wishlistForUser : []
    }
  }
}

export default Wishlist
