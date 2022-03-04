import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { signIn, useSession, getSession } from 'next-auth/react';
import { Magic } from 'magic-sdk';
import { useForm, useFormState } from 'react-hook-form';
import { IoMail as MailIcon } from 'react-icons/io5'
import Link from 'next/link'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image'
import { BsExclamationCircle as WarningIcon } from 'react-icons/bs'




import { IoMdArrowBack as BackArrow } from 'react-icons/io'

import {
  InputField,
  Select,
  Form
} from '../../components/form'

import UserDropdown from '../../components/user-dropdown'

const magic = typeof window !== 'undefined' && new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY || 'a');

export default function Signin() {
  const router = useRouter();
  const { data: session, status } = useSession()

  const [formAlert, setFormAlert] = useState(undefined)


  const schema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Please enter your email"),
  })

  const { 
    watch, 
    register, 
    control, 
    handleSubmit, 
    reset, 
    getValues,
    unregister,
    setValue,
    formState: { errors, isDirty, isValid } 
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(schema),
  })
  
  const { dirtyFields } = useFormState({
    control
  });

  const onSubmit = async ({ email }) => {
    if (!magic) throw new Error(`magic not defined`);

    // Check if user already exists
    let user
    try {
      const res = await fetch('/api/user/get', {
        method: 'POST',
        body: JSON.stringify({ email: email }),
        type: 'application/json'
      })
      const resData = await res.json()
      user = resData.user
    } catch (err) {
      console.log("ERROR!", err)
      setFormAlert({message: 'Something went wrong'})
      return
    }  

    if(!user) {
      setFormAlert({message: 'We couldn\'t find a user with that email.'})
      return
    } else {

      // Remove user exists warning if present
      if(formAlert) setFormAlert(undefined)

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
    }
  };

  useEffect(() => {
    if(session?.user) router.push('/students')
  }, [session])

  if(status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === "authenticated") {
    return (
      <div className='flex flex-col items-center gap-2 justify-center mt-16'>
        <div className='mb-4'>
          <Image 
            src="/images/company_logo.svg" 
            width="150" 
            height="40" 
          />
        </div>
        <h1 
          className='font-heading font-bold text-primary text-2xl'
        >
          Signed in as: 
          <span className='ml-2 font-normal'>{session.user.email}</span>
        </h1>
        <p>You will be redirected automatically or <span><Link href='/students/'><a className='underline text-blue-500'>click here</a></Link></span></p>
      </div>
    )
  }

  return (
    <div>
      <div className='h-full flex items-center justify-center my-24'>
        <Form 
          className='flex flex-col gap-4 w-full max-w-sm'
          onSubmit={handleSubmit(onSubmit)}
          name="register-classes-step-1"
          register={register}
        >
          <h1 className='text-primary font-heading font-bold text-4xl'>Sign in</h1>
          <p className='mb-4 '>New user? <span><Link href="/register"><a className='underline text-blue-500 hover:text-blue-800'>Create an account</a></Link></span></p>
          {formAlert?.message && <p className='flex items-center rounded-md bg-error-100 py-2 px-4 font-heading text-sm text-error-400'><WarningIcon className='w-4 h-4 mr-2'/>{formAlert.message}</p>}

            <InputField
              label="Email:"
              name="email"
              placeholder="you@email.com" 
              id="email"
              type="text"
              error={errors?.name}
              register={register}
              isDirty={dirtyFields?.email || getValues("email")}
            >
              <MailIcon />
            </InputField>
            <button type="submit" className='bg-accent hover:bg-accent-400 text-primary font-bold font-heading py-5 px-5 rounded'>Sign in</button>
          {/* <pre>{JSON.stringify(watch(), null, 2)}</pre>
          <div>{JSON.stringify(errors)}</div>
          <div>{isValid.toString()}</div> */}
        </Form>
      </div>
    </div>
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