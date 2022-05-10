import { useQuery } from '@apollo/client'
import Head from 'next/head'

import { BannerProps } from 'components/Banner'
import CardMangaInfo, { CardMangaInfoProps } from 'components/CardMangaInfo'
import ChaptersList from 'components/ChaptersList'
// import { BottomScrollListener } from 'react-bottom-scroll-listener'

import Cover, { CoverProps } from 'components/Cover'
import MangaInfo, { MangaInfoProps } from 'components/MangaInfo'

import { QUERY_CHAPTERS_BY_ID } from 'graphql/queries/mangas'

import Base from 'templates/Base'
import { ChapterMapper } from 'utils/mappers'
import * as S from './styles'
import Loading from 'templates/Loading'
import {
  QueryChaptersById,
  QueryChaptersByIdVariables
} from 'graphql/generated/QueryChaptersById'

export type MangaTemplateProps = {
  banner: BannerProps
  cover: CoverProps
  mangaInfo: MangaInfoProps
  cardMangaInfo: CardMangaInfoProps
  slug: string
}

const Manga = ({
  banner,
  cover,
  mangaInfo,
  cardMangaInfo,
  slug
}: MangaTemplateProps) => {
  const { data, loading } = useQuery<
    QueryChaptersById,
    QueryChaptersByIdVariables
  >(QUERY_CHAPTERS_BY_ID, {
    notifyOnNetworkStatusChange: true,
    variables: {
      id: parseInt(cover.id)
    },
    fetchPolicy: 'no-cache'
  })

  // if (!data) return <Loading />

  // const onBottomShowMore = () => {
  //   fetchMore({
  //     variables: {
  //       start: data?.chaptersInfo.length,
  //       sort: 'chapter:asc'
  //     }
  //   })
  // }

  return (
    <Base>
      <Head>
        <title>{mangaInfo.title} - Manga</title>

        <meta name="description" content={`Sinopse: ${mangaInfo.sinopse}`} />
        <meta
          name="keywords"
          content={`manga, manga online, ${mangaInfo.title}`}
        />
      </Head>
      <S.Banner src={banner.img} area-label={banner.title} />

      <S.Main>
        <S.SectionCover>
          <Cover
            {...cover}
            chaptersInfoIds={
              data?.chaptersInfo
                ? data.chaptersInfo?.map((chapter) => chapter!.id)
                : []
            }
          />
          <S.MangaInfo>
            <MangaInfo {...mangaInfo} />
          </S.MangaInfo>
        </S.SectionCover>

        <S.SectionChapters>
          <div>
            <CardMangaInfo
              {...cardMangaInfo}
              chapters={
                data?.chaptersInfo ? `${data?.chaptersInfo?.length}` : '00'
              }
            />
          </div>
          {!!data?.chaptersInfo && (
            <div>
              <ChaptersList
                loading={loading}
                items={ChapterMapper(data?.chaptersInfo)}
                slug={slug}
              />
              {/* {hasMore && (
                <BottomScrollListener onBottom={onBottomShowMore}>
                  <div></div>
                </BottomScrollListener>
              )} */}
            </div>
          )}
        </S.SectionChapters>
      </S.Main>
    </Base>
  )
}

export default Manga
