import * as S from './styles'

export type MangaInfoProps = {
  title: string
  sinopse: string
}

const MangaInfo = ({ title, sinopse }: MangaInfoProps) => (
  <S.Wrapper>
    <S.Title>{title}</S.Title>
    <S.Sinopse>{sinopse} </S.Sinopse>
  </S.Wrapper>
)

export default MangaInfo
