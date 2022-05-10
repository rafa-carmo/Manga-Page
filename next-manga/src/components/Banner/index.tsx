import Button from 'components/Button'
import * as S from './styles'
import Link from 'next/link'
// import Image from 'next/image'

export type BannerProps = {
  img: string
  title?: string
  slug: string
  sinopse?: string
  buttonLabel?: string
  hasMask?: boolean
}

const Banner = ({
  img,
  title,
  slug,
  sinopse,
  hasMask,
  buttonLabel = 'Ir para pagina'
}: BannerProps) => (
  <S.Wrapper>
    <S.Image src={img} aria-label={title} />
    {hasMask && <S.Mask />}
    {sinopse && (
      <S.Caption>
        <S.Title>{title}</S.Title>
        <S.ContentBanner>
          <S.Sinopse dangerouslySetInnerHTML={{ __html: sinopse }} />
        </S.ContentBanner>
        <S.ButtonContainer>
          <Link href={`/manga/${slug}`} passHref>
            <Button as="a" size="large">
              {buttonLabel}
            </Button>
          </Link>
        </S.ButtonContainer>
      </S.Caption>
    )}
  </S.Wrapper>
)

export default Banner
