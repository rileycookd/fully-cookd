import React from 'react'

function FormProgress(props) {

  const {
    title,
    step,
    steps
  } = props

  return (
    <div className='flex flex-col gap-2'>
      <h3 className='font-heading text-sm font-bold text-secondary'>{`${step}. ${title}`}</h3>
      <div className='relative w-full h-1 bg-grey-300'>
        <div className='absolute h-full bg-secondary top-0 left-0 transition-all duration-500 ease-out' style={{width: `${(step - 1) / (steps - 1) * 100}%`}}></div>
      </div>
      <h5 className={`font-heading text-sm font-bold ${step === steps ? 'text-secondary' : 'text-grey-400'}`}>{`${step}/${steps}`}</h5>
    </div>
  )
}

export default FormProgress