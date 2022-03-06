import React, { useState, useEffect } from 'react'
import LanguageRadioGroup from './language-radio-group'
import Link from 'next/link'
import PostPreviewGridItem from './post-preview-grid-item'
import { IoLanguage } from 'react-icons/io5'
import Flag from 'react-world-flags'

import { useDispatch } from 'react-redux'
import { showModal, clearModal } from 'redux/features/modalSlice'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import {
  Radio
} from 'components/form'


function ClassTypesBlock(props) {
  const {
    languages,
    content
  } = props

  const dispatch = useDispatch()
  const router = useRouter()
  const { data: session } = useSession()


  console.log("ROUTER: ", router)


  const [currentLanguage, setCurrentLanguage] = useState(languages[0])

  useEffect(() => {
    return () => {
      dispatch(clearModal())
    };
  }, []);

  return (
    <div className='flex flex-col gap-12'>
      <div className='flex flex-col gap-12 bg-primary py-24'>
        <div className='container mx-auto px-12 flex flex-col gap-y-16 items-center'>
          <div className='flex flex-col items-center'>
            <h2 className='w-full text-white text-center text-6xl pb-2 font-bold font-heading'>{content?.title || 'Our Courses'}</h2>
            <p className='w-full font-body text-center text-lg text-grey-600'>{content?.subtitle || 'All our classes are personalized and tailored to your needs'}</p>
            <div className='w-32 h-1 bg-secondary mt-4'></div>

          </div>
          
          <fieldset className='flex justify-center'>
            <legend className='flex items-center text-center flex-1 text-grey-700 mb-4 font-body'><IoLanguage className='h-5 w-5 fill-grey-800 mr-2'/>Choose a language:</legend>
            <LanguageRadioGroup name='languages' currentLanguage={currentLanguage} handleChange={setCurrentLanguage} languages={languages} />
          </fieldset>

        </div>


      </div>


      <div className='container mx-auto px-5 flex flex-col gap-8'>

        <div className=' flex gap-x-8'>
          <div className='flex-1 flex flex-col gap-y-4'>
            <ul className='grid grid-cols-4 gap-4'>
              <li key={currentLanguage._id} className='flex animate-slide-up opacity-0 flex-col justify-between p-4 bg-grey-200 rounded-lg overflow-hidden'>
                <div className='flex items-center flex-col gap-2'>
                  <div className='flex rounded-sm overflow-hidden h-9 w-14 my-4'>
                    <Flag code={currentLanguage?.code} width="120" style={{objectFit: 'cover'}} />
                  </div>
                  <h3 className='text-primary text-base font-bold font-heading'>{currentLanguage?.title} courses</h3>

                  {currentLanguage?.excerpt && (
                    <p className='font-body text-sm text-primary'>
                      {currentLanguage?.excerpt}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => {
                    if(!session) {
                      dispatch(showModal('SIGNUP'))
                      router.push({
                        pathname: router.asPath,
                        query: { callbackUrl: `${router.basePath}/enroll/step1` }
                      }, 
                      router.asPath, { shallow: true }
                      )
                    } else {
                      router.push('/enroll/step1')
                    }
                  }}
                  className='mt-12 bg-accent hover:bg-accent-400 text-primary font-bold font-heading py-4 px-6 rounded'
                >
                  Enroll now
                </button>
              </li>
              {currentLanguage?.classTypes?.map((ct, i) => (
                <li key={`${currentLanguage._id}-${ct._id}`}>
                  <PostPreviewGridItem {...ct} index={i} />
                </li>
              ))}
            </ul>
          </div>  
        </div>

        </div>


    </div>
  )
}

export default ClassTypesBlock