import * as S from './styles'
import { useWishlist } from 'hooks/use-wish'

export type WishlistButtonProps = {
  id: string
}

const WishlistButton = ({ id }: WishlistButtonProps) => {
  const { inWishlist, addInWishlist, removeFromWishlist } = useWishlist()

  const handleClick = () => {
    inWishlist(id) ? removeFromWishlist(id) : addInWishlist(id)
  }

  return (
    <S.ListButton onClick={handleClick} role="button">
      {inWishlist(id) ? 'Remover da lista' : 'Adicionar a lista'}
    </S.ListButton>
  )
}

export default WishlistButton
