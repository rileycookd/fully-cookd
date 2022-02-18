import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

import { signOut, getSession } from 'next-auth/react';


import { addMinutes, format } from 'date-fns'

import { 
  Form,
  FormProgress
} from '../../components/form'

import { useForm, useFormState } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import { calculateRegistrationPrice } from '../../lib/helpers';

import { useSelector } from 'react-redux'
import { getUserDataByEmail } from '../../lib/api'


export default function Step7({ userData }) {
  // const { data: session, status } = useSession()
  console.log("USER DATA: ", userData)
  const router = useRouter();

  const [totalPrice, setTotalPrice] = useState(0)

  const addHoursToString = (start, duration) => {
    console.log("START: ", start, "DURATION: ", duration)
    return format(
      addMinutes(
        new Date(2012, 1, 29, start.split(":")[0], start.split(":")[1]), 
        duration
      ), 
        'HH:mm'
    )
  }

  const initialState = {...useSelector(state => state.registerClasses)}
  const { chosenLanguage, chosenClassType, chosenPackage, size, days } = initialState
  initialState.days = initialState?.days?.map((d, i) => {
    return {
      day: d.day,
      start: d.time,
      end: addHoursToString(d.time, d.duration)
    }
  })

  const schema = yup.object().shape({
    classType: yup.string()
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
      // _id: userData?._id || null,
      language: initialState.chosenLanguage._id,
      classType: initialState.chosenClassType._id,
      size: initialState.size,
      days: initialState.days,
      quantity: initialState.chosenPackage.quantity,
    },
    resolver: yupResolver(schema),
  })

  const { dirtyFields } = useFormState({
    control
  });

  const onSubmit = (data) => {
    alert("Submitted!")
  }

  useEffect(() => {
    setTotalPrice(calculateRegistrationPrice(chosenClassType, days, size, chosenPackage))
  }, [chosenClassType])

  return (
    <div className='h-full min-h-screen w-full flex items-center justify-center my-12'>
      <Form 
        className='flex flex-col gap-4'
        onSubmit={handleSubmit(onSubmit)}
        name="register-classes-step-7"
        register={register}
      >
        <h1 className='text-primary font-heading font-bold text-4xl'>Register for classes</h1>
        <FormProgress title="Confirm registration" step={7} steps={7} />
        <h2 className='text-primary font-heading font-bold text-2xl'>Total: ${totalPrice}</h2>
        <div className='flex gap-4'>
          <button
            onClick={(e) => {
              e.preventDefault()
              router.push('/enroll/step6')
            }}
            className='flex-1 bg-grey-400 hover:bg-grey-500 text-primary font-bold font-heading py-5 px-5 rounded'
          >
            Back
          </button>
          <button 
            type="submit" 
            className='flex-1 bg-accent hover:bg-accent-400 text-primary font-bold font-heading py-5 px-5 rounded'
            >
              Submit
            </button>
        </div>
       
        <pre>{JSON.stringify(watch(), null, 2)}</pre>
        <div>{JSON.stringify(errors)}</div>
        <div>{isValid.toString()}</div>
      </Form>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const { user } = await getSession(ctx)
  const userData = await getUserDataByEmail(user.email)
  return {
    props: {
      userData
    }
  }
}