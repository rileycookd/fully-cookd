import React from 'react'

const InputField = ({children, register, readOnly, error, hideError, isDirty, disabled, id, label, ...props}) => {

  let inputStyles = `
    w-full peer bg-transparent rounded-t font-body transition-colors duration-400 py-2 border-b mb-[1px] border-primary-900/20 flex placeholder:text-grey-500/50 autofill focus:outline-none
    ${disabled ? 'text-grey-400' : readOnly ? 'text-grey-700' : ''}
    ${error ? 'border-b-2 border-error' : ''}
  `

  
  let iconStyles = 'absolute top-1/2 h-5 w-5 left-1 -translate-y-1/2 transition-all duration-300 pointer-events-none'
  if(!disabled && !readOnly) {
    if(isDirty && !error) {
      iconStyles = iconStyles + ' fill-accent stroke-accent'
    } else {
      iconStyles = iconStyles + ' fill-grey-100 stroke-grey-100'
    }
  } else {
    iconStyles = iconStyles + ' fill-grey-100 stroke-grey-100'
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
    <div className='flex flex-col'>
      {label && <label className={`font-heading font-bold text-sm top-0 left-0 pointer-events-none ${(!disabled && !readOnly) ? 'text-primary' : 'text-grey-400'}`} htmlFor={id}>{label}</label>}
      <div className={`relative`}>
        <input
          {...props}
          disabled={disabled}
          readOnly={readOnly}
          {...register(props.name)}
          className={inputStyles}
          style={children ? {paddingLeft: '2rem'} : {}}
        />
        <div className={`absolute peer-focus:w-full bottom-0 left-0 right-0 h-[3px] w-0 transition-all duration-300 bg-accent`}></div>
        {childrenWithProps}
      </div>
      {!hideError && (<p className='py-1 font-heading text-sm text-error-400'>{error?.message || " "}</p>)}

    </div>
  )
};

export default InputField