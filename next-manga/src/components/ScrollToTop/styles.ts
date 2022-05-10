import styled, { css } from 'styled-components'
import media from 'styled-media-query'

type WrapperProps = {
  isVisible: boolean
}
export const Wrapper = styled.a<WrapperProps>`
  ${({ theme, isVisible }) => css`
    width: 3rem;
    height: 3rem;
    position: fixed;
    bottom: 2rem;
    right: 5rem;
    z-index: 10;
    opacity: 0.5;
    transition: opacity 0.5s;
    color: black;
    cursor: default;
    color: ${theme.colors.secondary};
    ${!isVisible && 'display:none; opacity: 0'}
  `}
  ${media.lessThan('medium')`
  bottom: 1rem;
    right: 2rem;
  `}
  &:hover {
    opacity: 0.9;
  }
`
