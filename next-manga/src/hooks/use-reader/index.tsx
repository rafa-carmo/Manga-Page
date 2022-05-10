import { createContext, useContext, useEffect, useState } from 'react'

import { useSession } from 'next-auth/client'
import { useQueryReader } from 'graphql/queries/reader'
import { ReaderListMapper } from 'utils/mappers'
import { useMutation } from '@apollo/client'
import {
  MUTATION_CREATE_READER,
  MUTATION_UPDATE_READER
} from 'graphql/mutations/reader'

export type ReaderContextProps = {
  items: string[]
  isRead: (id: string) => boolean
  isAllRead: (id: string[]) => boolean
  addToReader: (id: string[]) => void
  removeFromReader: (id: string[]) => void
  loading: boolean
}

export const ReaderContextDefaultValue = {
  items: [],
  isRead: () => false,
  isAllRead: () => false,
  addToReader: () => null,
  removeFromReader: () => null,
  loading: false
}

export const ReaderContext = createContext<ReaderContextProps>(
  ReaderContextDefaultValue
)

export type ReaderProviderProps = {
  children: React.ReactNode
}

const ReaderProvider = ({ children }: ReaderProviderProps) => {
  const [session] = useSession()

  const [readersIds, setReadersIds] = useState<string[]>([])
  const [readerListId, setReaderListId] = useState<string | null>()

  const { data, loading: loadingQuery } = useQueryReader({
    skip: !session?.user?.email,
    context: { session },
    variables: {
      identifier: session?.user?.email as string
    }
  })

  useEffect(() => {
    setReadersIds(ReaderListMapper(data?.readers))
    setReaderListId(data?.readers[0]?.id)
  }, [data])

  const [createReader, { loading: loadingCreate }] = useMutation(
    MUTATION_CREATE_READER,
    {
      context: { session },
      onCompleted: (data) => {
        setReadersIds(data?.createReader.reader.readers.chapters)
        setReaderListId(data?.createReader.id)
      }
    }
  )

  const [updateReader, { loading: loadingUpdate }] = useMutation(
    MUTATION_UPDATE_READER,
    {
      context: { session },
      onCompleted: (data) => {
        setReadersIds(data?.updateReader.reader.readers.chapters)
      }
    }
  )
  const addToReader = (id: string[]) => {
    if (!readerListId) {
      return createReader({
        variables: {
          input: {
            data: {
              readers: { chapters: [...id] }
            }
          }
        }
      })
    }

    return updateReader({
      variables: {
        input: {
          where: {
            id: readerListId
          },
          data: {
            readers: { chapters: [...readersIds, ...id] }
          }
        }
      }
    })
  }
  const removeFromReader = (id: string[]) => {
    const removeIds = new Set(id)
    return updateReader({
      variables: {
        input: {
          where: {
            id: readerListId
          },
          data: {
            readers: {
              chapters: readersIds.filter(
                (readerId: string) => !removeIds.has(readerId)
              )
            }
          }
        }
      }
    })
  }
  const isRead = (id: string) => !!readersIds.find((chapter) => chapter === id)

  const isAllRead = (id: string[]) => {
    return readersIds.some((readerId) => id.includes(readerId))
  }
  return (
    <ReaderContext.Provider
      value={{
        items: readersIds,
        isRead,
        isAllRead,
        addToReader,
        removeFromReader,
        loading: loadingQuery || loadingCreate || loadingUpdate
      }}
    >
      {children}
    </ReaderContext.Provider>
  )
}

const useReader = () => useContext(ReaderContext)

export { ReaderProvider, useReader }
