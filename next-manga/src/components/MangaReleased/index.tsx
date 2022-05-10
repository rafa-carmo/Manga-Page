import * as S from './styles'
import { Book } from '@styled-icons/entypo/Book'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'
import Link from 'next/link'
import { useReader } from 'hooks/use-reader'
import Image from 'next/image'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export type Chapter = {
  chapter: string
  scan: string
  date: string
  id: string
}

export type MangaReleasedProps = {
  slug: string
  img: string
  title: string
  chapters: Chapter[]
}

const MangaReleased = ({ slug, title, img, chapters }: MangaReleasedProps) => {
  const { isRead } = useReader()
  return (
    <S.Wrapper>
      <S.CoverContainer>
        <Link href={`/manga/${slug}`}>
          <a>
            <S.CoverWrapper>
              <Image
                src={img}
                aria-label={title}
                layout="responsive"
                width={90}
                height={120}
                object-fit="cover"
              />
            </S.CoverWrapper>
            <S.Title>{title}</S.Title>
          </a>
        </Link>
      </S.CoverContainer>
      <S.ChaptersContainer>
        {chapters.map((chapter) => (
          <S.Chapter key={`${title}-${chapter.chapter}`}>
            <S.InfoChapter>
              <Book
                size={20}
                color={isRead(chapter.id) ? 'green' : undefined}
              />
              <Link href={`/reader/${slug}/${chapter.chapter}`}>
                <a>Capitulo {chapter.chapter}</a>
              </Link>
            </S.InfoChapter>
            <S.RightContainer>
              <S.Scan href={`/scan/${chapter.scan}`}>{chapter.scan}</S.Scan>
              Lançado {dayjs(chapter.date).fromNow()}
            </S.RightContainer>
          </S.Chapter>
        ))}
      </S.ChaptersContainer>
    </S.Wrapper>
  )
}

export default MangaReleased
