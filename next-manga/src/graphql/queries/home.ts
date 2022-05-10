import { gql } from '@apollo/client'
import { ChaptersHome, MangaCardFragment } from 'graphql/fragments/home'

export const QUERY_BANNER = gql`
  query QueryHome {
    banners {
      mangas {
        id
        title
        slug
        banner {
          url
        }
        sinopse
      }
    }
    lastMangas: mangases(sort: "created_at:desc", limit: 10) {
      ...MangaCardFragment
    }
    ranks(sort: "rank:asc") {
      id
      title
      cover
      genres
      url
      rank
    }
  }
  ${MangaCardFragment}
`
// chaptersConnection {
//   values {
//     id
//   }
// }

export const QUERY_RELEASE_CHAPTERS = gql`
  query QueryReleasedChapters($limit: Int, $start: Int) {
    chapters(sort: "createdAt:desc", limit: $limit, start: $start) {
      ...ChaptersHome
    }
  }
  ${ChaptersHome}
`
