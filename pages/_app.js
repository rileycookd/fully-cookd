import { UserProvider } from '@auth0/nextjs-auth0'
import '../styles/index.css'

function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
