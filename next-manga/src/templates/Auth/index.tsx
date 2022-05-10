import * as S from './styles'
import Link from 'next/link'
import Logo from 'components/Logo'
import Heading from 'components/Heading'
import MediaMatch from 'components/MediaMatch'

type AuthProps = {
  title: string
  children: React.ReactNode
}
const Auth = ({ title, children }: AuthProps) => (
  <S.Wrapper>
    <S.BannerBlock>
      <S.BannerContent>
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
        <div>
          <Heading size="huge">
            Faça login para aproveitar mais dos mangas baixados
          </Heading>
          <S.SubTitle>
            <strong>Manga Home</strong>
          </S.SubTitle>
        </div>

        <S.Footer>2021 Todos os direitos reservados</S.Footer>
      </S.BannerContent>
    </S.BannerBlock>

    <S.Content>
      <S.ContetWrapper>
        <MediaMatch lessThan="medium">
          <Link href="/" passHref>
            <S.logoWrapper>
              <Logo size="normal" />
            </S.logoWrapper>
          </Link>
        </MediaMatch>
        <Heading color="black" lineColor="secondary" lineLeft>
          {title}
        </Heading>
        {children}
      </S.ContetWrapper>
    </S.Content>
  </S.Wrapper>
)

export default Auth
