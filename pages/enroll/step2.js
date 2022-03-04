import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { getAllLanguageData } from '../../lib/api';

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
import { changeClassType } from '../../redux/features/registerClassesSlice'


export default function Step2(props) {
  const router = useRouter();
  const dispatch = useDispatch()

  const [isPageLoaded, setIsPageLoaded] = useState(false)

  const chosenLanguage = useSelector(state => state.registerClasses.chosenLanguage)
  const classTypes = chosenLanguage?.classTypes?.length 
  ? [...chosenLanguage.classTypes]
  : []

  useEffect(() => {
    if(!chosenLanguage.title) {
      router.push("/enroll/step1") 
    } else {
      setIsPageLoaded(true)
    }
  }, [chosenLanguage])

  const schema = yup.object().shape({
    classType: yup.string().required("Please select a course"),
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
      classType: useSelector(state => state.registerClasses.chosenClassType)?._id || '',
    },
    resolver: yupResolver(schema),
  })

  const { dirtyFields } = useFormState({
    control
  });

   const onSubmit = (data) => {
      dispatch(changeClassType(classTypes.find( ({ _id }) => _id === data.classType)))
      router.push("/enroll/step3")
   }
  
  if(!isPageLoaded) {
    return (<div>Loading...</div>)
  }

  return (
    <FormPageContainer step={2} steps={8}>

      <Form 
        className='flex flex-col gap-4 w-96'
        onSubmit={handleSubmit(onSubmit)}
        name="register-classes-step-2"
        register={register}
      >
        <fieldset className='flex flex-col gap-2 my-4'>
          <legend className='font-heading text-base mb-4'>Choose a course:</legend>
          {classTypes && classTypes.map(ct => (
            <Radio 
              key={ct._id}
              id={ct.title} 
              label={ct.title}
              name="classType" 
              value={ct._id}
              error={errors?.classType}
              isDirty={isDirty?.classType}
              register={register}
            />
          ))}
          {errors?.classType && <p className='rounded-md bg-error-100 py-2 px-4 font-heading text-sm text-error-400'>{errors.classType.message}</p>}
        </fieldset>
        <div className='flex gap-4'>
          <button
            onClick={(e) => {
              e.preventDefault()
              let chosenClassType = getValues("classType")
              if(chosenClassType) dispatch(changeClassType(classTypes.find( ({ _id }) => _id === chosenClassType)))
              router.push('/enroll/step1')
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


