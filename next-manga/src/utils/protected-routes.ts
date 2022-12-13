import { GetServerSidePropsContext } from 'next'
import { getToken } from 'next-auth/jwt'


async function protectedRoutes(context: GetServerSidePropsContext) {
  const token = await getToken({ req: context.req, secret: process.env.NEXT_PUBLIC_SECRET })
  // const session = await getSession({req: context.req})


  // // console.log("🚀 ~ file: protected-routes.ts:8 ~ protectedRoutes ~ session", session)
  if (!token) {
    context.res.writeHead(302, {
      location: `/sign-in?callbackUrl=${context.resolvedUrl}`
    })
    context.res.end()
  }

  return token
}

export default protectedRoutes
