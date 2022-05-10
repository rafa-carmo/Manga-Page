import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 90rem;
  ${media.lessThan('medium')`
    width: 100%;
  `}
`

export const CoverContainer = styled.div`
  a {
    display: flex;
    align-items: center;
    padding-left: 1rem;
    text-decoration: none;
  }
`

export const CoverWrapper = styled.div`
  ${({ theme }) => css`
    width: 9rem;
    height: 12rem;
    margin-right: ${theme.spacings.xxsmall};
  `}
`

export const Title = styled.h3`
  ${({ theme }) => css`
    color: ${theme.colors.lightText};
    font-size: ${theme.font.sizes.xlarge};
    line-height: ${theme.font.sizes.medium};
    font-weight: ${theme.font.bold};
    ${media.lessThan('medium')`
    font-size: ${theme.font.sizes.medium};
    line-height: ${theme.font.sizes.large};
  `}
  `}
`

export const ChaptersContainer = styled.div`
  ${({ theme }) => css`
    margin-top: 1.5rem;
    a {
      color: ${theme.colors.lightText};
      text-decoration: none;
    }
  `}
`

export const Chapter = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${theme.colors.lightGray};
    padding-bottom: 0.5rem;
    padding-right: 2rem;
    padding-left: 1rem;
    margin-top: 1.5rem;
    ${media.lessThan('medium')`
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-size: ${theme.font.sizes.xsmall};
    line-height: ${theme.font.sizes.large};
    `}
  `}
`
export const Scan = styled.a`
  text-align: end;
`

export const InfoChapter = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    color: ${theme.colors.gray};
  `}
`
export const RightContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    text-align: end;
    color: ${theme.colors.gray};
    }
  `}
`
