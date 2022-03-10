import React from 'react'

const InputField = ({children, register, readOnly, error, hideError, isDirty, disabled, id, label, ...props}) => {

  let inputStyles = `
    w-full flex bg-white border rounded px-4 ${label ? 'pt-8' : 'pt-5'} pb-5 placeholder:text-grey-500 focus:outline-2
    border-grey-400
    ${disabled ? 'text-grey-400' : readOnly ? 'text-grey-700' : 'hover:border-primary'}
    ${error ? 'outline outline-error' : 'focus:outline-secondary-400'}
  `

  
  let iconStyles = 'absolute top-1/2 h-6 w-6 left-4 -translate-y-1/2 transition-all duration-300 pointer-events-none'
  if(!disabled && !readOnly) {
    if(isDirty && !error) {
      iconStyles = iconStyles + ' fill-secondary'
    } else {
      iconStyles = iconStyles + ' fill-grey-400'
    }
  } else {
    iconStyles = iconStyles + ' fill-grey-300'
  }

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
    <div className='flex flex-col gap-1'>
      {(!hideError && error?.message) && (<p className='ml-4 py-1 font-heading text-sm text-error-400'>{error.message}</p>)}
      <div className={`relative`}>
        <input
          {...props}
          disabled={disabled}
          readOnly={readOnly}
          {...register(props.name)}
          className={inputStyles}
          style={children ? {paddingLeft: '3.5rem'} : {}}
        />
        {label && <label className={`absolute font-heading font-bold text-sm top-0 left-0 py-3 px-4 pointer-events-none ${(!disabled && !readOnly) ? 'text-primary' : 'text-grey-400'} ${children ? 'ml-10' : ''}`} htmlFor={id}>{label}</label>}
        {childrenWithProps}
      </div>
    </div>
  )
};

export default InputField