import * as S from './styles'
import { CheckmarkOutline as CheckIcon } from '@styled-icons/evaicons-outline/CheckmarkOutline'
import { useSession } from "next-auth/react"
import FavoriteButton from 'components/FavoriteButton'
import { useReader } from 'hooks/use-reader'
import WishlistButton from 'components/WishlistButton'
import Spinner from 'components/Spinner'
import { useState } from 'react'
// import Image from 'next/image'
export type CoverProps = {
  id: string
  img: string
  title: string
  favorite: boolean
  chaptersInfoIds?: string[]
}

const Cover = ({ id, img, title, chaptersInfoIds }: CoverProps) => {
  const { data: session } = useSession()

  const { addToReader, removeFromReader, isAllRead, loading } = useReader()
  const handleReader = () => {
    isAllRead(chaptersInfoIds!)
      ? removeFromReader(chaptersInfoIds!)
      : addToReader(chaptersInfoIds!)
  }
  return (
    <S.Wrapper>
      <S.ImageWrapper>
        {/* <Image
          src={img}
          aria-label={title}
          layout="responsive"
          width={150}
          height={200}
        /> */}
        <S.Image src={img} aria-label={title} />
      </S.ImageWrapper>

      {session && (
        <>
        <S.ButtonsContainer>
          <WishlistButton id={id} />
          {loading ? (
            <Spinner />
          ) : (
            <S.Button
              onClick={handleReader}
              role="button"
              backgroundColor="secondary"
              color={isAllRead(chaptersInfoIds!) ? 'red' : 'black'}
            >
              <CheckIcon />
            </S.Button>
          )}
          <FavoriteButton id={id} />
        </S.ButtonsContainer>
        <div className="w-full bg-lime-800 text-zinc-200" >
          Recomendar
        </div>
          </>
      )}
    </S.Wrapper>
  )
}

export default Cover
