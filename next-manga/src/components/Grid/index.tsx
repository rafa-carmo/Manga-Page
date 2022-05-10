import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Grid = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(auto-fill, 18rem);
    grid-gap: ${theme.spacings.medium} ${theme.spacings.medium};
    margin: ${theme.spacings.medium} ${theme.spacings.xxsmall};
    ${media.lessThan('medium')`
    grid-template-columns: 1fr 1fr;
    grid-gap: ${theme.spacings.large} ${theme.spacings.large};
    `}
  `}
`
