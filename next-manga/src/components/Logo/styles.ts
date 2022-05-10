import styled, { css } from 'styled-components'
import { LogoProps } from '.'

const wrapperModifiers = {
  small: () => css`
    width: 6rem;
  `,
  normal: () => css`
    width: 10rem;
  `,
  large: () => css`
    width: 20rem;
    height: 5.9rem;
  `
}

export const Wrapper = styled.div<LogoProps>`
  ${({ theme, color, size }) => css`
    color: ${color ? theme.colors[color!] : theme.colors.lightText};
    ${!!size && wrapperModifiers[size]}
  `}
`
