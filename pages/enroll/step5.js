import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router';

import { 
  Radio,
  Form,
  FormPageContainer
} from '../../components/form'

import { useForm, useFormState, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import { calculateRegistrationPrice } from '../../lib/helpers';

import { useDispatch, useSelector } from 'react-redux'
import { changePackage } from '../../redux/features/registerClassesSlice'


export default function Step5(props) {
  const router = useRouter();
  const dispatch = useDispatch()

  // const [totalPrice, setTotalPrice] = useState(0)

  const { chosenClassType, chosenPackage, size, days, duration } = useSelector(state => state.registerClasses)

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
    dispatch(changePackage(chosenClassType.packages.find( ({ _id }) => _id === data.package)))
    router.push("/enroll/step6")
  }

  useEffect(() => {
    if(!duration) {
      router.push("/enroll/step1") 
    }
  }, [duration])
  
  if(!duration) {
    return <div>Loading...</div>
  }

  // useEffect(() => {
  //   if(getValues("package")) {
  //     setTotalPrice(calculateRegistrationPrice(chosenClassType, duration, size, chosenClassType.packages.find(({ _id }) => _id === getValues("package"))))
  //   }
  // }, [watch()])

  return (
    <FormPageContainer step={5} steps={8}>
      <Form 
        className='flex flex-col gap-4 w-96'
        onSubmit={handleSubmit(onSubmit)}
        name="register-classes-step-5"
        register={register}
      >
        <fieldset className='flex grid auto-rows-fr gap-2 my-4'>
          <legend className='font-heading text-base mb-4'>Choose a package:</legend>
          {chosenClassType?.packages?.map(p => {
            let priceObject = calculateRegistrationPrice(chosenClassType, duration, size, chosenClassType.packages.find(({ _id }) => _id === p._id))
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
          {errors?.package && <p className='rounded-md bg-error-100 py-2 px-4 font-heading text-sm text-error-400'>{errors.package.message}</p>}
        </fieldset>
        {/* {totalPrice > 0 && (
          <h2 className='text-right text-primary font-heading font-bold text-xl'>
            Total: ${totalPrice}
          </h2>
        )} */}
        <div className='flex gap-4'>
          <button
            onClick={(e) => {
              e.preventDefault()
              dispatch(changePackage(chosenClassType.packages.find( ({ _id }) => _id === getValues('package'))))
              router.push('/enroll/step4')
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

