import styled, { css } from 'styled-components'
import media from 'styled-media-query'
import { darken } from 'polished'

export const Wrapper = styled.main`
  position: relative;
  ${media.greaterThan('medium')`
    box-shadow: 0 0.4rem 0.5rem 0 rgba(0, +0, +0, +0.2);
  `}
`
type ImageProps = {
  src: string
}

export const Image = styled.div<ImageProps>`
  ${({ theme, src }) => css`
    width: 100%;
    height: 23rem;
    background-color: ${theme.colors.lightGray};
    position: relative;
    background-image: url(${src});
    background-position: center center;
    background-size: cover;
    ${media.greaterThan('medium')`
      height:48rem;
    `}
  `}
`

export const Mask = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 23rem;
    position: absolute;
    content: ' ';
    background: ${theme.colors.darkGray};
    z-index: ${theme.layers.base};
    top: 0;
    opacity: 0.4;
    ${media.greaterThan('medium')`
    height:48rem;
  `};
  `}
`

export const Caption = styled.div`
  ${({ theme }) => css`
    width: 100%;
    background-color: rgba(0, +0, +0, +0.7);
    padding: ${theme.spacings.small};
    ${media.greaterThan('medium')`
      /* border-radius: ${theme.border.radius} ${theme.border.radius}; */
      padding: ${theme.spacings.large};
      position: absolute;
      bottom: 0;
      left: 0;
    `}
  `}
`

export const Title = styled.h3`
  ${({ theme }) => css`
    color: ${theme.colors.lightText};
  `}
`
export const ContentBanner = styled.div`
  ${media.greaterThan('medium')`

    display: grid;
    grid-template-columns: 4fr 1fr;
    gap: 0 4rem;
      `}
`

export const Sinopse = styled.p`
  ${({ theme }) => css`
    color: ${darken(0.2, theme.colors.lightText)};
    margin-top: ${theme.spacings.xsmall};

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  `}
`

export const ButtonContainer = styled.div`
  display: flex;
  align-items: end;
  justify-content: center;
  margin-top: 5rem;
  ${media.greaterThan('medium')`
  position: absolute;
  right: 2rem;
  bottom: 1rem;
  `}
`
