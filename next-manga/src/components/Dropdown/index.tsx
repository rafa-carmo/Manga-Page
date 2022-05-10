import * as S from './styles'
import { useState } from 'react'

export type DropdownProps = {
  title: React.ReactNode
  children: React.ReactNode
  padding?: 'none' | 'small' | 'medium'
  right?: boolean
  margin?: 'xxsmall' | 'xsmall' | 'small'
  isOpenExternal?: boolean
}

const Dropdown = ({
  title,
  children,
  padding = 'medium',
  right = true,
  margin = 'small',
  isOpenExternal
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(!isOpen)
    return
  }

  return (
    <S.Wrapper isOpen={isOpenExternal != undefined ? isOpenExternal : isOpen}>
      <S.Title padding={padding} onClick={() => handleOpen()}>
        {title}
      </S.Title>
      <S.Content
        margin={margin}
        right={right}
        aria-hidden={isOpenExternal != undefined ? !isOpenExternal : !isOpen}
      >
        {children}
      </S.Content>
    </S.Wrapper>
  )
}

export default Dropdown
