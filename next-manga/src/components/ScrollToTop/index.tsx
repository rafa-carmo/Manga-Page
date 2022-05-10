import * as S from './styles'
import { ChevronTop as TopIcon } from '@styled-icons/open-iconic/ChevronTop'

import { useEffect, useState } from 'react'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const scroll = () => {
      if (window.scrollY >= 200) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    document.addEventListener('scroll', scroll)
    return () => document.removeEventListener('scroll', scroll)
  }, [])

  return (
    <S.Wrapper
      isVisible={isVisible}
      onClick={() => {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      }}
      aria-label="Ir para o Inicio"
    >
      <TopIcon />
    </S.Wrapper>
  )
}

export default ScrollToTop
