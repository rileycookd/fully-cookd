import React from 'react'

export default function TimePicker(props) {

  return (
    <div className='flex gap-8'>
      <fieldset className='flex flex-col gap-2 my-4 w-64'>
        <legend className='font-heading font-bold text-base mb-4 text-center ml-5'>{c.day}</legend>
        
        <div className='flex'>
          <div className='flex flex-col items-end mr-2'>
            <div className='pb-[73px]'>
              <span className='font-heading text-xs'>8:00</span>
            </div>
            <div className='pb-[73px]'>
              <span className='font-heading text-xs'>9:00</span>
            </div>
            <div className='pb-[73px]'>
              <span className='font-heading text-xs'>10:00</span>
            </div>
            <div className='pb-[73px]'>
              <span className='font-heading text-xs'>11:00</span>
            </div>
            <div className='pb-[73px]'>
              <span className='font-heading text-xs'>12:00</span>
            </div>
            <div className='pb-[73px]'>
              <span className='font-heading text-xs'>13:00</span>
            </div>
            <div className='pb-[73px]'>
              <span className='font-heading text-xs'>14:00</span>
            </div>
            <div className='pb-[73px]'>
              <span className='font-heading text-xs'>15:00</span>
            </div>
          </div>
          <div className='mt-[13px] w-full h-max flex-flex-col divide-y divide-grey-700 border-y border-grey-700'>
            <div className='flex flex-col w-full divide-y divide-grey-400'>
              <div className='h-12 hover:bg-secondary-100 cursor-pointer'>

              </div>
              <div className='h-12 hover:bg-secondary-100 cursor-pointer'>

              </div>
            </div>
            <div className='flex flex-col w-full divide-y divide-grey-400'>
              <div className='h-12 hover:bg-secondary-100 cursor-pointer'>

              </div>
              <div className='h-12 hover:bg-secondary-100 cursor-pointer'>

              </div>
            </div>
            <div className='flex flex-col w-full divide-y divide-grey-400'>
              <div className='h-12 hover:bg-secondary-100 cursor-pointer'>

              </div>
              <div className='h-12 hover:bg-secondary-100 cursor-pointer'>

              </div>
            </div>
            <div className='flex flex-col w-full divide-y divide-grey-400'>
              <div className='h-12 hover:bg-secondary-100 cursor-pointer'>

              </div>
              <div className='h-12 hover:bg-secondary-100 cursor-pointer'>

              </div>
            </div>
            <div className='flex flex-col w-full divide-y divide-grey-400'>
              <div className='h-12 hover:bg-secondary-100 cursor-pointer'>

              </div>
              <div className='h-12 hover:bg-secondary-100 cursor-pointer'>

              </div>
            </div>
            <div className='flex flex-col w-full divide-y divide-grey-400'>
              <div className='h-12 hover:bg-secondary-100 cursor-pointer'>

              </div>
              <div className='h-12 hover:bg-secondary-100 cursor-pointer'>

              </div>
            </div>
            <div className='flex flex-col w-full divide-y divide-grey-400'>
              <div className='h-12 hover:bg-secondary-100 cursor-pointer'>

              </div>
              <div className='h-12 hover:bg-secondary-100 cursor-pointer'>

              </div>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  )
}