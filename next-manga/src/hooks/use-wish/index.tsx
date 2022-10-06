import { MangaCardProps } from 'components/MangaCard'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useSession } from "next-auth/react"
import { useQueryWishlist } from '../../graphql/queries/wishlist'
import { MangaCardMapper } from '../../utils/mappers'
import { QueryWishlist_wishlists_mangases } from 'graphql/generated/QueryWishlist'
import { useMutation } from '@apollo/client'
import {
  QUERY_CREATE_WISHLIST,
  QUERY_UPDATE_WISHLIST
} from 'graphql/mutations/wishlist'

export type WishlistProps = {
  items: MangaCardProps[]
  inWishlist: (id: string) => boolean
  addInWishlist: (id: string) => void
  removeFromWishlist: (id: string) => void
  loading: boolean
}

export const WishlistDefaultProps = {
  items: [],
  inWishlist: () => false,
  addInWishlist: () => null,
  removeFromWishlist: () => null,
  loading: false
}

export const WishlistContext =
  createContext<WishlistProps>(WishlistDefaultProps)

export type WishlistProviderProps = {
  children: React.ReactNode
}

const WishlistProvider = ({ children }: WishlistProviderProps) => {
  const { data: session } = useSession()

  const [wishlistItems, setWishlistItems] = useState<
    QueryWishlist_wishlists_mangases[]
  >([])
  const [wishlistId, setWishlistId] = useState<string | null>()

  const { data, loading: loadingQuery } = useQueryWishlist({
    skip: !session?.user?.email,
    context: { session },
    variables: {
      identifier: session?.user?.email as string
    }
  })

  const [createWishlist, { loading: loadingCreate }] = useMutation(
    QUERY_CREATE_WISHLIST,
    {
      context: { session },
      onCompleted: (data) => {
        setWishlistItems(data?.createWishlist?.wishlist.mangases || [])
        setWishlistId(data?.createWishlist?.wishlist.id)
      }
    }
  )

  const [updateWishlist, { loading: loadingUpdate }] = useMutation(
    QUERY_UPDATE_WISHLIST,
    {
      context: { session },
      onCompleted: (data) => {
        setWishlistItems(data?.updateWishlist?.wishlist.mangases || [])
      }
    }
  )

  const addInWishlist = (id: string) => {
    if (!wishlistId) {
      return createWishlist({
        variables: {
          input: {
            data: {
              mangases: [...wishlistIds, id]
            }
          }
        }
      })
    }
    return updateWishlist({
      variables: {
        input: {
          where: {
            id: wishlistId
          },
          data: {
            mangases: [...wishlistIds, id]
          }
        }
      }
    })
  }

  const removeFromWishlist = (id: string) => {
    return updateWishlist({
      variables: {
        input: {
          where: {
            id: wishlistId
          },
          data: {
            mangases: wishlistIds.filter(
              (wishlistId: string) => wishlistId !== id
            )
          }
        }
      }
    })
  }

  useEffect(() => {
    setWishlistItems(data?.wishlists[0]?.mangases || [])
    setWishlistId(data?.wishlists[0]?.id)
  }, [data])

  const wishlistIds = useMemo(
    () => wishlistItems.map((wish) => wish.id),
    [wishlistItems]
  )

  const inWishlist = (id: string) =>
    !!wishlistItems.find((wish) => wish.id === id)

  return (
    <WishlistContext.Provider
      value={{
        items: MangaCardMapper(wishlistItems),
        inWishlist,
        addInWishlist,
        removeFromWishlist,
        loading: loadingQuery || loadingCreate || loadingUpdate
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

const useWishlist = () => useContext(WishlistContext)

export { WishlistProvider, useWishlist }
