import * as S from './styles'

export type CardMangaInfoProps = {
  origin?: string
  chapters: string
  status: string
  romanjiName?: string
  englishName?: string
  nativeName?: string
  author?: string
  artist?: string
  genres?: string[]
}

const CardMangaInfo = ({
  origin,
  chapters,
  status,
  romanjiName,
  englishName,
  nativeName,
  author,
  artist,
  genres
}: CardMangaInfoProps) => {
  return (
    <S.Wrapper>
      <S.Item>
        <S.Title>Tipo</S.Title>
        <S.Value>{origin}</S.Value>
      </S.Item>

      <S.Item>
        <S.Title>Autor</S.Title>
        <S.Value>{author}</S.Value>
      </S.Item>

      <S.Item>
        <S.Title>Artista</S.Title>
        <S.Value>{artist}</S.Value>
      </S.Item>

      <S.Item>
        <S.Title>Nome original</S.Title>
        <S.Value>{nativeName}</S.Value>
      </S.Item>

      <S.Item>
        <S.Title>Romanji</S.Title>
        <S.Value>{romanjiName}</S.Value>
      </S.Item>

      <S.Item>
        <S.Title>Ingles</S.Title>
        <S.Value>{englishName}</S.Value>
      </S.Item>

      <S.Item>
        <S.Title>Capitulos</S.Title>
        <S.Value>{chapters}</S.Value>
      </S.Item>

      <S.Item>
        <S.Title>Generos</S.Title>
        <S.Value>{genres?.join(' / ')}</S.Value>
      </S.Item>

      <S.Item>
        <S.Title>Status</S.Title>
        <S.Value>{status}</S.Value>
      </S.Item>
    </S.Wrapper>
  )
}
export default CardMangaInfo
