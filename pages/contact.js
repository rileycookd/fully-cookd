import React, { useState } from 'react'

import Layout from '../components/layout'
import Head from 'next/head'

import { useRouter } from 'next/router';
import { signIn, useSession, getSession } from 'next-auth/react';
import { Magic } from 'magic-sdk';
import { useForm, useFormState } from 'react-hook-form';
import { useEffect } from "react";
import { IoPerson as PersonIcon, IoMail as MailIcon, IoLogoInstagram as InstagramIcon, IoLogoYoutube as YoutubeIcon, IoCheckmarkCircle as SuccessIcon, IoWarning as ErrorIcon} from 'react-icons/io5'
import { ImPhone as PhoneIcon, ImFacebook as FacebookIcon } from 'react-icons/im'
import { IoLogoWhatsapp as WhatsappIcon } from 'react-icons/io'

import Link from 'next/link'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

import {
  InputField,
  Select,
  Textarea,
  Form
} from '../components/form'


export default function Contact({ }) {

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
      const res = await fetch('/api/form/contact', {
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

  
  return (
    <>
      <Layout>
        <Head>
          <title>Contact us | Amelio Language Institute</title>
        </Head>
        <div className='flex-1 flex bg-primary min-h-full'>
          <div className='flex container mx-auto px-5 my-24'>
            <div className='flex-1 flex flex-col justify-between'>
              <div className='flex flex-col gap-8'>
                <h1 className='font-heading text-5xl text-white font-bold'>Contact us</h1>
                <p className='font-body text-base text-grey-700 max-w-md '>Send us a message and we'd be happy to give you more information or schedule a meeting.</p>
              </div>

              <div className='flex flex-col w-max'>
                <div className='flex w-full items-center p-4 cursor-pointer rounded-md border-2 border-transparent hover:border-grey-800'>
                  <WhatsappIcon className='text-secondary w-5 h-5 mr-4'/>
                  <p className='font-body text-base text-grey-700'>+56 9 5555 5555</p>
                </div>
                <div className='flex w-full items-center p-4 cursor-pointer rounded-md border-2 border-transparent hover:border-grey-800'>
                  <MailIcon className='text-secondary w-5 h-5 mr-4'/>
                  <p className='font-body text-base text-grey-700'>hola@luzdamelio.com</p>
                </div>
              </div>

              <div className='ml-4 flex gap-6 text-grey-800'>
                <a target="_blank" href="https://www.instagram.com/spanishlessonsbyluz/" className='hover:text-grey-600 transition-colors duration-100' rel="noopener noreferrer">
                  <InstagramIcon className='w-8 h-8'/>
                </a>
                <a target="_blank" href="https://www.facebook.com/ameliolanguageinstitute" className='hover:text-grey-600 transition-colors duration-100' rel="noopener noreferrer">
                  <FacebookIcon className='w-8 h-8' />
                </a>
                <a target="_blank" href="https://www.youtube.com/channel/UCOMOGxsNHZOq8DJETweqbuA" className='hover:text-grey-600 transition-colors duration-100' rel="noopener noreferrer">
                  <YoutubeIcon className='w-8 h-8' />
                </a>

              </div> 
            </div>

            <div className='px-6 py-8 rounded-md bg-white w-full max-w-md h-max'>
              {formSubmitState === 'success' ? (
                <div className='flex flex-col gap-4'>
                  <h3 className='mr-11 flex items-center font-heading text-xl font-bold text-primary'>
                    <SuccessIcon className='h-8 w-8 fill-success mr-3' /> Message sent
                  </h3>
                  <p className='font-body text-base text-primary'>Thank you for contacting us. We will be in touch with you within the next business day.</p>
                </div>
              ) : formSubmitState === 'error' ? (
                <div className='flex flex-col gap-4'>
                  <h3 className='mr-11 flex items-center font-heading text-xl font-bold text-primary'>
                    <ErrorIcon className='h-8 w-8 fill-error mr-3' /> Message not sent
                  </h3>
                  <p className='font-body text-base text-primary mb-6'>We're sorry, but we couldn't send your message. Please try again or contact us by WhatsApp or email.</p>
                  <p className='flex items-center font-body text-base text-primary'>
                    <WhatsappIcon className='fill-secondary w-6 h-6 mr-3'/> +56 9 5555 5555
                  </p>
                  <p className='flex items-center font-body text-base text-primary'>
                    <MailIcon className='fill-secondary w-6 h-6 mr-3'/> hola@luzdamelio.com
                  </p>
                  <button 
                    onClick={() => {
                      setIsFormReadOnly(false)
                      setFormSubmitState('')
                    }}
                    className='mt-8 flex-1 bg-grey-400 hover:bg-grey-500 text-primary font-bold font-heading py-5 px-5 rounded'
                  >
                    Try again?
                  </button>
                </div>
              ) : (
                <Form 
                  className='flex flex-col gap-4'
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
                      className={`${isFormReadOnly ? 'bg-grey-200 text-grey-400' : 'bg-accent hover:bg-accent-400 text-primary'} font-bold font-heading py-5 px-5 rounded`}
                    >
                      Send message
                    </button>
                  {/* <pre>{JSON.stringify(watch(), null, 2)}</pre>
                  <div>{JSON.stringify(errors)}</div>
                  <div>{isValid.toString()}</div> */}
                </Form>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

// export async function getStaticProps() {
//   const pageBlocks = await getPageBlocks('homepage')
//   const footer = await getPageFooter('homepage')
//   const languageData = await getAllLanguageData()
//   return {
//     props: { footer, pageBlocks, languageData },
//     revalidate: 1
//   }
// }
