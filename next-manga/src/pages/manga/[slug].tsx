import { GetStaticProps } from 'next'
import { useRouter } from 'next/dist/client/router'
import Manga, { MangaTemplateProps } from 'templates/Manga'
import { QUERY_MANGAS, QUERY_MANGA_BY_SLUG } from '../../graphql/queries/mangas'
import {
  QueryMangas,
  QueryMangasVariables
} from 'graphql/generated/QueryMangas'

import { initializeApollo } from 'utils/apollo'
import { formatImage } from 'utils/formatImage'
import {
  QueryMangaBySlug,
  QueryMangaBySlugVariables
} from 'graphql/generated/QueryMangaBySlug'

const apolloClient = initializeApollo()

export default function Index(props: MangaTemplateProps) {
  const router = useRouter()

  if (router.isFallback) return 'Carregando'

  return <Manga {...props} />
}

export async function getStaticPaths() {
  const { data } = await apolloClient.query<QueryMangas, QueryMangasVariables>({
    query: QUERY_MANGAS
  })

  const paths = data.mangas.map(({ slug }) => ({
    params: { slug }
  }))
  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await apolloClient.query<
    QueryMangaBySlug,
    QueryMangaBySlugVariables
  >({
    query: QUERY_MANGA_BY_SLUG,
    variables: { slug: `${params?.slug}` }
  })

  if (!data.manga.length) {
    return { notFound: true }
  }
  const manga = data.manga[0]

  const type =
    manga.origin?.value === 'JP'
      ? 'Manga'
      : manga.origin?.value === 'CN'
      ? 'Manhwa'
      : 'Manhua'

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),

      banner: {
        img: manga.banner?.url
          ? formatImage(manga.banner?.url)
          : '/images/defaultBanner.jpg',
        title: manga.title,
        hasMask: true
      },
      cover: {
        id: manga.id,
        img: formatImage(manga.cover?.url),
        title: manga.title
      },
      mangaInfo: {
        title: manga.title,
        sinopse: manga.sinopse
      },
      cardMangaInfo: {
        origin: type,

        author:
          manga.stories.length > 0 ? manga.stories[0].name : 'Desconhecido',
        artist:
          manga.artists.length > 0 ? manga.artists[0].name : 'Desconhecido',
        chapters: 0,
        status: manga.status?.label,
        romanjiName: manga.romajiName,
        englishName: manga.englishName,
        nativeName: manga.originalName,
        genres: manga.genres.map((genre) => genre.label)
      },
      slug: `${params!.slug}`
    },
    revalidate: 90
  }
}
