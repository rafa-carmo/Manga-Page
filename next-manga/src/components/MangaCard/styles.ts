import styled, { css } from 'styled-components'

import { Description as DescriptionTooltipStyle } from 'components/MangaCardTooltip/styles'
import media from 'styled-media-query'

export const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  a {
    text-decoration: none;
  }
`
export const TooltipContainer = styled.div`
  position: relative;
`

export const ImageBox = styled.div`
  width: 19rem;
  height: 25rem;
  ${media.lessThan('medium')`
    width: 15rem;
    height: 19rem;
  `}
  position: relative;

  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  animation: placeholderShimmer 1s linear infinite forwards;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.2rem;
    box-shadow: 0 1rem 1.5rem 0 rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  &:hover {
    ${DescriptionTooltipStyle} {
      opacity: 1;
      pointer-events: all;
    }
    @keyframes placeholderShimmer {
      0% {
        background-position: -40rem 0;
      }
      100% {
        background-position: 40rem 0;
      }
    }
  }
`

export const Title = styled.h3`
  ${({ theme }) => css`
    width: 19rem;
    ${media.lessThan('medium')`
    width: 15rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

  `}
    color: ${theme.colors.lightText};
    font-size: ${theme.font.sizes.small};
    line-height: ${theme.font.sizes.medium};
    font-weight: ${theme.font.bold};
    padding: 0.1rem 0.5rem;
    cursor: pointer;
    text-align: justify;
    text-justify: inter-word;
  `}
`

export const Update = styled.div`
  ${({ theme }) => css`
    position: absolute;
    top: 0;
    width: 100%;
    left: 0;
    background: ${theme.colors.secondary};
    padding: 0.5rem 1rem;
    font-size: ${theme.font.sizes.small};
    line-height: ${theme.font.sizes.medium};
    font-weight: ${theme.font.bold};
    border-radius: 0.5rem 0.5rem 0 0;
    text-align: center;
    color: ${theme.colors.black};
  `}
`

export const Status = styled.h4``
