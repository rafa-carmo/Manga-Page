import { setLightness } from 'polished'
import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    ${media.lessThan('medium')`
    display: none;
  `}
    position: relative;
    z-index: ${theme.layers.menu};
  `}
`
export const SearchBars = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const ButtonContainer = styled.div`
  ${({ theme }) => css`
    display: flex;

    margin: ${theme.spacings.xsmall} 0;
  `}
`

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 24rem;
  overflow: auto;
  max-height: 40rem;
`

export const Item = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    cursor: default;

    color: ${theme.colors.black};
    padding: ${theme.spacings.xsmall} ${theme.spacings.small};
    border-bottom: 0.1rem solid ${theme.colors.lightGray};
    transition: background ${theme.transition.default};
    &:hover {
      background: ${theme.colors.primary};
    }
    span {
      padding-left: ${theme.spacings.xxsmall};
    }
  `}
`

export const ValuesContainer = styled.div`
  ${({ theme }) => css`
    width: 100%;
    color: ${theme.colors.black};
    font-family: ${theme.font.family};
    font-size: ${theme.font.sizes.medium};
    padding: ${theme.spacings.xxsmall} 0;
    margin-right: ${theme.spacings.medium};
    display: flex;
    align-items: flex-end;
  `}
`
export const Label = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.lightText};
    font-family: ${theme.font.family};
    font-size: ${theme.font.sizes.medium};
  `}
`

export const BoxValue = styled.div`
  ${({ theme }) => css`
    width: 23rem;
    height: 4rem;
    background: ${setLightness(0.7, theme.colors.lightGray)};
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    border-radius: 0.5rem 0 0 0.5rem;
    border: 0.1rem solid;
    border-color: ${theme.colors.lightGray};
    box-shadow: 5px 5px 35px -7px rgba(255, 255, 255, 0.77);
    height: 3.5rem;
    margin: ${theme.spacings.xsmall} 0;

    ::-webkit-scrollbar {
      width: 1rem;
      height: 1rem;
    }
    ::-webkit-scrollbar-thumb {
      background: #dbdbdb;
      border-radius: 1rem;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #b5b3b3;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
      border: 4px solid transparent;
      border-radius: 13px;
      box-shadow: inset 3px 3px 26px 0px #e6e6e6;
    }
  `}
`
export const Value = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.primary};
    color: ${theme.colors.lightText};
    padding: 0 0.8rem;
    height: 2.5rem;
    margin: 0.4rem 0;
    border-radius: 1rem;

    &:not(last-child) {
      margin-left: 0.5rem;
    }
    > svg {
      margin-left: 0.5rem;
    }
  `}
`
export const BoxIcon = styled.div`
  ${({ theme }) => css`
    width: 2rem;
    height: 3.5rem;
    color: ${theme.colors.gray};
    display: flex;
    background: ${theme.colors.lightGray};
    align-items: center;
    margin: ${theme.spacings.xsmall} 0;
  `}
`

export const Checkbox = styled.input`
  width: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
`

export const SearchItem = styled.div`
  width: 100%;
`
