import { Grid } from 'components/Grid'
import MangaCard, { MangaCardProps } from 'components/MangaCard'
import * as S from './styles'
import { useEffect, useState } from 'react'

export type GridMangaProps = {
  items: MangaCardProps[]
}

const GridManga = ({ items }: GridMangaProps) => {
  const [radical, setRadical] = useState(0)
  useEffect(() => {
    if (window.innerWidth <= 1920) {
      const value = parseInt(`${window.innerWidth / 200}`) - 2
      setRadical(value)
    }
  }, [])
  return (
    <S.GridContainer>
      <Grid>
        {items.map((item, index) => {
          let value: 'left' | 'right' = 'left'
          if (radical !== 0) {
            const testDirection = (index + 1) / radical
            if (!testDirection.toString().includes('.')) {
              value = 'right'
            }
          }

          return (
            <MangaCard
              key={`grid-${item.title}-${index}`}
              direction={value}
              haveTooltip
              {...item}
            />
          )
        })}
      </Grid>
    </S.GridContainer>
  )
}

export default GridManga
