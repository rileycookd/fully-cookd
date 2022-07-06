import React, { useState, useEffect } from 'react'

import {
  InputField,
  Textarea,
  Radio,
  Form
} from 'components/form'

import { useRouter } from 'next/router';
import { useForm, useFormState } from 'react-hook-form';
import { IoPersonOutline as PersonIcon, IoMailOutline as MailIcon, } from 'react-icons/io5'
import { BsQuestionCircle as SubjectIcon } from 'react-icons/bs'
import { IoMdCheckmark } from 'react-icons/io'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';



export default function ContactForm(props) {

  const [isFormReadOnly, setIsFormReadOnly] = useState(false)
  const [formSubmitState, setFormSubmitState] = useState('')

  const router = useRouter();

  const schema = yup.object().shape({
    name: yup.string().required("Please enter your full name"),
    email: yup.string().email("Please enter a valid email").required("Please enter your email"),
    message: yup.string().required("Please enter a message"),
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
      name: '',
      email: '',
      message: '',
    },
    resolver: yupResolver(schema),
  })

   const { dirtyFields } = useFormState({
    control
  });

  const onSubmit = async ({ name, email, message }) => {
    setIsFormReadOnly(true)

    let contactForm
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({ name: name, email: email, message: message }),
        type: 'application/json'
      })
      const resData = await res.json()
      contactForm = resData.data
      setFormSubmitState('success')
      console.log("SUCCESS! ", contactForm)
    } catch (err) {
      setFormSubmitState('error')
      console.log("ERROR!", err)
    }  
    
  };

  if(formSubmitState === 'success') {
    return (
      <div className='flex flex-col items-center h-max min-w-lg gap-4 bg-secondary-100 p-12 rounded-md'>
        <h1 className='ml-8 flex items-center gap-2 font-heading font-bold text-lg'> Message received <span><IoMdCheckmark className='w-6 h-6 fill-accent' /></span></h1>
        <p className='font-body text-grey-800'>We'll get back to you as soon as we can</p>
      </div>
    )
  }

  if(formSubmitState === 'error') {
    return (
      <div className='flex flex-col items-center h-max min-w-lg gap-4 bg-secondary-100 p-12 rounded-md'>
        <h1 className='flex items-center gap-2 font-heading font-bold text-lg'> Hm, something went wrong </h1>
        <p className='font-body text-grey-800'>Try sending an email to us directly</p>
        <p className='font-body text-grey-800 flex items-center gap-2'><MailIcon className='stroke-accent w-4 h-4'/> hello@fullycookd.com</p>
        <h3 className='mt-12 font-heading font-bold'>Your message:</h3>
        <p className='text-left w-full font-body text-grey-800'>{getValues('message')}</p>
      </div>
    )
  }

  return (
    <Form 
      className='flex flex-col h-max min-w-lg gap-12 bg-secondary-100 p-12 rounded-md'
      onSubmit={handleSubmit(onSubmit)}
      name="register-classes-step-1"
      register={register}
    >
      {/* <h1 className='text-primary font-heading font-bold text-base mb-4'>Send us a message</h1> */}
        <InputField
          label="Full name:"
          name="name"
          placeholder="Your name here" 
          id="name"
          type="text"
          readOnly={isFormReadOnly}
          error={errors?.name}
          register={register}
          isDirty={dirtyFields?.name || getValues('name')}
        >
          <PersonIcon />
        </InputField>
        <InputField
          label="Email:"
          name="email"
          placeholder="you@email.com" 
          id="email"
          type="text"
          readOnly={isFormReadOnly}
          error={errors?.email}
          register={register}
          isDirty={dirtyFields?.email || getValues('email ')}
        >
          <MailIcon />
        </InputField>
        <Textarea
          label="Message:"
          name="message"
          placeholder="Message" 
          id="message"
          rows="5"
          readOnly={isFormReadOnly}
          error={errors?.message}
          register={register}
          isDirty={dirtyFields?.email || getValues('email ')}
        >
        </Textarea>
        <button 
          type="submit"
          disabled={isFormReadOnly} 
          className={`${isFormReadOnly ? 'bg-grey-200 text-grey-400' : 'bg-secondary hover:bg-secondary-700 text-primary'} font-bold font-heading transition-colors duration-100 py-5 px-5 rounded`}
        >
          Send message
        </button>
      {/* <pre>{JSON.stringify(watch(), null, 2)}</pre>
      <div>{JSON.stringify(errors)}</div>
      <div>{isValid.toString()}</div> */}
    </Form>
  )
}