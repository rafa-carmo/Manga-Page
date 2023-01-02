import { gql } from '@apollo/client'
import {
  MangaCardFragment,
  MangaCardSliderFragment
} from 'graphql/fragments/home'

export const QUERY_MANGAS = gql`
  query QueryMangas($limit: Int) {
    mangas: mangases(limit: $limit) {
      ...MangaCardFragment
    }
  }
  ${MangaCardFragment}
`

export const QUERY_PAGE_MANGAS = gql`
  query QueryPageMangas($limit: Int, $sort: String, $start: Int, $where: JSON) {
    genres {
      label
      value
    }
    origins {
      label
      value
    }
    statuses {
      label
      value
    }
    lastMangas: mangases(limit: 10, sort: "created_at:Desc") {
      ...MangaCardSliderFragment
    }
    mangas: mangases(limit: $limit, sort: $sort, start: $start, where: $where) {
      ...MangaCardFragment
    }


  }
  ${MangaCardFragment},
  ${MangaCardSliderFragment}
`
// mangasesConnection(where: $where){
//   values{
//     id
//   }
// }
export const QUERY_MANGA_BY_SLUG = gql`
  query QueryMangaBySlug($slug: String) {
    manga: mangases(where: { slug: $slug }) {
      id
      title
      cover {
        url
      }
      banner {
        url
      }
      artists {
        name
      }
      stories {
        name
      }

      englishName
      originalName
      romajiName
      type
      status {
        label
        value
      }
      sinopse
      genres {
        label
      }
      origin {
        label
        value
      }
    }
  }
`

export const QUERY_CHAPTERS_BY_ID = gql`
  query QueryChaptersById($id: Int, $limit: Int, $start: Int, $sort: String) {
    chaptersInfo: chapters(
      where: { mangas: { id: $id } }
      sort: $sort
      limit: $limit
      start: $start
    ) {
      id
      chapter
      scans {
        scan
      }
      created_at
      createdAt
    }
  }
`
export const QUERY_FILTER_ITEMS = gql`
  query QueryFilterItems {
    genres {
      label
      value
    }
    origins {
      label
      value
    }
    statuses {
      label
      value
    }
  }
`
