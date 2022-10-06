import { QueryChapterPages_chapter_pages } from 'graphql/generated/QueryChapterPages'

export const formatImage = (url: string | undefined): string | undefined => {
  if (url?.includes('http')) {
    return url
  }
  return `${process.env.NEXT_PUBLIC_API_URL}${url}`
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
