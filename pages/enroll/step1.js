import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router';
import { getAllLanguageData } from '../../lib/api';

import { 
  Select,
  Radio,
  Form,
  FormProgress,
} from '../../components/form'

import Link from 'next/link';

import { IoMdArrowBack as BackArrow } from 'react-icons/io'

import { useForm, useFormState } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import { useDispatch, useSelector } from 'react-redux'
import { changeLanguage } from '../../redux/features/registerClassesSlice'
import UserDropdown from '../../components/user-dropdown';


export default function Step1({ languageData }) {
  const router = useRouter();
  const dispatch = useDispatch()

  console.log("Language data", languageData)

  const schema = yup.object().shape({
    language: yup.string().required("Please select a language"),
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
      language: useSelector(state => state.registerClasses.chosenLanguage)?._id || ''
    },
    resolver: yupResolver(schema),
  })

  const { dirtyFields } = useFormState({
    control
  });

   const onSubmit = (data) => {
      dispatch(changeLanguage(languageData.find( ({ _id }) => _id === data.language)))
      router.push("/enroll/step2")
   }

  return (
    <div>
      <div className='container mx-auto px-5 flex justify between py-8'>
        <Link href={router.query?.source || '/'}>
          <a className='flex-1 flex items-center text-grey-600 underline hover:text-grey-700 transition-all duration-100 w-6 h-6 mr-2 font-heading font-bold'><BackArrow className='fill-current w-6 h-6 mr-1'/> Back</a>
        </Link>
        <p className='flex-1 text-right'><UserDropdown /></p>
      </div>
      <div className='h-full flex items-center justify-center my-24'>
        <Form 
          className='flex flex-col gap-4'
          onSubmit={handleSubmit(onSubmit)}
          name="register-classes-step-1"
          register={register}
        >
          <h1 className='text-primary font-heading font-bold text-4xl'>Register for classes</h1>
          <FormProgress title="Language selection" step={1} steps={7} />

          <fieldset className='flex flex-col gap-2 my-4'>
            <legend className='font-heading text-base mb-4'>Choose a language:</legend>
            {languageData && languageData.map(l => (
              <Radio 
                key={l._id}
                id={l.title} 
                label={l.title}
                name="language" 
                value={l._id}
                error={errors?.language}
                isDirty={isDirty?.language}
                register={register}
              />
            ))}
            {errors?.language && <p className='rounded-md bg-error-100 py-2 px-4 font-heading text-sm text-error-400'>{errors.language.message}</p>}
          </fieldset>
          <button type="submit" className='bg-accent hover:bg-accent-400 text-primary font-bold font-heading py-5 px-5 rounded'>Next</button>
          {/* <pre>{JSON.stringify(watch(), null, 2)}</pre>
          <div>{JSON.stringify(errors)}</div>
          <div>{isValid.toString()}</div> */}
        </Form>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const languageData = await getAllLanguageData()
  return {
    props: {
      languageData,
    },
    revalidate: 1
  }
}


