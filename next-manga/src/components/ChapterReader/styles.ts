import styled, { css } from 'styled-components'
import { ChapterReaderProps } from './index'
import media from 'styled-media-query'

export const pageModifiers = {
  vertical: () => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 60%;
    max-width: 90%;

    img {
      ${media.lessThan('medium')`
      width: 98%;
      `}
    }
  `,
  horizontal: () => css`
    align-items: center;
    justify-content: center;
    min-width: 60%;
    max-width: 85%;
    img {
      ${media.lessThan('medium')`
      width: 98%;
      `}
    }

    div {
      &.slick-active {
        display: flex !important;
        justify-content: center !important;
      }
      &.slick-slide {
        display: flex !important;
        justify-content: center !important;
      }
    }
  `
}

export const Wrapper = styled.main`
  min-width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const ChapterInfoContainer = styled.div`
  ${({ theme }) => css`
    width: 50%;
    display: flex;
    justify-content: space-between;
    padding: 2rem 0;
    ${media.lessThan('medium')`
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 98%;
    margin-bottom: ${theme.spacings.medium};
    `}
  `}
`

export const Chapter = styled.h4`
  ${({ theme }) => css`
    color: ${theme.colors.lightText};
  `}
`
export const ChaptersList = styled.h4`
  ${({ theme }) => css`
    color: ${theme.colors.lightText};
  `}
`

export const PageController = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.lightText};
  `}
`

export const ReaderModeColtroller = styled.div``

type PageProps = Pick<ChapterReaderProps, 'readerMode'>

export const PagesContent = styled.div<PageProps>`
  ${({ readerMode }) => css`
    ${pageModifiers[readerMode!]}
  `}
`

export const Page = styled.img`
  min-width: 80%;
  max-width: 90vw;
`

export const Select = styled.select`
  padding: 0.5rem;
  border-radius: 0.5rem;
`
