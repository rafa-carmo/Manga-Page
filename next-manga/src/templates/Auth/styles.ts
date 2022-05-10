import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  height: 100vh;
  ${media.greaterThan('medium')`
  grid-template-columns: 2fr 1fr;
  `}
`

export const RightContainer = styled.div`
  background: gray;
`

export const BannerBlock = styled.div`
  ${({ theme }) => css`
    position: relative;
    background-image: url('images/bk.jpg');
    background-size: cover;
    background-position: center center;
    padding: ${theme.spacings.xxlarge} ${theme.spacings.xxlarge}
      ${theme.spacings.large};
    text-align: center;
    &:after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      background: ${theme.colors.black};
      opacity: 0.85;
    }
    ${media.lessThan('medium')`
      display: none;
    `}
  `}
`

export const BannerContent = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    display: grid;
    grid-template-columns: 1fr;
    justify-content: space-between;
    height: 100%;
    position: relative;
    z-index: ${theme.layers.base};
    a {
      width: fit-content;
      height: fit-content;
    }
  `}
`

export const LeftContainer = styled.div`
  background: white;
  height: 100vh;
  width: 100%;
  content: ' ';
`

export const SubTitle = styled.h3`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xxlarge};
    font-weight: ${theme.font.light};
    margin-top: ${theme.spacings.xxsmall};

    strong {
      color: ${theme.colors.primary};
    }
  `}
`

export const Footer = styled.p`
  ${({ theme }) => css`
    align-self: end;
    text-align: center;
    font-size: ${theme.font.sizes.xsmall};
  `}
`

export const Content = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.lightGray};
    display: grid;
    align-items: center;
    justify-content: center;
  `}
`

export const ContetWrapper = styled.div`
  width: 30rem;
  ${media.greaterThan('medium')`
      width: 36rem;
    `}
`

export const logoWrapper = styled.a`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5rem;
`
