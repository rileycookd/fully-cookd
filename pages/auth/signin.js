
import { useRouter } from 'next/router';
import { signIn, useSession, getSession } from 'next-auth/react';
import { Magic } from 'magic-sdk';
import { useForm } from 'react-hook-form';
import { useEffect } from "react";

const magic = typeof window !== 'undefined' && new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY || 'a');

export default function Signin() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const { data: session, status } = useSession()
  console.log(session)

  useEffect(() => {
    if(session?.user) router.push('/dashboard')
  }, [session])

  if(status === 'loading') {
    return <div>Loading...</div>
  }

  const onSubmit = async ({ email }) => {
    if (!magic) throw new Error(`magic not defined`);

    // login with Magic
    const didToken = await magic.auth.loginWithMagicLink({ email });

    // send user metadata to database
    let user
    try {
      const res = await fetch('/api/user/create', {
        method: 'POST',
        body: JSON.stringify({ email: email, didToken: didToken}),
        type: 'application/json'
      })
      const resData = await res.json()
      user = resData.user
    } catch (err) {
      console.log("ERROR!", err)
    }  

    // sign in with NextAuth
    await signIn('magic-link', {
      didToken,
      id: user._id,
      callbackUrl: router.query['callbackUrl']
    });
  };

  
  // if (status === "loading") {
  //   return <p>Loading...</p>
  // }

  // if (status === "authenticated") {
  //   return <p>Signed in as {session.user.email}</p>
  // }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: true })} placeholder="name@example.com" />

      <button type="submit">Sign in</button>
    </form>
  );
}


export async function getServerSideProps({ req }) {
  const session = await getSession(req);
  console.log("SESSION: ", session)

  if (session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}