import Base from 'templates/Base'
import FormProfile from 'components/FormProfile/'
import { Container } from 'components/Container/'

export type ProfileMenuProps = {
  name?: string | null
}

const ProfileMenu = ({ name }: ProfileMenuProps) => (
  <Base>
    <Container>
      <FormProfile
        name={name || ''}
        image="http://192.168.5.27:3333/imagens/mangas/banner/Solo%20Leveling.jpg"
      />
    </Container>
  </Base>
)

export default ProfileMenu
