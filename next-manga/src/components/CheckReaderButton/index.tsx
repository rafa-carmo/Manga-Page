import * as S from './styles'
import { useReader } from 'hooks/use-reader'
import { Check2Square as Check } from '@styled-icons/bootstrap/Check2Square'
import { Square } from '@styled-icons/bootstrap/Square'

export type CheckReaderButtonProps = {
  id: string
}

const CheckReaderButton = ({ id }: CheckReaderButtonProps) => {
  const { isRead, addToReader, removeFromReader } = useReader()
  const handleClick = () => {
    isRead(id) ? removeFromReader([id]) : addToReader([id])
  }
  return (
    <>
      {isRead(id) ? (
        <S.CheckBox aria-label="Lido" onClick={handleClick} role="button">
          <Check />
        </S.CheckBox>
      ) : (
        <S.CheckBox aria-label="Não Lido" onClick={handleClick} role="button">
          <Square />
        </S.CheckBox>
      )}
    </>
  )
}

export default CheckReaderButton
