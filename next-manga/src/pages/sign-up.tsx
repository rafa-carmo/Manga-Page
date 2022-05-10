import FormSignUp from 'components/FormSignUp'
import AuthTemplate from 'templates/Auth'

export default function Home() {
  return (
    <AuthTemplate title="Cadastre-se">
      <FormSignUp />
    </AuthTemplate>
  )
}
