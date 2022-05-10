import { QueryHome } from 'graphql/generated/QueryHome'
import { QUERY_BANNER } from 'graphql/queries/home'

import HomeTemplate, { HomeProps } from 'templates/Home'
import { initializeApollo } from 'utils/apollo'

import { formatImage } from 'utils/formatImage'
import { MangaCardSliderMapper } from '../utils/mappers'

export default function Home({ ...props }: HomeProps) {
  return (
    <div>
      <HomeTemplate {...props} />
    </div>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query<QueryHome>({
    query: QUERY_BANNER,
    fetchPolicy: 'no-cache'
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      banners: data.banners.map((banner) => ({
        title: banner.mangas?.title,
        slug: banner.mangas?.slug,
        img: banner?.mangas?.banner?.url
          ? formatImage(banner.mangas!.banner!.url)
          : '/images/defaultBanner.jpg',
        sinopse: banner.mangas?.sinopse
      })),
      newsBanners: MangaCardSliderMapper(data.lastMangas),
      ranks: data.ranks.map((rank) => ({
        img: rank.cover,
        title: rank.title,
        genres: rank.genres!.split(','),
        url: rank.url
      }))
    },
    revalidate: 30
  }
}
