import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router';

import { 
  FormPageContainer
} from 'components/form'
import Link from 'next/link'

import { IoMail as MailIcon, IoCheckmarkCircle as SuccessIcon, IoWarning as ErrorIcon} from 'react-icons/io5'
import { IoLogoWhatsapp as WhatsappIcon } from 'react-icons/io'

export default function Success() {
  const router = useRouter();

  return (
    <FormPageContainer>
      <div
        className='flex-1 flex flex-col gap-4 w-96 py-4'
      >            
        <h3 className='mr-11 flex items-center font-heading text-xl font-bold text-primary'>
          <SuccessIcon className='h-8 w-8 fill-success mr-3' /> Registration received
        </h3>
        <p className='font-body text-base text-primary'>We will be contacting you within 1 business day to confirm payment for the added classes before we add them to the calendar.</p>
        <Link href='/students'>
          <a type="submit" className='mt-8 bg-grey-400 text-center hover:bg-grey-500 text-primary font-bold font-heading py-5 px-5 rounded'>Go to Dashboard</a>
        </Link>
      </div>
    </FormPageContainer>
  )
}