import styled, { css } from 'styled-components'

export const Wrapper = styled.main`
  ${({ theme }) => css`
    width: 100%;
    height: 13rem;

    align-items: center;

    color: ${theme.colors.lightText};
    padding: 0 ${theme.spacings.small};
    border-radius: 0.5rem;
    * {
      text-decoration: none;
    }
  `}
`

export const MangaContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
`

export const Image = styled.img`
  width: 9rem;
  height: 12rem;
  cursor: pointer;
`

export const ImageContainer = styled.div``

export const InfoContainter = styled.div`
  ${({ theme }) => css`
    margin-left: ${theme.spacings.small};
  `}
`

export const Genres = styled.div``

export const Title = styled.h4`
  ${({ theme }) => css`
    color: ${theme.colors.lightText};
    font-size: ${theme.font.sizes.small};
    line-height: ${theme.font.sizes.medium};
    font-weight: ${theme.font.bold};
    margin-bottom: 0.5rem;
    cursor: pointer;
  `}
`
