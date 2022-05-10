import styled, { css } from 'styled-components'

export const Item = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    cursor: default;

    color: ${theme.colors.black};
    padding: ${theme.spacings.xsmall} ${theme.spacings.small};
    border-bottom: 0.1rem solid ${theme.colors.lightGray};
    transition: background ${theme.transition.default};
    &:hover {
      background: ${theme.colors.primary};
    }
    span {
      padding-left: ${theme.spacings.xxsmall};
    }
  `}
`
