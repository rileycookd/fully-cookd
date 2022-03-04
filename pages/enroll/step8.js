import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

import { signOut, getSession } from 'next-auth/react';


import { addMinutes, format, set } from 'date-fns'

import { 
  Form,
  FormPageContainer
} from '../../components/form'

import { useForm, useFormState } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import { calculateRegistrationPrice } from '../../lib/helpers';

import { useSelector } from 'react-redux'
import { getUserDataByEmail } from '../../lib/api'
import { addMinutesToTimeString } from '../../lib/helpers';


export default function Step7({ userData }) {
  // const { data: session, status } = useSession()
  const router = useRouter();

  const [totalPrice, setTotalPrice] = useState(0)

  const initialState = {...useSelector(state => state.registerClasses)}
  const { chosenLanguage, chosenClassType, duration, chosenPackage, size, days } = initialState
  initialState.days = initialState?.days?.map((d, i) => {
    return {
      day: d.day,
      start: d.time,
      end: addMinutesToTimeString(d.time, d.duration)
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
      language: chosenLanguage._id,
      classType: chosenClassType._id,
      size: size,
      days: initialState.days,
      students: [],
      quantity: chosenPackage.quantity,
    },
    resolver: yupResolver(schema),
  })

  const { dirtyFields } = useFormState({
    control
  });

  const onSubmit = async (data) => {

    
    let calendarData
    let registrationForm
    try {
      const calendarRes = await fetch('/api/calendars/create-calendar', {
        method: 'POST',
        body: JSON.stringify({ students: data.students }),
        type: 'application/json'
      })
      const calendarResData = await calendarRes.json()
      if(calendarResData.calendar) {
        calendarData = calendarResData.calendar
        console.log("SUCCESS! ", calendarData)
      } else {
        console.log("ERROR: ", calendarResData)
        router.push("/enroll/error") 
        return
      }

      // Create new registration document
      const sanityRes = await fetch('/api/form/registration', {
        method: 'POST',
        body: JSON.stringify({ classType: data.classType, language: data.language, quantity: data.quantity, size: data.size, days: data.days, students: data.students, calendarId: calendarData.id }),
        type: 'application/json'
      })
      const sanityResData = await sanityRes.json()
      registrationForm = sanityResData.data
      console.log("SUCCESS! ", registrationForm)
      router.push("/enroll/success") 

    } catch (err) {
      router.push("/enroll/error") 
      console.log("ERROR!", err)
      
    } 
  }

  useEffect(() => {
    if(!days?.[0]?.time) {
      router.push("/enroll/step1") 
    }
  }, [days])
  
  if(!days?.[0]?.time) {
    return <div>Loading...</div>
  }


  useEffect(() => {
    setTotalPrice(calculateRegistrationPrice(chosenClassType, duration, size, chosenPackage).price)
  }, [initialState])


  return (
    <FormPageContainer step={8} steps={8}>
      <Form 
        className='flex flex-col gap-4 w-96'
        onSubmit={handleSubmit(onSubmit)}
        name="register-classes-step-7"
        register={register}
      >
        <input
          name={'students[0].name'}
          value={userData.name}
          {...register('students[0].name')}
          className='hidden'
        />
        <input
          name={'students[0].id'}
          value={userData._id}
          {...register('students[0].id')}
          className='hidden'
        />

        <div className='flex flex-col gap-8'>
          <div className='flex flex-col'>
            <div className='flex-1 flex px-2 py-2 justify-start border-b border-grey-300'>
              <h3 className='font-heading font-bold text-grey-600'>Course details</h3>
            </div>
            <ul className='flex flex-col'>
              <li className='flex px-2 py-2'>
                <div className='w-1/3 flex justify-start items-center'>
                  <h4 className='font-heading text-primary'>Language:</h4>
                </div>
                <div className='flex-1 flex'>
                  <p className='font-heading font-bold text-primary'>{chosenLanguage.title}</p>
                </div>
              </li>
              <li className='flex px-2 py-2 bg-grey-100'>
                <div className='w-1/3 flex justify-start items-center'>
                  <h4 className='font-heading text-primary'>Course:</h4>
                </div>
                <div className='flex-1 flex'>
                  <p className='font-heading font-bold text-primary'>{chosenClassType.title}</p>
                </div>
              </li>
              <li className='flex px-2 py-2'>
                <div className='w-1/3 flex justify-start items-center'>
                  <h4 className='font-heading text-primary'>Students:</h4>
                </div>
                <div className='flex-1 flex'>
                  <p className='font-heading font-bold text-primary'>{size}</p>
                </div>
              </li>
            </ul>
          </div>

          <div className='flex flex-col'>
            <div className='flex-1 flex px-2 py-2 justify-start border-b border-grey-300'>
              <h3 className='font-heading font-bold text-grey-600'>Schedule</h3>
            </div>
            <ul className='flex flex-col'>
              {initialState?.days.map((d, i) => (
                <li className={`flex px-2 py-2 ${i % 2 === 0 ? '' : 'bg-grey-100'}`}>
                  <div className='w-1/3 flex justify-start items-center'>
                    <h4 className='font-heading text-primary'>{d.day}:</h4>
                  </div>
                  <div className='flex-1 flex'>
                    <p className='font-heading font-bold text-primary'>{d.start.slice(0,5)}-{d.end.slice(0,5)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className='flex flex-col'>
            <div className='flex-1 flex px-2 py-2 justify-start border-b border-grey-300'>
              <h3 className='font-heading font-bold text-grey-600'>Price</h3>
            </div>
            <ul className='flex flex-col'>
              <li className='flex px-2 py-2'>
                <div className='w-1/3 flex justify-start items-center'>
                  <h4 className='font-heading text-primary'>Package:</h4>
                </div>
                <div className='flex-1 flex'>
                  <p className='font-heading font-bold text-primary'>{chosenPackage.quantity} class{chosenPackage.quantity > 1 ? 'es' : 's'}</p>
                </div>
              </li>
              <li className='flex px-2 py-2 bg-grey-100'>
                <div className='w-1/3 flex justify-start items-center'>
                  <h4 className='font-heading text-primary'>Cost:</h4>
                </div>
                <div className='flex-1 flex'>
                  <p className='font-heading font-bold text-primary'>${totalPrice}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className='flex gap-4 mt-8'>
          <button
            onClick={(e) => {
              e.preventDefault()
              router.push('/enroll/step7')
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
    </FormPageContainer>
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