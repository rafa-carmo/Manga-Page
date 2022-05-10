import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.main`
  ${({ theme }) => css`
    background: ${theme.colors.cardBg};
    padding: ${theme.spacings.xlarge};
    display: flex;
    flex-direction: column;
    ${media.lessThan('medium')`
    padding: ${theme.spacings.small} ${theme.spacings.medium};
    `}
  `}
`
export const Item = styled.div`
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`

export const Title = styled.h4`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
  `}
`

export const Value = styled.p`
  ${({ theme }) => css`
    margin-top: 0.5rem;
    color: ${theme.colors.lightText};
  `}
`
