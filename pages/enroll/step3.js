import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router';
import { getAllLanguageData } from '../../lib/api';

import { 
  Select,
  Radio,
  Form,
  FormPageContainer
} from '../../components/form'

import { IoIosPeople as SizeIcon } from 'react-icons/io'

import { useForm, useFormState } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import { range } from '../../lib/helpers'

import { useDispatch, useSelector } from 'react-redux'
import { changeSize } from '../../redux/features/registerClassesSlice'


export default function Step3(props) {
  const router = useRouter();
  const dispatch = useDispatch()


  const { chosenLanguage, chosenClassType} = useSelector(state => state.registerClasses)

  const schema = yup.object().shape({
    classSize: yup.string().required("Please select a group size"),
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
      classSize: useSelector(state => state.registerClasses.size),
    },
    resolver: yupResolver(schema),
  })

  const { dirtyFields } = useFormState({
    control
  });

  const onSubmit = (data) => {
    dispatch(changeSize(data.classSize))
    router.push("/enroll/step4")
  }

  

  useEffect(() => {
    if(!chosenLanguage.title && !chosenClassType._id) {
      router.push("/enroll/step1") 
    }
  }, [chosenLanguage, chosenClassType])

  if(!chosenLanguage._id || !chosenClassType._id) {
    return <div>Loading...</div>
  }

  return (
    <FormPageContainer title="New Registration" step={3} steps={8}>
      <Form 
        className='flex flex-col gap-4 w-96'
        onSubmit={handleSubmit(onSubmit)}
        name="register-classes-step-3"
        register={register}
      >
        <h3 className='font-heading text-base'>How many students?</h3>

        <Select
          label="Group size"
          id="classSize"
          name="classSize"
          control={control}
          placeholder="Select size"
          options={
            chosenClassType 
            ? range(chosenClassType.min, chosenClassType.max, 1).map(o => (
              {value: `${o}`, label: `${o} student${o > 1 ? 's' : ''}`}
            ))
            : ""
          }
          isDirty={dirtyFields?.classSize || getValues("classSize")}
          error={errors?.classSize}
          register={register}
        >
          <SizeIcon />
        </Select>
        <div className='flex gap-4'>
          <button
            onClick={(e) => {
              e.preventDefault()
              dispatch(changeSize(getValues("classSize")))
              router.push('/enroll/step2')
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