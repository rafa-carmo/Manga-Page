import Link from 'next/link'
import Heading from 'components/Heading'
import Logo from 'components/Logo'
import * as S from './styles'
import MediaMatch from 'components/MediaMatch'

type FooterProps = {
  color?: 'white' | 'black'
}

const Footer = ({ color }: FooterProps) => (
  <S.Wrapper>
    <MediaMatch lessThan="medium">
      <Logo color={color} />
    </MediaMatch>

    <S.Content>
      <S.Column>
        <Heading color="white" lineColor="secondary" lineBottom size="small">
          Links
        </Heading>

        <nav aria-labelledby="footer resources">
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/games">
            <a>Explorar</a>
          </Link>
          <Link href="/search">
            <a>Buscar</a>
          </Link>
        </nav>
      </S.Column>
    </S.Content>
    <S.Copyright>© All rights reserved.</S.Copyright>
  </S.Wrapper>
)

export default Footer
