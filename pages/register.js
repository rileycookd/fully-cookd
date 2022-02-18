import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { signIn, useSession, getSession } from 'next-auth/react';
import { Magic } from 'magic-sdk';
import { useForm, useFormState } from 'react-hook-form';
import { useEffect } from "react";
import { IoMail as MailIcon, IoPerson as PersonIcon, } from 'react-icons/io5'
import Link from 'next/link'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import Layout from '../components/layout';
import Image from 'next/image'
import { BsExclamationCircle as WarningIcon } from 'react-icons/bs'
import { RiMapPinTimeLine as TimezoneIcon } from 'react-icons/ri'

import { IoMdArrowBack as BackArrow } from 'react-icons/io'

import {
  InputField,
  Select,
  TimezoneSelect,
  Form
} from '../components/form'

import UserDropdown from '../components/user-dropdown'

const magic = typeof window !== 'undefined' && new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY || 'a');

export default function RegisterUser() {

  const [formAlert, setFormAlert] = useState(undefined)

  const router = useRouter();
  const { data: session, status } = useSession()
  console.log(session)

  const schema = yup.object().shape({
    name: yup.string().required("Please enter your full name"),
    email: yup.string().email("Please enter a valid email").required("Please enter your email"),
    timezone: yup.string().required("Please select a timezone")
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
      name: '',
      email: '',
    },
    resolver: yupResolver(schema),
  })

  
  const { dirtyFields } = useFormState({
    control
  });

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

    if(user) {
      console.log("USER EXISTS!: ", user)
      setFormAlert({message: 'A user with that email already exists'})
      return
    } else {
      // Remove user exists warning if present
      if(formAlert) setFormAlert(undefined)

      // login with Magic
      const didToken = await magic.auth.loginWithMagicLink({ email });

      // send user metadata to database
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

  return (
    <>
      <Layout hideNav={true}>
        <div className='container mx-auto px-5 flex justify-between items-center py-8'>
          <Link href={router.query?.source || '/'}>
            <a className='flex-1 flex items-center text-grey-600 underline hover:text-grey-700 transition-all duration-100 w-6 h-6 mr-2 font-heading font-bold'><BackArrow className='fill-current w-6 h-6 mr-1'/> Back</a>
          </Link>
          <p className='flex-1 flex justify-end'><UserDropdown /></p>
        </div>
        <div className='h-full flex items-center justify-center my-24'>
          <Form 
            className='flex flex-col gap-4 w-full max-w-sm'
            onSubmit={handleSubmit(onSubmit)}
            name="register-classes-step-1"
            register={register}
          >
            <h1 className='text-primary font-heading font-bold text-4xl'>New account</h1>
            <p className='mb-4 '>Already have an account? <span><Link href="/auth/signin"><a className='underline text-blue-500 hover:text-blue-800'>Sign in</a></Link></span></p>
            {formAlert?.message && <p className='flex items-center rounded-md bg-error-100 py-2 px-4 font-heading text-sm text-error-400'><WarningIcon className='w-4 h-4 mr-2'/>{formAlert.message}</p>}

              <InputField
                label="Full name:"
                name="name"
                placeholder="Your name" 
                id="name"
                type="text"
                error={errors?.name}
                register={register}
                isDirty={dirtyFields?.name || getValues('name')}
              >
                <PersonIcon />
              </InputField>
              <InputField
                label="Email:"
                name="email"
                placeholder="you@email.com" 
                id="email"
                type="text"
                error={errors?.email}
                register={register}
                isDirty={dirtyFields?.email || getValues('email ')}
              >
                <MailIcon />
              </InputField>
              <TimezoneSelect 
                // placeholder="Search..." 
                label="Timezone:" 
                name="timezone"
                id="timezone"
                control={control}
                error={errors?.timezone}
                // disabled={!editMode}
                isDirty={dirtyFields.timezone}
              >
                <TimezoneIcon />
              </TimezoneSelect> 
              <button 
                type="submit" 
                className='bg-accent hover:bg-accent-400 text-primary font-bold font-heading py-5 px-5 rounded'
              >
                Register
              </button>
            {/* <pre>{JSON.stringify(watch(), null, 2)}</pre>
            <div>{JSON.stringify(errors)}</div>
            <div>{isValid.toString()}</div> */}
          </Form>
        </div>
      </Layout>
    </>
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