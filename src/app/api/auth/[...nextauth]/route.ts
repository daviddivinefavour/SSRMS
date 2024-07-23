import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { parseSignInSchema } from "@/lib/zod";
import { verifyUser } from "@/app/(root)/hooks/useValidateStudent";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "johndoe@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any | null> {
        try {
          const parsedSignInSchema = parseSignInSchema(credentials);
          if (parsedSignInSchema.success) {
            const { email, password } = parsedSignInSchema.data;

            const user = await verifyUser({
              email: email,
              password: password,
            });

            if (user.data) {
              const { id, first_name, last_name, email } = user.data;
              return {
                id,
                name: `${first_name} ${last_name}`,
                email,
              };
            }
          }
        } catch (error) {
          console.error("Error during authentication:", error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.email = profile?.email;
      }
      return token;
    },
    async session({ session, user, token }) {
      if (session) {
        session.user = user as User;
      }
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
