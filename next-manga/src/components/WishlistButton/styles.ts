import styled, { css } from 'styled-components'

export const ListButton = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.4rem;
    color: ${theme.colors.lightText};
    font-size: ${theme.font.sizes.small};
    line-height: ${theme.font.sizes.medium};
    font-weight: ${theme.font.bold};
    cursor: pointer;
  `}
`
