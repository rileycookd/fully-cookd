import React from 'react'
import { ImQuotesLeft as QuoteIcon } from 'react-icons/im'
import { IoLocationSharp as LocationIcon } from 'react-icons/io5'
import { imageBuilder } from '../lib/sanity'

function Testimonial ({ student, quote }) {

  return (
    <div className='flex items-start'>
      <QuoteIcon className='mr-3 text-accent w-8 h-8'/>
      <div className='flex flex-col gap-y-4'>
        <p className='font-heading text-primary leading-relaxed text-md'>{quote}</p>
        <div className='flex items-center'>
          {student?.image && (
            <div className='rounded-full overflow-hidden w-20 h-20 mr-2'>
              <img
                width={250}
                height={250}
                alt={`Profile pic for ${student?.name}`}
                className={'h-full object-cover'}
                src={imageBuilder(student.image).width(250).height(250).url()}
              />
            </div>
          )}
          <div>
            <h6 className='text-primary text-lg font-bold font-heading'>{student?.name}</h6>
            {student?.city || student?.country ? (
              <div className='flex items-center text-secondary'>
                <LocationIcon className='mr-1 text-secondary w-4 h-4' />
                <h6 className='text-sm font-bold font-heading'>{student?.city}, {student?.country}</h6>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonial