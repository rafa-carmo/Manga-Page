import { GetStaticProps } from 'next'
import Reader from 'templates/Reader'
import { ReaderProps } from 'templates/Reader/index'

import { useRouter } from 'next/dist/client/router'
import { initializeApollo } from 'utils/apollo'

import { sortPages } from 'utils/formatImage'
import {
  QUERY_CHAPTERS_PATHS,
  QUERY_CHAPTER_PAGES
} from 'graphql/queries/chapter'
import {
  QueryChapterPages,
  QueryChapterPagesVariables
} from 'graphql/generated/QueryChapterPages'
import {
  QueryChaptersPaths,
  QueryChaptersPathsVariables
} from 'graphql/generated/QueryChaptersPaths'
import { ChapterMapperWithoutRepeate } from 'utils/mappers'

const apolloClient = initializeApollo()

export default function Index(props: ReaderProps) {
  const router = useRouter()

  if (router.isFallback) return null

  return <Reader {...props} />
}

export async function getStaticPaths() {
  const { data } = await apolloClient.query<
    QueryChaptersPaths,
    QueryChaptersPathsVariables
  >({
    query: QUERY_CHAPTERS_PATHS,
    variables: {
      limit: 1
    },
    fetchPolicy: 'network-only'
  })
  const paths = data.chapters.map(({ chapter, mangas }) => ({
    params: { slug: mangas?.slug, chapter: chapter }
  }))
  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await apolloClient.query<
    QueryChapterPages,
    QueryChapterPagesVariables
  >({
    query: QUERY_CHAPTER_PAGES,
    variables: {
      chapter: `${params!.chapter}`,
      slug: `${params!.slug}`
    },
    fetchPolicy: 'network-only'
  })

  if (!data.chapter.length) {
    return { notFound: true }
  }
  return {
    props: {
      chapter: {
        title: data.chapter[0].mangas?.title,
        chapters: ChapterMapperWithoutRepeate(data.chapters),
        slug: `${params!.slug}`,
        atualChapter: `${params!.chapter}`,
        pages: data.chapter[0].pages ? sortPages(data.chapter[0].pages) : [],

        id: data.chapter[0].id
      }
    },
    revalidate: 90
  }
}
