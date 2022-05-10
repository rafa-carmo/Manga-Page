import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.main`
  ${({ theme }) => css`
    background: ${theme.colors.cardBg};
    padding: ${theme.spacings.xlarge};
    display: flex;
    flex-direction: column;
    ${media.lessThan('medium')`
    padding: ${theme.spacings.small} ${theme.spacings.xsmall};
    `}
  `}
`

export const ChapterContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    color: ${theme.colors.lightText};
    justify-content: space-between;
    &:not(last-child) {
      margin-bottom: ${theme.spacings.small};
    }
  `}
`

export const LeftContent = styled.div`
  display: flex;
  align-items: center;
`

export const CheckBox = styled.div`
  ${({ theme }) => css`
    width: 2.2rem;
    height: 2.2rem;
    border: 1px solid ${theme.colors.lightText};
    position: relative;
    cursor: pointer;
    svg {
      width: 4.5rem;
      height: 4.5rem;
      position: absolute;
      top: -1.5rem;
      left: -0.8rem;
      color: ${theme.colors.secondary};
    }
  `}
`

export const Chapter = styled.a`
  ${({ theme }) => css`
    text-decoration: none;
    margin-left: ${theme.spacings.medium};
    color: ${theme.colors.lightText};
    font-size: ${theme.font.sizes.xlarge};
    line-height: ${theme.font.sizes.medium};
    font-weight: ${theme.font.bold};
    ${media.lessThan('medium')`
    margin-left: ${theme.spacings.xsmall};
    font-size: ${theme.font.sizes.small};
    line-height: ${theme.font.sizes.large};
  `}
  `}
`

export const Scan = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.lightText};
    font-size: ${theme.font.sizes.xlarge};
    line-height: ${theme.font.sizes.medium};
    ${media.lessThan('medium')`
    max-width: 13rem;
    font-size: ${theme.font.sizes.small};
    line-height: ${theme.font.sizes.xlarge};
    text-align: end;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  `}
  `}
`

export const RightContainer = styled.div``

export const Date = styled.div`
  ${({ theme }) => css`
    text-align: end;
    color: ${theme.colors.gray};

    ${media.lessThan('medium')`
    font-size: ${theme.font.sizes.xsmall};
    `}
  `}
`
