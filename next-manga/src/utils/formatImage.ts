import { QueryChapterPages_chapter_pages } from 'graphql/generated/QueryChapterPages'

export const formatImage = (url: string | undefined): string | undefined => {
  if (url?.includes('http')) {
    return url
  }
  return `http://192.168.5.25:1337${url}`
}

export function sortPages(pages: (QueryChapterPages_chapter_pages | null)[]) {
  const pagesForSort = [...pages]

  pagesForSort.sort(function (a, b) {
    if (a!.page < b!.page) {
      return -1
    }
    if (a!.page > b!.page) {
      return 1
    }
    return 0
  })
  return pagesForSort.map((page) => formatImage(page!.page))
}
