import styled, { css } from 'styled-components'

export const CheckBox = styled.div`
  ${({ theme }) => css`
    width: 2.2rem;
    height: 2.2rem;

    position: relative;
    cursor: pointer;
    svg {
      width: 4.5rem;
      height: 4.5rem;
      position: absolute;
      top: -1.5rem;
      left: -0.8rem;
      color: ${theme.colors.secondary};
    }
  `}
`
