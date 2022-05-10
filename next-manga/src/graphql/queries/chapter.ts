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
    chapters(where: { mangas: { slug: $slug } }, limit: 1000) {
      id
      chapter
      scan {
        id
        scan
        slug
      }
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
