import React from 'react'
import Image from 'next/image'
import { FormProgress } from '.'

export default function FormPageContainer(props) {
  const {
    children,
    steps,
    step,
    title,
  } = props

  return (
    <div className='flex flex-col items-center'>
      <div className='container mx-auto px-5 flex justify-center py-8'>
        <Image 
          src="/images/company_logo.svg" 
          width="150" 
          height="40" 
        />
      </div>
      <div className='flex-1 w-full flex flex-col items-center gap-4 my-8'>
        <h1 className='text-primary font-heading font-bold text-4xl'>{title}</h1>
        {(steps && step) && (
          <div className='flex w-full flex-col items-center gap-2 max-w-sm mt-4'>
            <FormProgress title="Language selection" step={step} steps={steps} />
          </div>
        )}
        <div className='flex flex-col items-center w-max border rounded-lg border-grey-400 py-8 px-8'>

          {children}

        </div>
        <p className='text-xs font-body text-grey-800'>Copyright &copy; {new Date().getFullYear()} Amelio Language Institute</p>

      </div>
    </div>
  )
}