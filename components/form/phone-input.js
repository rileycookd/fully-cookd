import React, { forwardRef } from 'react'
import ReactPhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'
import 'react-phone-input-2/lib/bootstrap.css'
// import './styles.override.css'
import { Controller } from 'react-hook-form'


const PhoneInput = ({children, register, hideError, isDirty, readOnly, disabled, control, error, id, label, name}) => {

  // const validStyles = () => {
  //   if(!disabled) {
  //     if(isDirty) {
  //       return cn(styles.inputGroup, styles.valid)
  //     } else {
  //       return styles.inputGroup
  //     }
  //   } else {
  //     return cn(styles.disabled, styles.inputGroup)
  //   }
  // }

  let inputStyles = `
    w-full flex bg-white border rounded pl-4 ${label ? 'pt-8' : 'pt-5'} pb-5 placeholder:text-grey-500 focus:outline-2
    pr-${children ? '6' : '1'}  
    border-grey-400
    ${disabled ? 'text-grey-400' : readOnly ? 'text-grey-700' : 'hover:border-primary'}
    ${error ? 'outline outline-error' : 'focus:outline-secondary-400'}
  `

  let childrenWithProps
  if(children) {
    childrenWithProps = React.Children.map(children, (child) => {

      if (React.isValidElement(child)) {
        return React.cloneElement(child, { 
          className: iconStyles
        });
      }
    
      return child;
    });
  }


  return (
    <div className=''>
      {(!hideError && error?.message) && (<p className='ml-4 py-1 font-heading text-sm text-error-400'>{error.message}</p>)}
      <Controller
          name={name}
          control={control}
          // rules={{
          //   validate: (value) => isValidPhoneNumber(value)
          // }}
          render={({ field: { onChange, value } }) => (
            <ReactPhoneInput
              value={value}
              enableSearch={true}
              onChange={onChange}
              country='us'
              disabled={disabled}
              id={id}
              className={''}
              inputClass={''}
              buttonClass={''}
              dropdownClass={''}
              containerClass={'flex'}
              searchClass={''}
              // inputStyle={''}
            />
          )}
        />
        {/* {label && <label className={`absolute font-heading font-bold text-sm top-0 left-0 py-3 px-4 pointer-events-none ${(!disabled && !readOnly) ? 'text-primary' : 'text-grey-400'} ${children ? 'ml-10' : ''}`} htmlFor={id}>{label}</label>} */}
        {childrenWithProps}
    </div>
  )
};

export default PhoneInput