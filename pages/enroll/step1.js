import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router';
import { getAllLanguageData } from '../../lib/api';
import Layout from 'components/layout'
import Head from 'next/head'

import { 
  Radio,
  Form,
  FormPageContainer
} from 'components/form'

import Flag from 'react-world-flags';

import { useForm, useFormState } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { useSession } from "next-auth/react";


import { useDispatch, useSelector } from 'react-redux'
import { changeLanguage } from '../../redux/features/registerClassesSlice'


export default function Step1({ languageData }) {
  const router = useRouter();
  const dispatch = useDispatch()

  const { data: session } = useSession()

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
    <Layout hideNav={true}>
      <Head>
        <title>Enrollment | Select your course details</title>
      </Head>
      <FormPageContainer title="Course Enrollment" step={1} steps={8}>
        <Form 
          className='flex-1 max-h-max flex flex-col gap-4 w-full'
          onSubmit={handleSubmit(onSubmit)}
          name="register-classes-step-1"
          register={register}
        >            
          <fieldset className='flex-1 flex flex-col gap-2 my-4'>
            <legend className='font-heading text-base mb-4'>Choose a language:</legend>
            {languageData && languageData.map(l => (
              <Radio 
                key={l._id}
                id={l._id} 
                label={(
                  <span className='flex items-center'>
                    <div className='flex rounded-sm overflow-hidden h-5 w-9 mr-4'>
                      <Flag code={l.code} width="120" style={{objectFit: 'cover'}} />
                    </div>
                    {l.title}
                  </span>
                )}
                name="language" 
                value={l._id}
                error={errors?.language}
                isDirty={getValues('language')}
                register={register}
                className='py-8'
              >
              </Radio>
            ))}
            {errors?.language && <p className='rounded-md bg-error-100 py-2 px-4 font-heading text-sm text-error-400'>{errors.language.message}</p>}
          </fieldset>
          <button type="submit" className='bg-accent hover:bg-accent-400 text-primary font-bold font-heading py-5 px-5 rounded'>Next</button>
          {/* <pre>{JSON.stringify(watch(), null, 2)}</pre>
          <div>{JSON.stringify(errors)}</div>
          <div>{isValid.toString()}</div> */}
        </Form>
      </FormPageContainer>
    </Layout>
  )
}

Step1.auth = true

export async function getStaticProps() {
  const languageData = await getAllLanguageData()
  return {
    props: {
      languageData,
    },
    revalidate: 1
  }
}


