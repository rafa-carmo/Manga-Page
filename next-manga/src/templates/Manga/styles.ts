import { Container } from 'components/Container'
import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Main = styled.main`
  ${({ theme }) => css`
    margin-top: 20rem;
    ${media.greaterThan('medium')`
    margin-top: 25rem;
  `}
  `}
`

type BannerProps = {
  src: string
}
export const Banner = styled.div<BannerProps>`
  ${({ src }) => css`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 39.5rem;
    background-image: url(${src});
    background-size: cover;
    background-position: top center;
    opacity: 0.4;
    pointer-events: none;
    ${media.greaterThan('medium')`
      height: 50rem;
      clip-path:  polygon(0 0, 100% 0, 100% 100%, 0 85%);
    `}
  `}
`

const Section = styled(Container).attrs({ as: 'section' })`
  ${({ theme }) => css`
    margin-bottom: ${theme.spacings.xlarge};

    ${media.greaterThan('medium')`
      margin-bottom: calc(${theme.spacings.xlarge} *2);
    `}
  `}
`
export const SectionCover = styled(Section)`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    ${media.greaterThan('medium')`
    display: grid;
    grid-template-columns: 1fr 4fr;
    gap: ${theme.spacings.xxlarge};
  `}
    align-items: center;
  `}
`
export const MangaInfo = styled.div`
  ${media.lessThan('medium')`
  margin-top: 2rem;
 `}
`
export const SectionChapters = styled(Section)`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 4fr;
    gap: ${theme.spacings.xxlarge};
    ${media.lessThan('medium')`
      display:flex;
      flex-direction: column;
    `}
  `}
`
