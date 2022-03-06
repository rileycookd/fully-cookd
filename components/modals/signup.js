import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { signIn, useSession, getSession } from 'next-auth/react';
import { Magic } from 'magic-sdk';
import { useForm, useFormState } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { BsExclamationCircle as WarningIcon } from 'react-icons/bs'

import { useDispatch } from 'react-redux'
import { showModal, clearModal } from 'redux/features/modalSlice'
import { RiMapPinTimeLine as TimezoneIcon } from 'react-icons/ri'
import { IoMail as MailIcon, IoPerson as PersonIcon, } from 'react-icons/io5'


import {
  InputField,
  Select,
  TimezoneSelect,
  Form
} from 'components/form'


const magic = typeof window !== 'undefined' && new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY || 'a');


export default function SignupModal(props) {
  const dispatch = useDispatch()

  const router = useRouter();
  const { data: session, status } = useSession()

  const [formAlert, setFormAlert] = useState(undefined)


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
      timezone: '',
    },
    resolver: yupResolver(schema),
  })
  
  const { dirtyFields } = useFormState({
    control
  });

  const onSubmit = async ({ email, timezone, name }) => {
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
          body: JSON.stringify({ email, name, timezone, didToken}),
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
    <div className='p-8 bg-white rounded-lg w-96 max-w-sm'>
      <Form 
        className='flex flex-col gap-4 w-full max-w-sm'
        onSubmit={handleSubmit(onSubmit)}
        name="register-classes-step-1"
        register={register}
      >
        <h1 className='text-primary font-heading text-center font-bold text-2xl'>Sign up</h1>
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
            register={register}
            control={control}
            error={errors?.timezone}
            isDirty={dirtyFields.timezone || getValues('timezone')}
          >
            <TimezoneIcon />
          </TimezoneSelect> 
          <button 
            type="submit" 
            className='bg-accent hover:bg-accent-400 text-primary font-bold font-heading py-5 px-5 rounded'
          >
            Create account
          </button>
        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre>
        <div>{JSON.stringify(errors)}</div>
        <div>{isValid.toString()}</div> */}
        <p className='text-sm mb-2 text-center'>
          Already have an account? 
          <span>
            <button 
              onClick={() => dispatch(showModal("LOGIN"))}
              className='ml-1 underline text-blue-500 hover:text-blue-800'
            >
              Log in
            </button>
          </span>
        </p>
      </Form>
    </div>
  )
}