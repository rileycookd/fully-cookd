import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

import { 
  Select,
  Radio,
  Form,
  FormPageContainer,
} from '../../components/form'

import { useForm, useFormState } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import { useDispatch, useSelector } from 'react-redux'
import { changeDuration } from '../../redux/features/registerClassesSlice'


export default function Step2(props) {
  const router = useRouter();
  const dispatch = useDispatch()

  const { chosenClassType, size } = useSelector(state => state.registerClasses)

  const schema = yup.object().shape({
    duration: yup.string().required("Please select a duration"),
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
      duration: useSelector(state => state.registerClasses.duration) || '',
    },
    resolver: yupResolver(schema),
  })

  const { dirtyFields } = useFormState({
    control
  });

   const onSubmit = (data) => {
      dispatch(changeDuration(data.duration))
      router.push("/enroll/step5")
   }

  useEffect(() => {
    if(!size) {
      router.push("/enroll/step1") 
    }
  }, [size])
  
  if(!size) {
    return <div>Loading...</div>
  }


  return (
    <FormPageContainer step={4} steps={8}>

      <Form 
        className='flex flex-col gap-4 w-96'
        onSubmit={handleSubmit(onSubmit)}
        name="register-classes-step-2"
        register={register}
      >
        <fieldset className='flex flex-col gap-2 my-4'>
          <legend className='font-heading text-base mb-4'>Class duration:</legend>
          {chosenClassType?.pricing?.map(p => (
            <Radio 
              key={p._key}
              id={p._key} 
              label={(
                <div className='flex w-full justify-between items-center'>
                  {`${p.duration} minute${p.duration > 1 ? 's' : ''}`}
                  {/* <span className='font-normal text-grey-700'>
                    ${p.price}
                  </span> */}
                </div>
              )}
              name="duration" 
              value={p.duration}
              error={errors?.duration}
              isDirty={isDirty?.duration}
              register={register}
            />
          ))}
          {errors?.duration && <p className='rounded-md bg-error-100 py-2 px-4 font-heading text-sm text-error-400'>{errors.duration.message}</p>}
        </fieldset>
        <div className='flex gap-4'>
          <button
            onClick={(e) => {
              e.preventDefault()
              let duration = getValues("duration")
              if(duration) dispatch(changeDuration(duration))
              router.push('/enroll/step3')
            }}
            className='flex-1 bg-grey-400 hover:bg-grey-500 text-primary font-bold font-heading py-5 px-5 rounded'
          >
            Back
          </button>
          <button 
            type="submit" 
            className='flex-1 bg-accent hover:bg-accent-400 text-primary font-bold font-heading py-5 px-5 rounded'
            >
              Next
            </button>
        </div>
        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre>
        <div>{JSON.stringify(errors)}</div>
        <div>{isValid.toString()}</div> */}
      </Form>
    </FormPageContainer>
  )
}


