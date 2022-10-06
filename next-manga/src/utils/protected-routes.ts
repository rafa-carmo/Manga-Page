import { GetServerSidePropsContext } from 'next'
import { useSession } from "next-auth/react"


async function protectedRoutes(context: GetServerSidePropsContext) {
  const { data: session } = useSession()
  // const csrfToken = await getCsrfToken(context)


  if (!session) {
    context.res.writeHead(302, {
      location: `/sign-in?callbackUrl=${context.resolvedUrl}`
    })
    context.res.end()
  }

  return session
}

export default protectedRoutes
