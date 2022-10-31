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
import { useEffect, useState } from 'react';
import {
  QueryChaptersById,
  QueryChaptersByIdVariables
} from 'graphql/generated/QueryChaptersById'
import Image from 'next/image'

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

  const [data, setData] = useState<QueryChaptersById | null>(null)
  
  useEffect(() => {
    fetch(`/api/chapters?id=${cover.id}`)
      .then((res) => res.json())
      .then(data => setData(data))
    return
  }, [cover.id])

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
      <S.Banner>
          <Image
          src={banner.img} 
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL={banner.img} 
           />
          </S.Banner>
      {/* <S.Banner src={banner.img} area-label={banner.title} /> */}

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
      
            <CardMangaInfo
              {...cardMangaInfo}
              chapters={
                data?.chaptersInfo ? `${data?.chaptersInfo?.length}` : '00'
              }
            />

          {!!data?.chaptersInfo && (
            <div>
              {
              data ? (
                <ChaptersList
                loading={!data}
                items={ChapterMapper(data?.chaptersInfo)}
                slug={slug}
                />
                ) 
                : <Loading />
                }

            </div>
          )}
        </S.SectionChapters>
      </S.Main>
    </Base>
  )
}

export default Manga
