import Button from 'components/Button'
import * as S from './styles'

export type MangaCardTooltipProps = {
  title: string
  type?: string
  genres?: string[]
  scans?: string[]
  status?: string
  chapters?: string
  direction?: 'left' | 'right'
  read?: number
}

const MangaCardTooltip = ({
  type,
  scans,
  status,
  genres,
  title,
  direction = 'left',
  chapters,
  read = 0
}: MangaCardTooltipProps) => {
  return (
    <S.Description direction={direction}>
      <S.Type>{!type ? 'Não expecificado' : type}</S.Type>

      <S.Scans>
        {scans ? (
          scans.map((scan) => <S.Scan key={`${scan}-${title}`}>{scan}</S.Scan>)
        ) : (
          <S.Scan>Sem scan registrada</S.Scan>
        )}
      </S.Scans>

      <S.Chapters>
        <strong>Capitulos: </strong>
        {read != 0 && <p>{read} / </p>}
        <p>{chapters}</p>
      </S.Chapters>

      <S.Status>
        <strong>Status:</strong> <span>{status}</span>
      </S.Status>

      <S.Genres>
        {genres?.slice(0, 3).map((genre) => (
          <S.Genre key={`tooltip-${genre}-${title}`}>
            <Button size="small" border="circle">
              {genre}
            </Button>
          </S.Genre>
        ))}
      </S.Genres>
    </S.Description>
  )
}

export default MangaCardTooltip
