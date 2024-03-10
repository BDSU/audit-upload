import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export type ProfileUser = {
  oid: string
  upn: string
  given_name: string
  family_name: string
}

const authOptions: AuthOptions = {
  providers: [
    // temporary credentials auth
    CredentialsProvider({
      credentials: { user: {} },
      authorize: (credentials) => ({ id: credentials!.user }),
    }),
  ],
  callbacks: {
    redirect: ({ url }) => {
      return Promise.resolve(url)
    },
  },
}
export default authOptions
