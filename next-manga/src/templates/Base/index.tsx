import { Container } from 'components/Container'
import Footer from 'components/Footer'
import { MangaCardProps } from 'components/MangaCard'
import Menu from 'components/Menu'
import ScrollToTop from 'components/ScrollToTop'
import { useSession } from 'next-auth/client'

import * as S from './styles'

export type BaseTemplateProps = {
  children: React.ReactNode
  manga?: Pick<MangaCardProps, 'title' | 'slug'>
}

const Base = ({ children, manga }: BaseTemplateProps) => {
  const [session, loading] = useSession()
  return (
    <S.Wrapper>
      <Menu username={session?.user?.name} loading={loading} manga={manga} />

      <S.Content>{children}</S.Content>

      <S.SectionFooter>
        <Container>
          <Footer color="white" />
        </Container>
      </S.SectionFooter>
      <ScrollToTop />
    </S.Wrapper>
  )
}

export default Base
