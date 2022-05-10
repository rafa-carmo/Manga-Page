import { formatImage } from './formatImage'

import {
  QueryPageMangas_genres,
  QueryPageMangas_lastMangas,
  QueryPageMangas_mangas,
  QueryPageMangas_origins,
  QueryPageMangas_statuses
} from 'graphql/generated/QueryPageMangas'
import { MangaCardProps } from 'components/MangaCard/index'
import { QueryReleasedChapters_chapters } from 'graphql/generated/QueryReleasedChapters'
import { MangaReleasedProps } from 'components/MangaReleased'
import { ItemProps } from 'components/SearchBar'
import { QueryFavorite_favorites_mangases } from 'graphql/generated/QueryFavorite'

import { ChapterProps } from 'components/ChaptersList'

import { QueryChapterPages_chapters } from '../graphql/generated/QueryChapterPages'
import { xor } from 'lodash'

import { QueryReaders_readers } from '../graphql/generated/QueryReaders'
import { QueryChaptersById_chaptersInfo } from 'graphql/generated/QueryChaptersById'
import { QueryUserWishlist_wishlistForUser } from '../graphql/generated/QueryUserWishlist'

export const StringToNumberMapper = (numbers: string[]) => {
  return numbers.sort(function (a, b) {
    return parseFloat(a) - parseFloat(b)
  })
}

export const MangaCardSliderMapper = (mangas: QueryPageMangas_lastMangas[]) => {
  return mangas.map(
    (manga) =>
      <MangaCardProps>{
        title: manga.title,
        slug: manga.slug,
        img: manga.cover ? formatImage(manga.cover!.url) : 'images/unknow.webp'
      }
  )
}

export const MangaCardMapper = (
  mangas:
    | QueryPageMangas_mangas[]
    | QueryFavorite_favorites_mangases[]
    | QueryUserWishlist_wishlistForUser[]
    | undefined
    | null
) => {
  return mangas
    ? mangas.map(
        (manga) =>
          <MangaCardProps>{
            title: manga.title,
            slug: manga.slug,
            img: formatImage(manga.cover?.url),

            // chapters: manga.chapters ? `${manga.chapters.length}` : '0',
            status: manga.status?.label,
            genres: manga.genres?.map((genre) => genre.label)
          }
      )
    : []
}

export const ChapterMapper = (
  chapters: QueryChaptersById_chaptersInfo[] | undefined | null
) => {
  return chapters
    ? chapters
        .map(
          (chapter) =>
            <ChapterProps>{
              id: chapter.id,
              chapter: chapter.chapter,
              scan: chapter.scan?.scan ?? 'Desconhecida',
              date: chapter.createdAt
            }
        )
        .sort(function (a, b) {
          return parseFloat(a.chapter) - parseFloat(b.chapter)
        })
    : []
}

export const MangaReleased = (
  mangas: QueryReleasedChapters_chapters[] | undefined
) => {
  if (!mangas) {
    return
  }

  return mangas.map(
    (manga) =>
      <MangaReleasedProps>{
        title: manga.mangas?.title,
        slug: manga.mangas?.slug,
        img: formatImage(manga.mangas?.cover!.url),
        chapters: [
          {
            id: manga.id,
            chapter: manga.chapter,
            scan: manga.scan?.scan ? manga.scan?.scan : 'Desconhecida',
            date: manga.createdAt
          }
        ]
      }
  )
}

export const FilterLists = (
  listOrigins: QueryPageMangas_origins[],
  listStatus: QueryPageMangas_statuses[],
  listGenres: QueryPageMangas_genres[]
) => {
  const list = [
    {
      title: 'Generos',
      name: 'genres',
      type: 'checkbox',
      items: [...listGenres]
    },
    {
      title: 'Origem',
      name: 'origin',
      type: 'checkbox',
      items: [...listOrigins]
    },
    {
      title: 'Status',
      name: 'status',
      type: 'checkbox',
      items: [...listStatus]
    }
  ]

  return list.map(
    (item) =>
      <ItemProps>{
        title: item.title,
        name: item.name,
        type: 'checkbox',
        fields: item.items
      }
  )
}

export const ChapterMapperWithoutRepeate = (
  chapters: QueryChapterPages_chapters[]
) => {
  const values = chapters.map((chapter) => chapter.chapter)
  return xor(values.sort())
}

export const ReaderListMapper = (
  chapters: QueryReaders_readers[] | null | undefined
) => {
  const chaptersReturn = chapters
    ? chapters[0]
      ? chapters[0].readers?.chapters
      : []
    : []
  return chaptersReturn
}
