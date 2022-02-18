import React, { useState } from 'react'
import LanguageRadioGroup from './language-radio-group'
import Link from 'next/link'
import PostPreviewGrid from './post-preview-grid'
import { IoLanguage } from 'react-icons/io5'

function ClassTypesBlock(props) {
  const {
    languages,
    content
  } = props

  const [currentLanguage, setCurrentLanguage] = useState(languages[0])

  console.log("CURRENT LANGUAGE", currentLanguage)

  return (
    <div className='container mx-auto px-5 my-48 flex flex-col gap-12'>
      <div className='flex flex-col items-center gap-12 bg-grey-200 py-16'>
        <div className='flex flex-col items-start max-w-4xl'>
          <h2 className='w-full text-center text-primary text-5xl pb-2 font-bold font-heading'>{content?.title}</h2>
          <p className='w-full text-center font-body text-lg text-primary'>{content?.subtitle}</p>
        </div>
        <fieldset className='flex justify-center'>
          <legend className='flex items-center flex-1 text-center mb-4 font-body'><IoLanguage className='h-5 w-5 fill-primary mr-2'/>Choose a language:</legend>
          <LanguageRadioGroup name='languages' currentLanguage={currentLanguage} handleChange={setCurrentLanguage} languages={languages} />
        </fieldset>
      </div>

      <div className='flex gap-x-8'>
        <div className='w-1/3 flex flex-col items-start gap-y-4 border border-grey-400 rounded-md h-max px-6 py-10'>
          <h3 className='text-primary text-xl font-bold font-heading'>{currentLanguage?.title} courses</h3>
          {currentLanguage?.excerpt && (
            <p className='font-body text-md text-primary'>
              {currentLanguage?.excerpt}
            </p>
          )}
          <Link href="/enroll/step1">
            <a className='mt-4 bg-accent hover:bg-accent-400 text-primary font-bold font-heading py-4 px-6 rounded'>Enroll now</a>
          </Link>
        </div>
        <div className='flex-1 flex flex-col gap-y-4'>
          <PostPreviewGrid nodes={currentLanguage?.classTypes} />
        </div>
        
      </div>
    </div>
  )
}

export default ClassTypesBlock