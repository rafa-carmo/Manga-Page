import styled, { css } from 'styled-components'
export const FormError = styled.div`
  ${({ theme }) => css`
    text-align: center;
    color: red;
    font-size: ${theme.font.sizes.small};
    svg {
      width: 1.6rem;
    }
  `}
`
