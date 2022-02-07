import { SessionProvider, signIn, useSession } from 'next-auth/react'
import '../styles/index.css'
import '@fontsource/montserrat/400.css';
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/raleway/400.css";
import "@fontsource/raleway/700.css";
import "@fontsource/source-serif-pro/400.css";
import "@fontsource/source-serif-pro/700.css";



function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}

/**
 * If component has Component.auth = true
 * Requires authentication for session
 * Redirects to login page if not authenticated
 * NextAuth also adds a "callbackUrl" query to URL
 * With the cookie, it will redirect back to page originally requested.
 */
 function Auth({ children }) {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;

  React.useEffect(() => {
    if (status === "loading") {
      return;
    }
    if (!isUser) {
      signIn();
    }
  }, [isUser, status]);

  if (isUser) {
    return children;
  }

  return <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>;
}

export default MyApp
