import styled, { css, DefaultTheme } from 'styled-components'
import { setLightness } from 'polished'

import { TextFieldProps } from '.'

type InputProps = Pick<
  TextFieldProps,
  'iconPosition' | 'sizeInput' | 'iconColor'
>
type WrapperProps = Pick<TextFieldProps, 'disabled'> & {
  error?: boolean
}

export const Error = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.red};
    font-size: ${theme.font.sizes.xsmall};
  `}
`

const wrapperModifiers = {
  error: (theme: DefaultTheme) => css`
    ${InputWrapper} {
      border-color: ${theme.colors.red};
    }
    ${Icon},
    ${Label} {
      color: ${theme.colors.red};
    }
  `,
  disabled: (theme: DefaultTheme) => css`
    ${Label},
    ${Input},
    ${Icon} {
      cursor: not-allowed;
      color: ${theme.colors.gray};
      &::placeholder {
        color: currentColor;
      }
    }
  `
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, error, disabled }) => css`
    ${error && wrapperModifiers.error(theme)}
    ${disabled && wrapperModifiers.disabled(theme)}
    margin-right: ${theme.spacings.medium};
  `}
`

export const InputWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    background: ${setLightness(0.7, theme.colors.lightGray)};
    border-radius: 0.5rem;
    padding: 0 ${theme.spacings.xsmall};
    border: 0.1rem solid;
    border-color: ${theme.colors.lightGray};
    min-width: 20rem;
    box-shadow: 5px 5px 35px -7px rgba(255, 255, 255, 0.77);
    margin: ${theme.spacings.xsmall} 0;
    &:focus-within {
      box-shadow: 0 0 0.5rem ${theme.colors.primary};
    }
  `}
`

const inputModifiers = {
  small: () => css`
    height: 3.5rem;
  `,
  medium: () => css`
    height: 6rem;
  `
}
export const Input = styled.input<InputProps>`
  ${({ theme, iconPosition, sizeInput }) => css`
    color: ${theme.colors.black};
    font-family: ${theme.font.family};
    font-size: ${theme.font.sizes.medium};
    padding: ${theme.spacings.xxsmall} 0;
    padding-${iconPosition}: ${theme.spacings.xsmall};
    ${!!sizeInput && inputModifiers[sizeInput]}
    background: transparent;
    border: 0;
    outline: none;
    width: 100%;

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 ${theme.spacings.small}
      ${setLightness(0.7, theme.colors.lightGray)} inset;
      filter: none
    }

  `}
`
type LabelProps = Pick<TextFieldProps, 'labelColor'>
export const Label = styled.label<LabelProps>`
  ${({ theme, labelColor }) => css`
    font-size: ${theme.font.sizes.medium};
    color: ${labelColor == 'white'
      ? theme.colors.lightText
      : theme.colors.black};
    cursor: pointer;
  `}
`

export const Icon = styled.div<InputProps>`
  ${({ theme, iconPosition, iconColor }) => css`
    display: flex;
    width: 2.2rem;
    color: ${iconColor ? theme.colors[iconColor] : theme.colors.gray};
    order: ${iconPosition === 'right' ? 1 : 0};

    & > svg {
      width: 100%;
    }
  `}
`
