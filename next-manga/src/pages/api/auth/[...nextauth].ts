import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

type GenericObject = { [key: string]: any }

export default NextAuth({
  pages: {
    signIn: '/sign-in'
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
  
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text " },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        
        if(!credentials?.email || !credentials?.password) {
          return null
        }

        const { email, password } = credentials


        const response = await fetch(
          `${process.env.API_URL}/auth/local`,
          {
            method: 'POST',
            body: new URLSearchParams({ identifier: email, password })
          }
        )
 

        const data = await response.json()
        if (data.user) {
          const returnData = { name: data.user.username, ...data.user, jwt: data.jwt }
          return returnData
        } else {
          return null
        }
      },
    }),
  ],
  callbacks: {
      async session({ session, token }) {
        session.id = token.id;
        session.jwt = token.jwt;
        return Promise.resolve(session);
      },
      async jwt({ token, user }: GenericObject) {
        const isSignIn = user ? true : false
        if (isSignIn) {
  
            token.id = user.id
            token.email = user.email
            token.name = user.username
            token.jwt = user.jwt
          
        }
        return Promise.resolve(token);
      },
      async redirect({ url }) {
          return url
      }
    },
})
