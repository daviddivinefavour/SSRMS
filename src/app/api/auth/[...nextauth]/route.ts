import NextAuth, { Session, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { parseSignInSchema } from '@/lib/zod'
import { verifyUser } from '@/app/(root)/hooks/useValidateStudent'
import { JWT } from 'next-auth/jwt'

type TAuthUser = {
  id: string
  name: string
  email: string
}
const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/',
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'johndoe@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<TAuthUser | null> {
        try {
          const parsedSignInSchema = parseSignInSchema(credentials)
          if (parsedSignInSchema.success) {
            const { email, password } = parsedSignInSchema.data

            const user = await verifyUser({
              email: email,
              password: password,
            })

            if (user.data) {
              const { id, first_name, last_name, email } = user.data
              return {
                id,
                name: `${first_name} ${last_name}`,
                email,
              }
            }
          }
        } catch (error) {
          console.error('Error during authentication:', error)
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      // Add the user properties to the token after signing in
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Create a user object with token properties
      const userObject = {
        id: token.id,
        name: token.name,
        email: token.email,
      }
      // Add the user object to the session
      session.user = userObject
      return session
    },
  },
  // callbacks: {
  //   async jwt({ token, user, account, profile }) {
  //     if (account) {
  //       token.accessToken = account.access_token
  //       token.email = profile?.email
  //     }
  //     return token
  //   },
  //   async session({ session, user, token }) {
  //     if (session) {
  //       session.user = user as User
  //     }
  //     return session
  //   },
  // },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
