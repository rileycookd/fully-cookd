import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router';
import Layout from 'components/layout'
import Head from 'next/head';

import { 
  Radio,
  Form,
  FormPageContainer
} from 'components/form'

import { useForm, useFormState, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import { useDispatch, useSelector } from 'react-redux'
import { changePackage, changeRegistration } from 'redux/features/addClassesSlice'

import { useRegistrationById } from 'lib/swr';

import { calculateRegistrationPrice } from 'lib/helpers';


export default function Step1(props) {
  const router = useRouter();
  const dispatch = useDispatch()
  const registrationId = router.asPath.split('/').slice(-2)[0]

  // const [totalPrice, setTotalPrice] = useState(0)

  const { chosenPackage } = useSelector(state => state.addClasses)

  const { data: registration, isLoading, isError } = useRegistrationById(registrationId)

  const schema = yup.object().shape({
    package: yup.string().required("Please select a package"),
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
      package: chosenPackage?._id || "",
    },
    resolver: yupResolver(schema),
  })

  const { dirtyFields } = useFormState({
    control
  });

  const onSubmit = (data) => {
    dispatch(changePackage(registration.classType.packages.find( ({ _id }) => _id === data.package)))
    router.push(`${router.asPath}/confirm`)
  }

  useEffect(() => {
    if(!isLoading && registration.classType) dispatch(changeRegistration({...registration}))
  }, [registration])
  
  // if(!duration) {
  //   return <div>Loading...</div>
  // }


  return (
    <Layout hideNav={true}>
    <Head>
      <title>Add classes | Select your package</title>
    </Head>
      <FormPageContainer title='Add classes'>
        <Form 
          className='flex flex-col gap-4 w-96'
          onSubmit={handleSubmit(onSubmit)}
          name="add-classes"
          register={register}
        >
          <fieldset className='grid auto-rows-fr gap-2 my-4'>
            <legend className='font-heading text-base mb-4'>Choose a package:</legend>
            {registration?.classType?.packages?.map(p => {
              let priceObject = calculateRegistrationPrice(registration.classType, 60, registration.students?.length, registration.classType.packages.find(({ _id }) => _id === p._id))
              return (
                <Radio 
                  key={p._id}
                  id={p.title} 
                  label={`${p.quantity} class${p.quantity > 1 ? 'es' : ''}`}
                  name="package" 
                  value={p._id}
                  error={errors?.package}
                  isDirty={isDirty?.package}
                  register={register}
                >
                  <div className='flex-1 ml-4 flex flex-col justify-end w-max'>
                    {priceObject.beforePrice > priceObject.price && (
                      <p className='flex-1 font-heading font-normal text-right text-sm text-grey-600 line-through'>${priceObject.beforePrice}</p>
                    )} 
                    <p className='flex-1 font-heading font-medium text-right text-base text-secondary'>${priceObject.price}</p>
                    {p.discount > 0 && (
                      <p className='flex-1 font-heading font-normal text-right text-sm text-grey-600'>
                        (save {p.discount}%)
                      </p>
                    )}
                  </div>

                </Radio>
              )
            })}
          </fieldset>
          {errors?.package && <p className='rounded-md bg-error-100 py-2 px-4 h-max font-heading text-sm -mt-4 mb-4 text-error-400'>{errors.package.message}</p>}
          {/* {totalPrice > 0 && (
            <h2 className='text-right text-primary font-heading font-bold text-xl'>
              Total: ${totalPrice}
            </h2>
          )} */}
          <div className='flex gap-4'>
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
    </Layout>
  )
}

Step1.auth = true

