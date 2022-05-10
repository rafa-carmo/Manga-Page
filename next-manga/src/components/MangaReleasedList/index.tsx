import * as S from './styles'
import MangaReleased, { MangaReleasedProps } from 'components/MangaReleased'

export type MangaReleasedListProps = {
  items?: MangaReleasedProps[]
}

const MangaReleasedList = ({ items }: MangaReleasedListProps) => {
  return (
    <S.Wrapper>
      {items?.map((manga, index) => (
        <S.MangaItem key={`release-${manga.title}-${index}`}>
          <MangaReleased {...manga} />
        </S.MangaItem>
      ))}
    </S.Wrapper>
  )
}

export default MangaReleasedList
