import NextAuth, { Session, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { parseSignInSchema } from '@/lib/zod'
import { verifyUser } from '@/app/(root)/hooks/useValidateStudent'
import { JWT } from 'next-auth/jwt'

export type TAuthUser = {
  id?: string
  name: string
  email: string
  image?: string
  level?: string
  role?: string
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
      async authorize(credentials): Promise<any> {
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
                role: user.data.role,
                level: user.data.level,
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
    async jwt({ token, user }: { token: JWT; user: any }) {
      // Add the user properties to the token after signing in
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.level = user.level
        token.role = user.role
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Create a user object with token properties
      const userObject = {
        id: token.id,
        name: token.name,
        email: token.email,
        level: token.level,
        role: token.role,
      }
      // Add the user object to the session
      session.user = userObject
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
