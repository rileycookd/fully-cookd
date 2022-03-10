import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router';
import Layout from 'components/layout'
import Head from 'next/head'

import { 
  FormPageContainer
} from '../../components/form'
import Link from 'next/link'

import { IoMail as MailIcon, IoCheckmarkCircle as SuccessIcon, IoWarning as ErrorIcon} from 'react-icons/io5'
import { IoLogoWhatsapp as WhatsappIcon } from 'react-icons/io'

export default function Success({ languageData }) {
  const router = useRouter();


  return (
    <Layout hideNav={true}>
      <Head>
        <title>Enrollment received</title>
      </Head>
      <FormPageContainer>
        <div
          className='flex-1 flex flex-col gap-4 w-full py-4'
        >            
          <h3 className='flex flex-col gap-2 items-center font-heading text-xl font-bold text-primary'>
            <SuccessIcon className='h-12 w-12 fill-success mr-3' /> Enrollment received
          </h3>
          <p className='font-body max-w-md text-base text-primary'>We will be contacting you within 1 business day to confirm your registration details.</p>
          <Link href='/students'>
            <a type="submit" className='mt-8 bg-grey-400 text-center hover:bg-grey-500 text-primary font-bold font-heading py-5 px-5 rounded'>Go to Dashboard</a>
          </Link>
        </div>
      </FormPageContainer>
    </Layout>
  )
}