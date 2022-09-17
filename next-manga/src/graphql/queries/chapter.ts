import { gql } from '@apollo/client'

export const QUERY_CHAPTER_PAGES = gql`
  query QueryChapterPages($chapter: String, $slug: String) {
    chapter: chapters(
      where: { chapter: $chapter, mangas: { slug: $slug } }
      limit: 1
    ) {
      id
      mangas {
        id
        title
      }
      pages {
        page
      }
    }
  }
`

export const QUERY_GET_CHAPTERS = gql`
  query QueryGetChapters($slug: String) {
    chapters(where: { mangas: { slug: $slug } }, limit: 1000) {
      id
      chapter
    }
  }
`

export const QUERY_CHAPTERS_PATHS = gql`
  query QueryChaptersPaths($limit: Int) {
    chapters(limit: $limit) {
      id
      mangas {
        slug
      }
      chapter
    }
  }
`
