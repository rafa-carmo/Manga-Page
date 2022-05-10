import styled, { css, DefaultTheme } from 'styled-components'
import media from 'styled-media-query'
import { MangaCardTooltipProps } from '.'

type DescriptionProps = Pick<MangaCardTooltipProps, 'direction'>

const descriptionModifiers = {
  left: (theme: DefaultTheme) => css`
    left: 110%;
    &::before {
      content: '';
      position: absolute;
      left: -2rem;
      border-style: solid;
      border-left-width: 1rem;
      border-left-color: transparent;
      border-top-color: transparent;
      border-bottom-color: transparent;
      border-right-color: ${theme.colors.white};
      border-bottom-width: 0.5rem;
      border-top-width: 0.5rem;
      border-right-width: 1rem;
    }
  `,
  right: (theme: DefaultTheme) => css`
    right: 110%;
    &::before {
      content: '';
      position: absolute;
      right: -2rem;
      border-style: solid;
      border-left-width: 1rem;
      border-right-color: transparent;
      border-top-color: transparent;
      border-bottom-color: transparent;
      border-left-color: ${theme.colors.white};
      border-bottom-width: 0.5rem;
      border-top-width: 0.5rem;
      border-right-width: 1rem;
    }
  `
}

export const Description = styled.div<DescriptionProps>`
  ${({ theme, direction }) => css`
    display: hidden;
    width: 30rem;
    height: 20rem;
    position: absolute;
    ${!!direction && descriptionModifiers[direction!](theme)}
    top: 1rem;
    background: ${theme.colors.white};
    opacity: 0;
    pointer-events: none;
    padding: 1rem 2rem;
    transition: opacity 0.3s linear;
    border-radius: 0.5rem;
    z-index: ${theme.layers.base};
    ${media.greaterThan('large')`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `}
  `}
`
export const Type = styled.h4`
  text-align: center;
`

export const Scan = styled.h4``

export const Scans = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`

export const Chapters = styled.div`
  width: 100%;
  text-align: center;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Genres = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export const Genre = styled.div`
  &:not(:last-child) {
    margin-right: 1rem;
  }
`
export const Status = styled.p`
  width: 100%;
  text-align: center;
`
