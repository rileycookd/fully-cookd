import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router';
import Layout from 'components/layout';
import Head from 'next/head';

import { 
  FormPageContainer
} from 'components/form'
import Link from 'next/link'

import { IoMail as MailIcon, IoCheckmarkCircle as SuccessIcon, IoWarning as ErrorIcon} from 'react-icons/io5'
import { IoLogoWhatsapp as WhatsappIcon } from 'react-icons/io'

export default function Error({ languageData }) {
  const router = useRouter();


  return (
    <Layout hideNav={true}>
      <Head>
        <title>Enrollment Error</title>
      </Head>
      <FormPageContainer>
        <div
          className='flex-1 flex flex-col gap-4 w-96 py-4'
        >            
          <h3 className='mr-11 flex items-center font-heading text-xl font-bold text-primary'>
            <ErrorIcon className='h-8 w-8 fill-error mr-3' /> Enrollment error
          </h3>
          <p className='font-body text-base text-primary mb-6'>We're sorry, but we couldn't add your classes at this time. Please try contacting us directly.</p>
          <p className='flex items-center font-body text-base text-primary'>
            <WhatsappIcon className='fill-secondary w-6 h-6 mr-3'/> +56 9 5555 5555
          </p>
          <p className='flex items-center font-body text-base text-primary'>
            <MailIcon className='fill-secondary w-6 h-6 mr-3'/> hola@luzdamelio.com
          </p>
          <Link href='/enroll/step1'>
          <a type="submit" className='mt-8 bg-grey-400 text-center hover:bg-grey-500 text-primary font-bold font-heading py-5 px-5 rounded'>Try again</a>
          </Link>
        </div>
      </FormPageContainer>
    </Layout>
  )
}