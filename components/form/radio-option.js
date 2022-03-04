import React from 'react'

export default function RadioOption({ name, register, value, id, label, ...props }) {


  return (
    <label htmlFor={id}>
      <input 
        type="radio"
        id={id}
        name={name}
        value={value}
        {...props}       
        {...register(name)}
        className='peer hidden'
      />
      <div className='flex justify-center items-center border-2 border-secondary rounded px-2 py-1 font-body text-sm text-secondary-500 transition-colors duration-75 hover:bg-secondary-100 cursor-pointer peer-checked:bg-secondary-200'>
        {label}
      </div>
    </label>
  )
}