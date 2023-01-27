import { Container } from 'components/Container'
import Footer from 'components/Footer'
import { MangaCardProps } from 'components/MangaCard'
import Menu from 'components/Menu'
import { ModalAddManga } from 'components/ModalAddManga'
import ScrollToTop from 'components/ScrollToTop'
import { ModalContext } from 'hooks/add-manga'
import { useSession } from "next-auth/react"
import { useContext } from 'react'
import Modal from 'react-modal'

import * as S from './styles'

export type BaseTemplateProps = {
  children: React.ReactNode
  manga?: Pick<MangaCardProps, 'title' | 'slug'>
}

const Base = ({ children, manga }: BaseTemplateProps) => {
  const { data: session, status: loading} = useSession()
  const { isOpen } = useContext(ModalContext)

  return (
    <S.Wrapper>
      <Menu username={session?.user?.name} userId={session?.id as string} loading={loading === 'loading'} manga={manga} />

      <S.Content>{children}</S.Content>

      <S.SectionFooter>
        <Container>
          <Footer color="white" />
        </Container>
      </S.SectionFooter>
      <ScrollToTop />

      <ModalAddManga />
    </S.Wrapper>
  )
}

export default Base
