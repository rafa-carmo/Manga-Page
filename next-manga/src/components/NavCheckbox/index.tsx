import Checkbox from 'components/Checkbox'
import * as S from './styles'
import { useRef } from 'react'

type NavCheckboxProps = {
  name: string
  label: string
  value: string
  onSelect: (string?: string) => void
}

const NavCheckbox = ({ name, label, value, onSelect }: NavCheckboxProps) => {
  const ref = useRef<HTMLInputElement>(null)

  return (
    <S.Item onClick={() => ref.current?.click()}>
      <Checkbox
        labelFor={name}
        label={label}
        value={name}
        labelColor="black"
        ref={ref}
        onClick={() => onSelect(value)}
      />
    </S.Item>
  )
}

export default NavCheckbox
