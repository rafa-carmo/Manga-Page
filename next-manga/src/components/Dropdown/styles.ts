import styled, { css } from 'styled-components'
import { DropdownProps } from '.'

type TitleProps = Pick<DropdownProps, 'padding'>

const TitleModifiers = {
  none: () => css`
    padding-right: 0;
  `,
  small: () => css`
    padding-right: 1.4rem;
  `,
  medium: () => css`
    padding-right: 2.4rem;
  `
}

export const Title = styled.div<TitleProps>`
  ${({ theme, padding }) => css`
    cursor: pointer;
    color: ${theme.colors.lightText};
    position: relative;
    display: flex;
    align-items: center;
    ${TitleModifiers[padding!]}
  `}
`

type ContentProps = Pick<DropdownProps, 'right' | 'margin'>

export const Content = styled.div<ContentProps>`
  ${({ theme, right, margin }) => css`
    display: flex;
    flex-direction: column;
    background: ${theme.colors.lightBg};
    color: ${theme.colors.lightText};
    margin-top: ${theme.spacings[margin!]};
    position: absolute;
    ${right && 'right: 0'};

    &::before {
      content: ' ';
      position: absolute;
      border-right: 1.2rem solid transparent;
      border-left: 1.2rem solid transparent;
      border-bottom: 1.2rem solid ${theme.colors.lightBg};
      top: -1.2rem;
      right: 2.4rem;
    }
  `}
`

const WrapperModifiers = {
  open: () => css`
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  `,
  close: () => css`
    opacity: 0;
    pointer-events: none;
    transform: translateY(-2rem);
  `
}

type WrapperProps = {
  isOpen: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, isOpen }) => css`
    position: relative;
    width: max-content;

    ${Content} {
      transition: transform 0.2s ease-in, opacity ${theme.transition.default};
      ${isOpen ? WrapperModifiers.open() : WrapperModifiers.close()}
    }
  `}
`
