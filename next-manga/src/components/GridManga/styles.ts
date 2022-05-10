import styled from 'styled-components'
import media from 'styled-media-query'

export const GridContainer = styled.div`
  ${media.lessThan('medium')`
    width: 100%;
    display:flex;
    flex-direction: column;
    align-items:center;

  `}
`
