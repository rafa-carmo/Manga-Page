import { MangaCardProps } from 'components/MangaCard'

import * as S from './styles'

export type TopCardProps = {
  position?: string
} & MangaCardProps

const TopCard = ({ img, title, genres, url }: TopCardProps) => {
  return (
    <S.Wrapper>
      <S.MangaContainer>
        <a href={url} target="_blank" rel="noreferrer">
          <S.ImageContainer>
            <S.Image src={img} alt={title} />
          </S.ImageContainer>
        </a>
        <S.InfoContainter>
          <a href={url} target="_blank" rel="noreferrer">
            <S.Title>{title}</S.Title>
          </a>
          <S.Genres>{genres!.join(' / ')}</S.Genres>
        </S.InfoContainter>
      </S.MangaContainer>
    </S.Wrapper>
  )
}

export default TopCard
