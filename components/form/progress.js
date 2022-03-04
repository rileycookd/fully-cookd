import React from 'react'

function FormProgress(props) {

  const {
    title,
    step,
    steps
  } = props

  return (
    <div className='w-full flex items-center gap-2'>
      {/* <h3 className='font-heading text-sm font-bold text-secondary'>{`${step}. ${title}`}</h3> */}
      <h5 className={`font-heading text-sm font-bold ${step === steps ? 'text-secondary' : 'text-grey-500'}`}>{`${step}/${steps}`}</h5>
      <div className='relative w-full h-2 bg-grey-300 rounded-full overflow-hidden'>
        <div className='absolute h-full bg-secondary top-0 left-0 transition-all duration-500 ease-out' style={{width: `${(step - 1) / (steps - 1) * 100}%`, minWidth: '5px'}}></div>
      </div>
    </div>
  )
}

export default FormProgress