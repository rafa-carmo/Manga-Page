import * as S from './styles'
import Heading from 'components/Heading'
import TextField from 'components/TextField/index'
import Button from 'components/Button'

export type FormProfileProps = {
  name: string
  image: string
}

const FormProfile = ({ name, image }: FormProfileProps) => (
  <S.Wrapper image={image}>
    <S.Heading>
      <Heading lineBottom color="black" size="small">
        My Profile
      </Heading>
    </S.Heading>
    <S.Form>
      <S.InputContainer>
        <TextField name="name" value={name} label="Nome" labelColor="black" />
      </S.InputContainer>
      <S.ButtonContainer>
        <Button>Salvar</Button>
      </S.ButtonContainer>
    </S.Form>
  </S.Wrapper>
)

export default FormProfile
