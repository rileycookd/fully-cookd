import React, { useRef } from 'react'

const Checkbox = ({children, name, register, id, isDirty, error, label, ...props}) => {
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        {...props}       
        {...register(name)}
        className='peer hidden'
        style={children ? {paddingLeft: '3.5rem'} : {}}
      />
      <label 
        className='relative cursor-pointer flex items-center bg-white border border-grey-400 peer-checked:bg-secondary-100 peer-checked:border-secondary rounded-md px-4 py-8 font-heading font-bold text-primary transition-all ease-out duration-100' 
        htmlFor={id}
      >
        <div className='relative w-4 h-4 border-2 border-secondary rounded-sm mr-4 '>
          <div className='absolute w-2 h-2 inset-center rounded-full bg-transparent peer-checked:bg-secondary'></div>
        </div>
        {label ? label : ''}
        {children}
      </label>
    </div>
  )
};

export default Checkbox

