import FormSignIn from 'components/FormSignIn'
import AuthTemplate from 'templates/Auth'

export default function Home() {
  return (
    <AuthTemplate title="Entrar">
      <FormSignIn />
    </AuthTemplate>
  )
}
