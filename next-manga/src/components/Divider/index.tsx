import styled, { css } from 'styled-components'
import media from 'styled-media-query'

type DividerProps = {
  hidden?: boolean
  space?: 'xxsmall' | 'medium' | 'large'
}

export const Divider = styled.hr<DividerProps>`
  ${({ theme, hidden, space = 'large' }) => css`
    content: ' ';
    margin: ${theme.spacings.xxlarge} auto ${theme.spacings.medium};
    display: block;
    height: 0.2rem;
    background: ${!hidden
      ? 'rgba(181, 181, 181, 0.3)'
      : 'rgba(181, 181, 181, 0)'};

    border: 0;
    ${media.greaterThan('medium')`
      margin: calc(${
        space != 'xxsmall'
          ? theme.spacings[space] + '* 2.5'
          : theme.spacings[space]
      } ) auto ${space != 'xxsmall' && theme.spacings.xxlarge};
    `}
  `}
`
