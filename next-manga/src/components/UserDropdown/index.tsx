import * as S from './styles'
import Link from 'next/link'

import Dropdown from 'components/Dropdown'

// import { UserCircle as AccountCircle } from '@styled-icons/fa-regular/UserCircle'
import { ChevronDown } from '@styled-icons/boxicons-solid/ChevronDown'
import { Favorite } from '@styled-icons/material-outlined/Favorite'
import { LogOut, BookAlt } from '@styled-icons/boxicons-regular'
import { signOut } from 'next-auth/react'
import MediaMatch from 'components/MediaMatch'
import { UserCircle as AccountCircle } from 'phosphor-react'

export type UserDropdownProps = {
  username: string
}

const UserDropdown = ({ username }: UserDropdownProps) => (
  <Dropdown
    title={
      <>
        <AccountCircle size={24} />
        <MediaMatch greaterThan="medium">
          <S.Username>{username}</S.Username>
        </MediaMatch>
        <ChevronDown size={24} />
      </>
    }
  >
    <S.Nav>
      <Link href="/me" passHref>
        <S.Link>
          <AccountCircle size={24} />
          <span>Minha Conta</span>
        </S.Link>
      </Link>
      <Link replace href="/favorites" passHref>
        <S.Link>
          <Favorite size={24} />
          <span>Favoritos</span>
        </S.Link>
      </Link>

      <Link replace href="/wishlist" passHref>
        <S.Link>
          <BookAlt size={24} />
          <span>Lista para ler</span>
        </S.Link>
      </Link>

      <S.Link role="button" onClick={() => signOut()} title="log-out">
        <LogOut size={24} />
        <span>Sair</span>
      </S.Link>
    </S.Nav>
  </Dropdown>
)

export default UserDropdown
