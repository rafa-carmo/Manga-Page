import { GetServerSidePropsContext } from 'next'
import ProfileMenuTemplate from 'templates/ProfileMenu'
import protectedRoutes from 'utils/protected-routes'
import { useSession } from 'next-auth/client'

export default function ProfileMenu() {
  const [session] = useSession()
  return (
    <div>
      <ProfileMenuTemplate name={session!.user!.name} />
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)

  return {
    props: {
      session
    }
  }
}
