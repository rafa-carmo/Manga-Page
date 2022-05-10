import { saturate } from 'polished'
import styled, { css } from 'styled-components'

type ButtonProps = {
  backgroundColor: 'red' | 'primary' | 'secondary'
}
export const Button = styled.div<ButtonProps>`
  ${({ theme, backgroundColor }) => css`
    color: ${theme.colors.white};
    background: ${saturate(0.9, theme.colors[backgroundColor])};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    svg {
      width: 2.5rem;
    }
  `}
`
