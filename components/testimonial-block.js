import React, { useState, useEffect } from 'react';
import Testimonial from './testimonial'
import cn from 'classnames'
import { ImArrowRight2 as RightArrowIcon, ImArrowLeft2 as LeftArrowIcon } from 'react-icons/im'
import { IoPersonCircle } from 'react-icons/io5'
import { imageBuilder } from 'lib/sanity'


function TestimonialBlock ({testimonials, title}) {
 
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div className='w-full container mx-auto px-5 py-24'>
      <div className='flex flex-col items-center px-4 py-32 gap-8 bg-grey-200 '>
        <h2 className='text-primary text-3xl pb-2 font-bold font-heading'>{title}</h2>
        <ul className='flex gap-2 items-center h-16'>
          {testimonials?.map((t, i) => (
            <li 
              onClick={() => setCurrentIndex(i)}
              className={`relative transition-all duration-100 rounded-full cursor-pointer overflow-hidden ${currentIndex === i ? 'border-2 h-16 w-16 border-secondary' : 'border-4 h-14 w-14 border-grey-500'} `}
            >
              {t.student.image ? (
                <img
                  width={120}
                  height={120}
                  alt={`Profile image for ${t.student.name}`}
                  className={'h-full object-cover'}
                  src={imageBuilder(t.student.image).width(120).height(120).url()}
                />
              ) : (
                <IoPersonCircle className='fill-grey-500 w-12 h-12 cursor-pointer'/>
              )}
              <div className={`absolute top-0 right-0 left-0 bottom-0 ${currentIndex === i ? 'bg-secondary-100/50' : 'bg-primary-900/30'}`}></div>
            </li>
          ))}
        </ul> 
        <div className='w-1/2'>
          <Testimonial key={testimonials[currentIndex]._key} {...testimonials[currentIndex]} />
        </div>
      </div>
    </div>
  )
}

export default TestimonialBlock