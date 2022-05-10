import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.main`
  ${({ theme }) => css`
    background: ${theme.colors.cardBg};
    padding: ${theme.spacings.xlarge};
    ${media.lessThan('medium')`
    padding: ${theme.spacings.small} ${theme.spacings.medium};
    `}
  `}
`

export const Title = styled.h3`
  ${({ theme }) => css`
    color: ${theme.colors.lightText};
  `}
`

export const Sinopse = styled.p`
  ${({ theme }) => css`
    padding-top: ${theme.spacings.small};
    color: ${theme.colors.lightText};
    text-indent: 3ch;
    text-align: justify;
    text-justify: inter-word;
  `}
`
