import React, { useState, useEffect, useRef } from 'react'

import { 
  Select,
  Form
} from '../../components/form'

import { useForm, useFormState } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { useRouter } from 'next/router'

import { range } from '../../lib/helpers'
import { IoLanguage as LanguageIcon, IoSchool as ClassTypeIcon, } from 'react-icons/io5'
import { IoIosPeople as ClassSizeIcon } from 'react-icons/io'

import { useDispatch, useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'
import { changeLanguage, changeQuantity, changeClassType, changeSize } from 'redux/features/registerClassesSlice'
import { showModal, clearModal } from 'redux/features/modalSlice'
import { useLanguages } from 'lib/swr'




function CTAForm(props) {
  const { 
    initialValues,
    className
  } = props

  const [currentLanguage, setCurrentLanguage] = useState('')
  const [currentClassType, setCurrentClassType] = useState('')
  const [classTypeOptions, setClassTypeOptions] = useState([])
  const [classSizeOptions, setClassSizeOptions] = useState([])

  const router = useRouter()
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const { languages, isError, isLoading } = useLanguages()


  console.log("ROUTER: ", router)

  const schema = yup.object().shape({
    language: yup.string().required("Please select a language"),
    classType: yup.string().required("Please select a course"),
    classSize: yup.string().required("Please select number of students")
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
      language: '',
      classSize: '',
      classType: ''
    },
    resolver: yupResolver(schema),
  })

  const { dirtyFields } = useFormState({
    control
  });

  const onSubmit = (data) => {
    let chosenLanguageData = languages.find( ({ _id }) => _id === data.language)
    dispatch(changeLanguage(chosenLanguageData))
    dispatch(changeClassType(chosenLanguageData.classTypes.find( ({ _id }) => _id === data.classType)))
    dispatch(changeSize(data.classSize))
    if(!session) {
      dispatch(showModal('SIGNUP'))
      router.push({
        pathname: router.asPath,
        query: { callbackUrl: `${router.basePath}/enroll/step1` }
      }, 
      router.asPath, { shallow: true }
      )
    } else {
      router.push('/enroll/step1')
    }
  }
  
  useEffect(() => {
    const subscription = watch((data) => {
      if(data?.language !== currentLanguage) {
        setCurrentLanguage(data.language)
      }
      if(data?.classType !== currentClassType) {
        setCurrentClassType(data.classType)
      }
    })

    return () => {
      subscription.unsubscribe();
    }
  }, [watch])

  useEffect(() => {
    if(currentLanguage) {
      reset({
        ...getValues(),
        classType: '',
        classSize: ''
      })
      let currentLanguageData = languages.find(l => l._id === currentLanguage)
      setClassTypeOptions(currentLanguageData?.classTypes?.map(ct => (
        {value: ct._id, label: ct.title}
      )))
    }
  }, [currentLanguage])

  useEffect(() => {
    if(currentClassType) {
      reset({
        ...getValues(),
        classSize: ''
      })
      let {min, max} = languages.find(l => l._id === currentLanguage).classTypes.find(ct => ct._id === currentClassType)
      setClassSizeOptions(range(min, max, 1).map(o => (
        {value: `${o}`, label: `${o} student${o > 1 ? 's' : ''}`}
      )))
    }
  }, [currentClassType])

  return (
    <div className={`flex justify-center md:justify-start`}>
      {languages?.length && (
        <Form
          className={`hidden md:flex flex-1 gap-2 lg:gap-4 px-3 py-3 rounded-md border border-grey-400 w-full z-20 relative bg-white ${className}`}
          onSubmit={handleSubmit(onSubmit)}
          name="add-registration-form-step-1"
          register={register}
        >
          <Select 
            label='Language'
            name='language'
            placeholder='Select a language'
            options={
              languages?.map(language => (
                {value: language._id, label: language.title}
              ))
            }
            register={register}
            control={control}
            error={errors?.language}
            hideError={true}
            isDirty={dirtyFields?.language || getValues("language")}
          >
            {/* <LanguageIcon /> */}
          </Select>
          <Select 
            label='Course'
            name='classType'
            placeholder='Select a course'
            options={classTypeOptions}
            register={register}
            control={control}
            disabled={!getValues("language")}
            error={errors?.classType}
            hideError={true}
            isDirty={dirtyFields?.classType || getValues("classType")}
          >
            {/* <ClassTypeIcon /> */}
          </Select>
          <Select 
            label='Students'
            name='classSize'
            placeholder='Select class size'
            options={classSizeOptions}
            register={register}
            control={control}
            disabled={!getValues("classType")}
            error={errors?.classSize}
            hideError={true}
            isDirty={dirtyFields?.classSize || getValues("classSize")}
          >
            {/* <ClassSizeIcon /> */}
          </Select>
          <button 
            type="submit" 
            className='bg-accent hover:bg-accent-400 text-primary text-sm lg:text-base font-bold w-max font-heading px-5 lg:py-5 lg:px-8 rounded'
          >
            Enroll
          </button>
        </Form>
      )}
      <button 
        onClick={() => {
          if(!session) {
            dispatch(showModal('SIGNUP'))
            router.push({
              pathname: router.asPath,
              query: { callbackUrl: `${router.basePath}/enroll/step1` }
            }, 
            router.asPath, { shallow: true }
            )
          } else {
            router.push('/enroll/step1')
          }
        }}
        className='flex md:hidden bg-accent hover:bg-accent-400 text-primary text-sm lg:text-base font-bold w-max font-heading px-12 py-5 lg:py-5 lg:px-8 rounded'
      >
        Enroll now
      </button>
{/*       
        <pre>{JSON.stringify(watch(), null, 2)}</pre>
        <div>{JSON.stringify(errors)}</div>
        <div>{isValid.toString()}</div> */}
    </div>
  )
}

export default CTAForm
