import { Container } from 'components/Container'
import * as S from './styles'
import NewsBanner from 'components/NewsBanner'
import { Divider } from 'components/Divider'
import MangaReleasedList from 'components/MangaReleasedList'
import Heading from 'components/Heading'
import BannerSlider from 'components/BannerSlider'
import TopCardList from 'components/TopCardList'
import MediaMatch from 'components/MediaMatch'
import { KeyboardArrowDown as ArrowDown } from '@styled-icons/material-outlined'

import Base from 'templates/Base'
import { BannerProps } from 'components/Banner/index'
import { MangaCardProps } from 'components/MangaCard'
import { TopCardProps } from 'components/TopCard'
import { useQuery } from '@apollo/client'
import { QUERY_RELEASE_CHAPTERS } from 'graphql/queries/home'

import { MangaReleased } from 'utils/mappers'

import Spinner from 'components/Spinner'
import { useEffect, useState } from 'react';
import { QueryReleasedChapters_chapters } from '../../graphql/generated/QueryReleasedChapters';

export type HomeProps = {
  banners: BannerProps[]
  newsBanners: MangaCardProps[]
  ranks: TopCardProps[]
}

const Home = ({ banners, newsBanners, ranks }: HomeProps) => {
  const [data, setData] = useState<QueryReleasedChapters_chapters[]>([])
  const [loading, setLoading] = useState(false)
  // const { data, loading, fetchMore } = useQuery<
  //   QueryReleasedChapters,
  //   QueryReleasedChaptersVariables
  // >(QUERY_RELEASE_CHAPTERS, {
  //   notifyOnNetworkStatusChange: true,
  //   variables: { limit: 20, start: 0 },
  //   fetchPolicy: 'network-only'
  // })

  useEffect(() => {
    setLoading(true)
    fetch('/api/home')
      .then((res) => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
    return
  }, [])

  const handleShowMore = async () => {
    setLoading(true)
    const response = await (await fetch(`/api/home?start=${data?.length}&limit=20`)).json()
    setData((data) => [...data, ...response])
    setLoading(false)
  }

  return (
    <Base>
      <BannerSlider items={banners} />

      <Divider />
      <Container>
        <NewsBanner items={newsBanners} heading="Ultimos Adicionados" />
      </Container>
      <Divider />
      <Container>
        <MediaMatch lessThan="medium">
          <NewsBanner items={ranks} heading="Ranking Anilist" />
        </MediaMatch>
      </Container>
      <Divider />
      <Container>
        <S.Content>
          <S.MangaContainer>
            <Heading lineLeft lineColor="primary">
              Lançamentos
            </Heading>

            <MangaReleasedList items={MangaReleased(data)} />

            <S.ShowMore>
              {loading ? (
                <Spinner />
              ) : (
                <S.ShowMoreButton role="button" onClick={handleShowMore}>
                  <p>Carregar Mais</p>
                  <ArrowDown size={35} />
                </S.ShowMoreButton>
              )}
            </S.ShowMore>
          </S.MangaContainer>
          <MediaMatch greaterThan="medium">
            <S.RatingContainer>
              <Heading lineLeft lineColor="primary">
                Ranking Anilist
              </Heading>
              <Divider space="xxsmall" hidden />
              <TopCardList items={ranks} />
            </S.RatingContainer>
          </MediaMatch>
        </S.Content>
      </Container>
    </Base>
  )
}

export default Home
