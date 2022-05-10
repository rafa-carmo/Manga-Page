import { FavoriteBorder, Favorite } from '@styled-icons/material-outlined'
import Spinner from 'components/Spinner'
import { useFavorite } from 'hooks/use-favorite'
import * as S from './styles'

export type FavoriteButtonProps = {
  id: string
}

const FavoriteButton = ({ id }: FavoriteButtonProps) => {
  const { isFavorite, addToFavorite, removeFromFavorite, loading } =
    useFavorite()
  const handleClick = () => {
    isFavorite(id) ? removeFromFavorite(id) : addToFavorite(id)
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <S.Button backgroundColor="red" onClick={handleClick} role="button">
          {isFavorite(id) ? (
            <Favorite aria-label="Remove from wishlist" />
          ) : (
            <FavoriteBorder aria-label="Add to Wishlist" />
          )}
        </S.Button>
      )}
    </>
  )
}

export default FavoriteButton
