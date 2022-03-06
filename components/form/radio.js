import React from 'react'

const Radio = ({children, name, className, register, id, isDirty, error, label, ...props}) => {
  if(!register) register = () => {}
  
  return (
    <div className='flex-1 w-full'>
      <input
        type="radio"
        id={id}
        {...props}       
        {...register(name)}
        className='peer hidden'
        style={children ? {paddingLeft: '3.5rem'} : {}}
      />
      <label 
        className={`relative cursor-pointer flex items-center bg-white border border-grey-400 peer-checked:bg-secondary-100 peer-checked:border-secondary rounded-md px-4 py-8 h-full font-heading font-bold text-primary transition-all ease-out duration-100 ${className}`} 
        htmlFor={id}
      >
        <div className='relative w-4 h-4 border-2 border-grey-600 rounded-full mr-4 '>
          <div className={`absolute w-2 h-2 inset-center rounded-full bg-transparent`}></div>
        </div>
        {label ? label : ''}
        {children}
      </label>
    </div>
  )
};

export default Radio

