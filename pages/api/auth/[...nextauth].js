import NextAuth from 'next-auth'
// import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { Magic } from '@magic-sdk/admin';

const magic = new Magic(process.env.MAGIC_SECRET_KEY);


const options = {
  site: 'http://localhost:3000',
  // database: `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2022-01-01/data/query/production`,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // the session will last 30 days
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ user, token, account }) {
      // Persist the OAuth access_token to the token right after signin
      console.log("JWT User: ", user)
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      console.log("SESSION User: ", user)
      return session
    },
    redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url
      // Allows relative callback URLs
      else if (url.startsWith("/")) return new URL(url, baseUrl).toString()
      return baseUrl
    }
  },
  providers: [
    CredentialsProvider({
      id: 'magic-link',
      name: "Magic Link",
      credentials: {
        didToken: { label: 'DID Token', type: 'text' },
      },
      async authorize({ didToken, id }, req) {
        // validate magic DID token
        magic.token.validate(didToken);
        console.log("User ID: ", id)

        // fetch user metadata
        const metadata = await magic.users.getMetadataByToken(didToken);

        if (metadata) {
          // Any object returned will be saved in `user` property of the JWT
          return { ...metadata, id: id }
        } else {
          // If you return null or false then the credentials will be rejected
          return null
          // You can also Reject this callback with an Error or with a URL:
          // throw new Error('error message') // Redirect to error page
          // throw '/path/to/redirect'        // Redirect to a URL
        }
      },
    })
    // EmailProvider({
    //   server: {
    //     port: process.env.EMAIL_SERVER_PORT,
    //     host: process.env.EMAIL_SERVER_HOST,
    //     secure: true,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //     tls: {
    //       rejectUnauthorized: false,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // })
  ]
}

export default async (req, res) => await NextAuth(req, res, options)