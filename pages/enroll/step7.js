import React, { useEffect } from 'react'
import { useRouter } from 'next/router';

import { 
  Select,
  Form,
  FormPageContainer,
  InputRadio,
  RadioOption
} from '../../components/form'

import { useForm, useFormState } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import { getAllTeachersByLanguage } from '../../lib/api';

import { useDispatch, useSelector } from 'react-redux'
import { changeTimes } from '../../redux/features/registerClassesSlice'
import { TIME_OPTIONS } from '../../lib/constants';
import { convertMinutesToTimeString, convertTimeStringToMinutes } from '../../lib/helpers';
import { useAllTeachersByLanguage } from '../../lib/swr'

export default function Step7(props) {
  const router = useRouter();
  const dispatch = useDispatch()

  const { days, chosenClassType, chosenLanguage, duration } = useSelector(state => state.registerClasses)

  const { teachers, isError, isLoading } = useAllTeachersByLanguage(chosenLanguage?._id)
  

  const initialState = [...days]

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
    router.push("/enroll/step8")
  }

  useEffect(() => {
    if(!days.length) {
      router.push("/enroll/step1") 
    }
  }, [days])
  
  if(!days.length) {
    return <div>Loading...</div>
  }

  const getTimeOptions = (day) => {
    let timeSlots = teachers?.[0]?.availability?.[day.toLowerCase()]
    let intervals = timeSlots?.map(ts => {
      let start = convertTimeStringToMinutes(ts.start)
      let end = convertTimeStringToMinutes(ts.end)
      let dur_num = parseInt(duration, 10)

      let intervalArray = []

      for(let i = start; (i + dur_num) <= end; i+=30) {
        console.log(i)
        let startString = convertMinutesToTimeString(i)
        let endString = convertMinutesToTimeString(i + dur_num)
        intervalArray.push({value: startString, label: `${startString.slice(0, 5)}-${endString.slice(0,5)}` })
      }
      return intervalArray
    })
    return intervals?.flat()
  }


  return (
    <FormPageContainer step={7} steps={8}>

      <Form 
        className='flex flex-col gap-4 w-96'
        onSubmit={handleSubmit(onSubmit)}
        name="register-classes-step-2"
        register={register}
      >
        <p className='w-full text-center'>Timezone: <span>America/Denver</span></p>
        {initialState.map((c, i) => (
          <div className='flex flex-col gap-4 my-4'>
            <h3 className='font-heading font-bold text-base text-center'>{c.day}</h3>
            {/* <fieldset className='flex flex-col gap-2 mb-2'>
              <legend className='font-heading font-bold text-sm mb-2'>Duration:</legend>
              {chosenClassType.pricing.map(p => (
                <InputRadio 
                  label={`${p.duration} minute${p.duration > 1 ? 's' : ''}`}
                  id={`${c.day}-${p._key}`}
                  name={`classes[${i}].duration`}
                  register={register}
                />
              ))}

            </fieldset> */}
            <fieldset className='flex flex-col gap-2 mb-2'>
              <legend className='font-heading font-bold text-primary text-sm mb-2'>Available times:</legend>
            {getTimeOptions(c.day)?.map(t => (
              <RadioOption 
                id={`${t.value}-classes[${i}].time`}
                name={`classes[${i}].time`}
                value={t.value}
                register={register}
                label={t.label}
              />
            ))}
            </fieldset>

            {/* <Select
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
            </Select> */}
            {/* <Select
              label={`Available times:`}
              id={`classes[${i}].time`}
              name={`classes[${i}].time`}
              options={TIME_OPTIONS}
              control={control}
              placeholder="Choose a time slot"
              disabled={getValues(`classes[${i}].duration`) == ""}
              error={errors?.classes?.[i]?.time}
              isDirty={dirtyFields?.classes?.[i]?.time || getValues(`classes[${i}].time`)}
              register={register}
            >
            </Select> */}
          {errors?.classes?.[i] && <p className='rounded-md bg-error-100 py-2 px-4 font-heading text-sm text-error-400'>{errors.classes[i]?.time?.message}</p>}

          </div>
        ))}

        <div className='flex gap-4'>
          <button
            onClick={(e) => {
              e.preventDefault()
              dispatch(changeTimes([...getValues('classes')])) 
              router.push('/enroll/step6')
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
        <pre>{JSON.stringify(watch(), null, 2)}</pre>
        <div>{JSON.stringify(errors)}</div>
        <div>{isValid.toString()}</div>
      </Form>
    </FormPageContainer>
  )
}
