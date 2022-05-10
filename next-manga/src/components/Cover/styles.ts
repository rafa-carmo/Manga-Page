import styled, { css } from 'styled-components'
import { saturate } from 'polished'

export const Wrapper = styled.main``
export const ButtonsContainer = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 2fr 0.6fr 0.6fr;
    gap: 0 1rem;
    height: 3.5rem;
    margin-top: ${theme.spacings.small};
  `}
`
export const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
`

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
type ButtonProps = {
  backgroundColor: 'red' | 'primary' | 'secondary'
  color: 'red' | 'black'
}
export const Button = styled.div<ButtonProps>`
  ${({ theme, backgroundColor, color }) => css`
    color: ${theme.colors[color!]};
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

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
