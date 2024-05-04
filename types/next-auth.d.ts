import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
      provider: string;
      emailVerified: date;
      role: string;
      firstPasswordChange: boolean;
    };
  }
  interface User {
    name: string;
    email: string;
    image: string;
    emailVerified: date;
    role: string;
    firstPasswordChange: boolean;
  }
}
