import styled, { css, DefaultTheme } from 'styled-components'
import { ButtonProps } from '.'

export type WrapperProps = { hasIcon: boolean } & Pick<
  ButtonProps,
  'size' | 'border' | 'color' | 'fullWidth'
>

const wrapperModifiers = {
  small: (theme: DefaultTheme) => css`
    height: 3rem;
    font-size: ${theme.font.sizes.xsmall};
  `,
  medium: (theme: DefaultTheme) => css`
    height: 4rem;
    font-size: ${theme.font.sizes.small};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.medium};
  `,
  large: (theme: DefaultTheme) => css`
    height: 5rem;
    font-size: ${theme.font.sizes.medium};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xlarge};
  `,
  fullWidth: () => css`
    width: 100%;
  `,
  none: () => css`
    border: none;
  `,
  withIcon: (theme: DefaultTheme) => css`
    svg {
      width: 1.5rem;
      & + span {
        margin-left: ${theme.spacings.xxsmall};
      }
    }
  `,
  minimal: (theme: DefaultTheme) => css`
    background: none;
    color: ${theme.colors.primary};
    &:hover {
      background: none;
    }
  `,
  disabled: () => css`
    &:disabled {
      cursor: not-allowed;
      filter: saturate(30%);
    }
  `,
  rectangle: () => css``,
  circle: () => css`
    border-radius: 50%;
  `
}

export const Wrapper = styled.button<WrapperProps>`
  ${({ theme, size, hasIcon, disabled, border, color, fullWidth }) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: ${color === 'primary' || color === 'secondary'
      ? theme.colors[color!]
      : color};
    color: ${theme.colors.white};
    padding: ${theme.spacings.xxsmall};
    cursor: pointer;
    text-decoration: none;

    ${!!size && wrapperModifiers[size!](theme)}
    ${!!hasIcon && wrapperModifiers.withIcon(theme)}
    ${disabled && wrapperModifiers.disabled()}
    ${border && wrapperModifiers[border!]}
    ${!!fullWidth && wrapperModifiers.fullWidth()}
  `}
`
