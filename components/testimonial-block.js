import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'

export default function TestimonialBlock(props) {
  const {
    testimonials,
  } = props

  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  
  const ct = testimonials[currentTestimonial]

  return (
    <div className='p-page flex flex-col max-w-5xl py-32'>
      <div className='flex gap-12'>
        <FaQuoteLeft className='w-10 h-10 fill-accent stroke-2'/>
        <div className='flex-1 flex flex-col py-4 gap-2'>
          <p className='font-body text-xl text-primary'>{ct.quote}</p>
          <p className='font-body text-lg text-accent-600 text-right'>— {ct.contact.name}{ct.client ? `, ${ct.client.title}` : ''}</p>
        </div>
        <FaQuoteRight className='w-10 h-10 fill-accent self-end'/>
      </div>
      {testimonials.length > 1 && (
        <ul className='flex gap-2 justify-center'>
          {testimonials.map((t, i) => (
            <li>
              <button 
                onClick={() => setCurrentTestimonial(i)}
                className={`h-4 w-4 rounded-full border-2 border-primary ${currentTestimonial === i ? 'bg-primary' : ''}`}
              >

              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}