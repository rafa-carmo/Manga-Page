import styled, { css } from 'styled-components'

type WrapperProps = {
  image: string
}

export const Wrapper = styled.main<WrapperProps>`
  ${({ theme, image }) => css`
    margin: ${theme.spacings.medium};
    padding: ${theme.spacings.medium};
    background: url(${image});
    position: relative;
    background-size: cover;
    background-position: center center;
    &:after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      background: ${theme.colors.white};
      opacity: 0.95;
      z-index: 0;
    }
  `}
`
export const Heading = styled.div`
  ${({ theme }) => css`
    position: relative;
    z-index: ${theme.layers.base};
    margin-bottom: ${theme.spacings.xxlarge};
  `}
`
export const Form = styled.form`
  ${({ theme }) => css`
    position: relative;
    z-index: ${theme.layers.base};
  `}
`
export const InputContainer = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: ${theme.spacings.medium};
  `}
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`
