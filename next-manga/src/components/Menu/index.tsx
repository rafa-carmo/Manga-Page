import * as S from './styles'
import React, { useState, useContext } from 'react'

import { Menu2 as MenuIcon } from '@styled-icons/remix-fill/Menu2'
import { Close as CloseIcon } from '@styled-icons/material-outlined/Close'

import Logo from 'components/Logo'
import Link from 'next/link'

import MediaMatch from 'components/MediaMatch'
import { Container } from 'components/Container'
import Button from 'components/Button'
import UserDropdown from 'components/UserDropdown'
import { MangaCardProps } from 'components/MangaCard'
import { useRouter } from 'next/router'
import { ModalContext } from 'hooks/add-manga'
import Notification from 'components/Notification';

type MenuProps = {
  username?: string | null
  color?: 'black' | 'white'
  loading?: boolean
  manga?: Pick<MangaCardProps, 'title' | 'slug'>
}
const Menu: React.FC<MenuProps> = ({ username, color, loading, manga }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { asPath } = useRouter()
  const { setIsOpen: setModalIsOpen } = useContext(ModalContext)

  return (
    <S.Wrapper>
      <Container>
        <S.MenuWrapper>
          <MediaMatch lessThan="medium">
            <S.IconWrapper onClick={() => setIsOpen(true)}>
              <MenuIcon aria-label="Open Menu" />
            </S.IconWrapper>
          </MediaMatch>

          <S.LogoWrapper>
            <Logo color={color} />
          </S.LogoWrapper>

          <MediaMatch greaterThan="medium">
            <S.MenuNav>
              <Link href="/" passHref>
                <S.MenuLink>Home</S.MenuLink>
              </Link>
              <Link href="/mangas" passHref>
                <S.MenuLink>Mangas</S.MenuLink>
              </Link>
              {manga && (
                <Link href={`/manga/${manga.slug}`} passHref>
                  <S.MenuLink>
                    {manga.title.length > 20
                      ? `${manga.title.substring(0, 20)}...`
                      : manga.title}
                  </S.MenuLink>
                </Link>
              )}
            </S.MenuNav>
          </MediaMatch>
          <S.MenuGroup>
            {!loading && (
              <>
                {username ? (
                  <>
                  <UserDropdown username={username} />
                  <Notification />
                  </>
                ) : (
                  <MediaMatch greaterThan="medium">
                    <Link href={`/sign-in?callbackUrl=${asPath}`} passHref>
                      <S.MenuLink>Entrar</S.MenuLink>
                    </Link>
                    <Link href="/sign-up" passHref>
                      <Button type="a" size="medium">
                        Cadastre-se
                      </Button>
                    </Link>
                  </MediaMatch>
                )}
              </>
            )}
              <MediaMatch greaterThan="medium">
                <Button type='button' onClick={()=>setModalIsOpen(true)}>
                  Adicionar Manga
                </Button>
              </MediaMatch>
          </S.MenuGroup>

          <S.MenuFull aria-hidden={!isOpen} isOpen={isOpen}>
            <CloseIcon
              aria-label="Close Menu"
              onClick={() => setIsOpen(false)}
            />
            <S.MenuNav>
              <Link href="/" passHref>
                <S.MenuLink>Home</S.MenuLink>
              </Link>
              <Link href="/mangas" passHref>
                <S.MenuLink>Mangas</S.MenuLink>
              </Link>
              {!loading && (
                <>
                  <MediaMatch greaterThan="medium">
                    <Link href={`/sign-in?callbackUrl=${asPath}`} passHref>
                      <S.MenuLink>Entrar</S.MenuLink>
                    </Link>
                    <Link href="/sign-up" passHref>
                      <Button type="a" size="medium">
                        Cadastre-se
                      </Button>
                    </Link>
                  </MediaMatch>
                </>
              )}
  
            </S.MenuNav>
          </S.MenuFull>
        </S.MenuWrapper>
      </Container>
    </S.Wrapper>
  )
}

export default Menu
