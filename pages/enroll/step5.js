import React from 'react'
import { useRouter } from 'next/router';

import { 
  Select,
  Form,
  FormProgress
} from '../../components/form'

import { useForm, useFormState } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import { useDispatch, useSelector } from 'react-redux'
import { changeTimes } from '../../redux/features/registerClassesSlice'
import { TIME_OPTIONS } from '../../lib/constants';

export default function Step5(props) {
  const router = useRouter();
  const dispatch = useDispatch()

  const initialState = [...useSelector(state => state.registerClasses.days)]
  const chosenClassType = useSelector(state => state.registerClasses.chosenClassType)

  const createPricingOptions = () => {
    return chosenClassType.pricing.map(p => {
      return {value: `${p.duration}`, label: `${p.duration / 60} hour${p.duration > 60 ? 's' : ''}`}
    })
  }

  const schema = yup.object().shape({
    classes: yup.array().of(
      yup.object().shape({
          day: yup.string(),
          time: yup.string()
            .required('Time is required'),
          duration: yup.string()
            .required('Duration is required'),
      })
    )
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
      classes: useSelector(state => state.registerClasses.days),
    },
    resolver: yupResolver(schema),
  })

  const { dirtyFields } = useFormState({
    control
  });

   const onSubmit = (data) => {
      dispatch(changeTimes([...data.classes])) 
      router.push("/enroll/step6")
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
        <FormProgress title="Class times" step={5} steps={7} />
        {initialState.map((c, i) => (
          <fieldset className='flex flex-col gap-2 my-4'>
            <legend className='font-heading font-bold text-base mb-4'>{c.day}</legend>
            <Select
              label={`${c.day}'s duration:`}
              id={`classes[${i}].duration`}
              name={`classes[${i}].duration`}
              options={createPricingOptions()}
              control={control}
              placeholder="Choose class length"
              error={errors?.classes?.[i]?.duration}
              isDirty={dirtyFields?.classes?.[i]?.duration || getValues(`classes[${i}].duration`)}
              register={register}
            >
              {/* <DurationIcon /> */}
            </Select>
            <Select
              label={`${c.day}'s start time:`}
              id={`classes[${i}].time`}
              name={`classes[${i}].time`}
              options={TIME_OPTIONS}
              control={control}
              placeholder="Choose a starting time"
              disabled={getValues(`classes[${i}].duration`) == ""}
              error={errors?.classes?.[i]?.time}
              isDirty={dirtyFields?.classes?.[i]?.time || getValues(`classes[${i}].time`)}
              register={register}
            >
              {/* <TimeIcon /> */}
            </Select>
          </fieldset>
        ))}
        <div className='flex gap-4'>
          <button
            onClick={(e) => {
              e.preventDefault()
              dispatch(changeTimes([...getValues('classes')])) 
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
    </div>
  )
}


