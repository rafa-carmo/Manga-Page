import { gql } from '@apollo/client'

export const MangaCardSliderFragment = gql`
  fragment MangaCardSliderFragment on Mangas {
    id
    title
    slug
    cover {
      url
    }
  }
`
export const MangaCardFragment = gql`
  fragment MangaCardFragment on Mangas {
    id
    title
    slug
    cover {
      url
    }
    status {
      label
      value
    }
    genres {
      label
      value
    }
  }
`

export const ChaptersHome = gql`
  fragment ChaptersHome on Chapter {
    id
    mangas {
      id
      title
      slug
      cover {
        url
      }
    }
    chapter
    scans {
      id
      scan
      slug
    }
    created_at
    createdAt
  }
`
