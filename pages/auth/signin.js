import { getProviders, signIn } from 'next-auth/react'
import { useSession, getSession } from 'next-auth/react'

export default function SignIn({ providers }) {
  const { data: session } = useSession()
  return (
    <div>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const providers = await getProviders()
  return {
    props: { providers, session },
  }

}