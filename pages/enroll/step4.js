import React from 'react'
import { useRouter } from 'next/router';

import { 
  Checkbox,
  Form,
  FormProgress
} from '../../components/form'

import { useForm, useFormState } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import { useDispatch, useSelector } from 'react-redux'
import { changeDays } from '../../redux/features/registerClassesSlice'


export default function Step4(props) {
  const router = useRouter();
  const dispatch = useDispatch()

  const schema = yup.object().shape({
    days: yup.array().min(1, 'Select at least one day').required("Select at least one day"),
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
      days: [...useSelector(state => state.registerClasses.days)].map(d => d.day),
    },
    resolver: yupResolver(schema),
  })

  const { dirtyFields } = useFormState({
    control
  });

   const onSubmit = (data) => {
      dispatch(changeDays([...data.days]))  
      router.push("/enroll/step5")
   }

  return (
    <div className='h-full min-h-screen w-full flex items-center justify-center my-12'>
      <Form 
        className='flex flex-col gap-4'
        onSubmit={handleSubmit(onSubmit)}
        name="register-classes-step-2"
        register={register}
      >
        <h1 className='text-primary font-heading font-bold text-4xl'>Register for classes</h1>
        <FormProgress title="Weekly schedule" step={4} steps={7} />
        <fieldset className='flex flex-col gap-2 my-4'>
          <legend className='font-heading text-base mb-4'>Choose a schedule that works for you:</legend>
          <Checkbox
            id="monday" 
            label="Monday"
            name="days" 
            value="Monday"
            error={errors?.days}
            isDirty={isDirty?.days}
            register={register}
          />
          <Checkbox
            id="tuesday" 
            name="days" 
            label="Tuesday"
            value="Tuesday"
            error={errors?.days}
            isDirty={isDirty?.days}
            register={register}
          />
          <Checkbox
            id="wednesday" 
            name="days" 
            label="Wednesday"
            value="Wednesday"
            error={errors?.days}
            isDirty={isDirty?.days}
            register={register}
          />
          <Checkbox
            id="thursday" 
            name="days" 
            label="Thursday"
            value="Thursday"
            error={errors?.days}
            isDirty={isDirty?.days}
            register={register}
          />
          <Checkbox
            id="friday" 
            name="days" 
            label="Friday"
            value="Friday"
            error={errors?.days}
            isDirty={isDirty?.days}
            register={register}
          />
          {errors?.days && <p className='rounded-md bg-error-100 py-2 px-4 font-heading text-sm text-error-400'>{errors.days.message}</p>}
        </fieldset>
        <div className='flex gap-4'>
          <button
            onClick={(e) => {
              e.preventDefault()
              dispatch(changeDays([...getValues("days")]))  
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
    </div>
  )
}
