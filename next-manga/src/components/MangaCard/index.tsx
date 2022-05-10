import MangaCardTooltip, {
  MangaCardTooltipProps
} from 'components/MangaCardTooltip'
import * as S from './styles'
import { useRouter } from 'next/router'
import MediaMatch from 'components/MediaMatch'

// import Image from 'next/image'

export type MangaCardProps = {
  title: string
  slug: string
  url?: string
  img?: string
  update?: string
  haveTooltip?: boolean
} & MangaCardTooltipProps

const MangaCard = ({
  title,
  slug,
  img,
  update,
  scans,
  status,
  genres,
  direction,
  haveTooltip,
  chapters = '0',
  url,
  type
}: MangaCardProps) => {
  const router = useRouter()

  const handleClick = () => {
    url ? (document.location.href = url) : router.push(`/manga/${slug}`)
  }

  return (
    <S.Wrapper>
      <S.ImageBox>
        {!!update && (
          <S.Update>
            <h3>{update}</h3>
          </S.Update>
        )}
        <MediaMatch greaterThan="medium">
          {haveTooltip && (
            <S.TooltipContainer>
              <MangaCardTooltip
                title={title}
                scans={scans}
                status={status}
                genres={genres}
                direction={direction}
                type={type}
                chapters={chapters}
              />
            </S.TooltipContainer>
          )}
        </MediaMatch>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img ? img : 'images/folder.jpg'}
          aria-label={title}
          onClick={() => handleClick()}
        />
        {/* <Image
          src={`${img}`}
          aria-label={title}
          layout="fill"
          object-fit="cover"
          onClick={() => handleClick()}
        /> */}
      </S.ImageBox>

      <S.Title onClick={() => handleClick()}>{title}</S.Title>
    </S.Wrapper>
  )
}
export default MangaCard
