import React, { useState, useEffect } from 'react';
import Testimonial from './testimonial'
import cn from 'classnames'
import { ImArrowRight2 as RightArrowIcon, ImArrowLeft2 as LeftArrowIcon } from 'react-icons/im'


function TestimonialBlock ({testimonials, title}) {
 
  const [slides, setSlides] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    let newState = []
    let slidePair = []
    testimonials.map((t, i) => {
      if(slidePair.length === 2) {
        newState.push(slidePair)
        slidePair = []
        slidePair.push(t)
      } else {
        slidePair.push(t)
      }
    })
    if(slidePair.length) newState.push(slidePair)
    setSlides([...newState])
  }, [testimonials])

  const handlePrevious = () => {
    if(currentSlide === 0) {
      setCurrentSlide(slides.length - 1)
    } else {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const handleSelect = (i) => {
    if(currentSlide !== i) {
      setCurrentSlide(i)
    }
  }

  const handleNext = () => {
    if(currentSlide === slides.length - 1) {
      setCurrentSlide(0)
    } else {
      setCurrentSlide(currentSlide + 1)
    }
  }

  return (
    <div className='w-full container mx-auto px-5 py-24'>
      <div className='flex flex-col items-center px-4 py-12 bg-grey-200 '>
        <h2 className='text-primary text-2xl pb-2 font-bold font-heading mb-12'>{title}</h2>
        <div className='w-1/2'>
          {slides && slides.length && slides[currentSlide].map((t) => (
            <Testimonial key={t._key} {...t} />
          ))}
        </div>
        {slides.length > 1 && (
          <div className={styles.control}>
            <button onClick={() => handlePrevious()}><LeftArrowIcon /></button>
            {slides.map((s,i) => (
              <button 
                className={cn('', currentSlide === i && '')}
                onClick={() => handleSelect(i)}
              ></button>
            ))}
            <button onClick={() => handleNext()}><RightArrowIcon /></button>
          </div>
        )}   
      </div>
    </div>
  )
}

export default TestimonialBlock