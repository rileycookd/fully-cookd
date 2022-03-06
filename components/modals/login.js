import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { signIn, useSession, getSession } from 'next-auth/react';
import { Magic } from 'magic-sdk';
import { useForm, useFormState } from 'react-hook-form';
import { IoMail as MailIcon } from 'react-icons/io5'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { BsExclamationCircle as WarningIcon } from 'react-icons/bs'

import { useDispatch } from 'react-redux'
import { showModal, clearModal } from 'redux/features/modalSlice'

import {
  InputField,
  Select,
  Form
} from 'components/form'


const magic = typeof window !== 'undefined' && new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY || 'a');


export default function LoginModal(props) {
  const dispatch = useDispatch()

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
        callbackUrl: `${router.basePath}/enroll/step1`
        // callbackUrl: router.query['callbackUrl']
      });
    }
  };
 

  return (
    <div className='p-8 bg-white rounded-lg w-full w-96 max-w-sm'>
      <Form 
        className='flex flex-col gap-4 w-full max-w-sm'
        onSubmit={handleSubmit(onSubmit)}
        name="register-classes-step-1"
        register={register}
      >
        <h1 className='text-primary font-heading text-center font-bold text-2xl'>Log in</h1>
        <p className='text-sm mb-2 text-center'>
          New user? 
          <span>
            <button 
              onClick={() => dispatch(showModal("SIGNUP"))}
              className='ml-1 underline text-blue-500 hover:text-blue-800'
            >
              Create an account
            </button>
          </span>
        </p>
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
          <button type="submit" className='bg-accent hover:bg-accent-400 text-primary font-bold font-heading py-5 px-5 rounded'>Log in</button>
        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre>
        <div>{JSON.stringify(errors)}</div>
        <div>{isValid.toString()}</div> */}
      </Form>
    </div>
  )
}