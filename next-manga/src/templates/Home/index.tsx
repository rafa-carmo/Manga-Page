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
import {
  QueryReleasedChapters,
  QueryReleasedChaptersVariables
} from '../../graphql/generated/QueryReleasedChapters'

export type HomeProps = {
  banners: BannerProps[]
  newsBanners: MangaCardProps[]
  ranks: TopCardProps[]
}

const Home = ({ banners, newsBanners, ranks }: HomeProps) => {
  const { data, loading, fetchMore } = useQuery<
    QueryReleasedChapters,
    QueryReleasedChaptersVariables
  >(QUERY_RELEASE_CHAPTERS, {
    notifyOnNetworkStatusChange: true,
    variables: { limit: 20, start: 0 },
    fetchPolicy: 'network-only'
  })

  const handleShowMore = () => {
    fetchMore({ variables: { limit: 20, start: data?.chapters.length } })
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

            <MangaReleasedList items={MangaReleased(data?.chapters)} />

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
