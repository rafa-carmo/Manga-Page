import * as S from './styles'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'
import Link from 'next/link'
import Spinner from 'components/Spinner'
import CheckReaderButton from 'components/CheckReaderButton'
import { useSession } from "next-auth/react"

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export type ChapterProps = {
  id: string
  chapter: string
  scan: string
  date: string
}

export type ChaptersListProps = {
  items: ChapterProps[]
  slug: string
  loading: boolean
}

const ChaptersList = ({ items, slug, loading }: ChaptersListProps) => {
  const { data: session } = useSession()
  return (
    <S.Wrapper>
      {items?.map((chapter) => (
        <S.ChapterContainer key={chapter.chapter}>
          <S.LeftContent>
            {session && <CheckReaderButton id={chapter.id} />}
            <Link href={`/reader/${slug}/${chapter.chapter}`} passHref>
              <S.Chapter>Capitulo {chapter.chapter}</S.Chapter>
            </Link>
          </S.LeftContent>
          <S.RightContainer>
            <S.Scan>{chapter.scan}</S.Scan>
            <S.Date> {dayjs(chapter.date).fromNow()}</S.Date>
          </S.RightContainer>
        </S.ChapterContainer>
      ))}
      {loading && <Spinner />}
    </S.Wrapper>
  )
}

export default ChaptersList
