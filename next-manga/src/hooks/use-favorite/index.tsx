import { useQueryFavorite } from 'graphql/queries/favorite'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useSession } from "next-auth/react"
import { MangaCardProps } from '../../components/MangaCard/index'
import { MangaCardMapper } from '../../utils/mappers'
import { QueryFavorite_favorites_mangases } from 'graphql/generated/QueryFavorite'
import { useMutation } from '@apollo/client'
import { MUTATION_CREATE_FAVORITE } from 'graphql/mutations/favorite'
import { MUTATION_UPDATE_FAVORITE } from '../../graphql/mutations/favorite'

export type FavoriteContextData = {
  items: MangaCardProps[]
  isFavorite: (id: string) => boolean
  addToFavorite: (id: string) => void
  removeFromFavorite: (id: string) => void
  loading: boolean
}

export const FavoriteContextDefaultValue = {
  items: [],
  isFavorite: () => false,
  addToFavorite: () => null,
  removeFromFavorite: () => null,
  loading: false
}

export const FavoriteContext = createContext<FavoriteContextData>(
  FavoriteContextDefaultValue
)

export type FavoriteProviderProps = {
  children: React.ReactNode
}

const FavoriteProvider = ({ children }: FavoriteProviderProps) => {
  const { data: session } = useSession()

  const [favoriteListId, setFavoriteListId] = useState<string | null>()
  const [favoriteItems, setFavoriteItems] = useState<
    QueryFavorite_favorites_mangases[]
  >([])

  const [createFavorite, { loading: loadingCreate }] = useMutation(
    MUTATION_CREATE_FAVORITE,
    {
      context: { session },
      onCompleted: (data) => {
        setFavoriteItems(data?.createFavorite?.favorite.mangases || [])
        setFavoriteListId(data?.createFavorite?.favorite.id)
      }
    }
  )

  const [updateFavorite, { loading: loadingUpdate }] = useMutation(
    MUTATION_UPDATE_FAVORITE,
    {
      context: { session },
      onCompleted: (data) => {
        setFavoriteItems(data?.updateFavorite?.favorite.mangases || [])
      }
    }
  )

  const { data, loading: loadingQuery } = useQueryFavorite({
    skip: !session?.email,
    context: { session },
    variables: {
      identifier: session?.email as string
    }
  })

  useEffect(() => {
    setFavoriteItems(data?.favorites[0]?.mangases || [])
    setFavoriteListId(data?.favorites[0]?.id)
  }, [data])

  const favoriteIds = useMemo(
    () => favoriteItems.map((favorite) => favorite.id),
    [favoriteItems]
  )

  const isFavorite = (id: string) =>
    !!favoriteItems.find((manga) => manga.id === id)
  const addToFavorite = (id: string) => {
    if (!favoriteListId) {
      return createFavorite({
        variables: {
          input: {
            data: {
              mangases: [...favoriteIds, id]
            }
          }
        }
      })
    }

    return updateFavorite({
      variables: {
        input: {
          where: {
            id: favoriteListId
          },
          data: {
            mangases: [...favoriteIds, id]
          }
        }
      }
    })
  }
  const removeFromFavorite = (id: string) => {
    return updateFavorite({
      variables: {
        input: {
          where: {
            id: favoriteListId
          },
          data: {
            mangases: favoriteIds.filter(
              (favoriteId: string) => favoriteId !== id
            )
          }
        }
      }
    })
  }

  return (
    <FavoriteContext.Provider
      value={{
        items: MangaCardMapper(favoriteItems),
        isFavorite,
        addToFavorite,
        removeFromFavorite,
        loading: loadingQuery || loadingCreate || loadingUpdate
      }}
    >
      {children}
    </FavoriteContext.Provider>
  )
}

const useFavorite = () => useContext(FavoriteContext)

export { FavoriteProvider, useFavorite }
