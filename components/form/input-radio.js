import React from 'react'

export default function InputRadio({ isDirty, error, label, register, id, name, ...props }) {

  return (
    <div className='flex items-center'>
      <label 
        className="flex items-center cursor-pointer font-heading text-base text-primary"
        htmlFor={id}
      >
        <input 
          type="radio"
          id={id}
          {...props}       
          {...register(name)}
          className='peer hidden'
        />
        <div className='relative w-4 h-4 text-transparent border border-grey-700 rounded-full mr-2 peer-checked:text-secondary peer-checked:border-secondary'>
          <div className={`absolute w-2 h-2 inset-center rounded-full bg-current transition-colors duration-100`}>

          </div>
        </div>
        {label}
      </label>
    </div>
  )
}