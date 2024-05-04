import bcrypt from 'bcryptjs';
import { db } from "@/db"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import NextAuth, { Account, AuthError, CredentialsSignin, Profile, User } from "next-auth"
import { Adapter } from "next-auth/adapters"
import { JWT } from "next-auth/jwt"
import Credentials from "next-auth/providers/credentials"
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Name", type: "text"},
        password: { label: "Password", type: "password", },
      },
      async authorize(credentials) {
        const user = await db.select()
          .from(users)
          .where(eq(users.email, credentials!.email as string))
          .then(res => res[0] ?? null)

        if (!user) {
          throw new CredentialsSignin();
        }

        if (!user.emailVerified) {
          throw new AuthError();
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials!.password as string,
          user.password as string
        );

        if (!isPasswordCorrect) {
          throw new CredentialsSignin();
        }

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async jwt({
      token,
      user,
      account,
      profile,
      isNewUser,
    }: {
      token: JWT;
      user?: User;
      account?: Account | null | undefined;
      profile?: Profile | undefined;
      isNewUser?: boolean | undefined;
    }) {

      if (user) {
        token.provider = account?.provider;
        token.role = user.role
        token.emailVerified = user.emailVerified
        token.firstPasswordChange = user.firstPasswordChange
      }

      return token;
    },
    async session({ session, token }: { session: any; token: JWT; }) {
      if (session.user) {
        session.user.provider = token.provider;
        session.user.role = token.role;
        session.user.emailVerified = token.emailVerified;
        session.user.firstPasswordChange = token.firstPasswordChange;
      }
      
      return session;
    },
  },
})