import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router';

import { 
  Radio,
  Form,
  FormProgress
} from '../../components/form'

import { useForm, useFormState, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import { calculateRegistrationPrice } from '../../lib/helpers';

import { useDispatch, useSelector } from 'react-redux'
import { changePackage } from '../../redux/features/registerClassesSlice'


export default function Step6(props) {
  const router = useRouter();
  const dispatch = useDispatch()

  const [totalPrice, setTotalPrice] = useState(0)

  const { chosenClassType, chosenPackage, size, days} = useSelector(state => state.registerClasses)

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
    router.push("/enroll/step7")
  }

  useEffect(() => {
    if(getValues("package")) {
      setTotalPrice(calculateRegistrationPrice(chosenClassType, days, size, chosenClassType.packages.find(({ _id }) => _id === getValues("package"))))
    }
  }, [watch()])

  return (
    <div className='h-full min-h-screen w-full flex items-center justify-center my-12'>
      <Form 
        className='flex flex-col gap-4'
        onSubmit={handleSubmit(onSubmit)}
        name="register-classes-step-6"
        register={register}
      >
        <h1 className='text-primary font-heading font-bold text-4xl'>Register for classes</h1>
        <FormProgress title="Package selection" step={6} steps={7} />
        <fieldset className='flex flex-col gap-2 my-4'>
          <legend className='font-heading text-base mb-4'>Choose a package:</legend>
          {chosenClassType?.packages?.map(p => (
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
                <p className='flex-1 font-heading font-normal text-right text-base text-grey-600'>${calculateRegistrationPrice(chosenClassType, days, size, chosenClassType.packages.find(({ _id }) => _id === p._id))}</p>
                {p.discount > 0 && (
                  <p className='flex-1 font-heading font-normal text-right text-base text-grey-600'>
                    (save {p.discount}%)
                  </p>
                )}
              </div>

            </Radio>
          ))}
          {errors?.package && <p className='rounded-md bg-error-100 py-2 px-4 font-heading text-sm text-error-400'>{errors.package.message}</p>}
        </fieldset>
        {totalPrice > 0 && (
          <h2 className='text-right text-primary font-heading font-bold text-xl'>
            Total: ${totalPrice}
          </h2>
        )}
        <div className='flex gap-4'>
          <button
            onClick={(e) => {
              e.preventDefault()
              dispatch(changePackage(chosenClassType.packages.find( ({ _id }) => _id === getValues('package'))))
              router.push('/enroll/step5')
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
