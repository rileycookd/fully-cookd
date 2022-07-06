import React from 'react'
import TextareaAutosize from 'react-textarea-autosize';

const Textarea = ({children, hideError, register, readOnly, error, isDirty, disabled, id, label, ...props}) => {

  let textareaStyles = `
    w-full peer flex bg-transparent border-b mb-[1px] border-primary-900/20 py-1 placeholder:text-grey-500/50 focus:outline-none resize-none
    pr-${children ? '6' : '1'}  
    ${disabled ? 'text-grey-400' : readOnly ? 'text-grey-700' : ''}
    ${error ? 'border-b-2 border-error' : ''}

  `


  let iconStyles = 'absolute top-1/2 h-6 w-6 left-4 -translate-y-1/2 transition-all duration-300 pointer-events-none'
  if(!disabled && !readOnly) {
    if(isDirty) {
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
    <div className='flex flex-col'>
      {label && <label className={` w-full font-heading font-bold text-sm pointer-events-none ${(!disabled && !readOnly) ? 'text-primary' : 'text-grey-400'}`} htmlFor={id}>{label}</label>}
      <div className={`relative`}>
        <TextareaAutosize
          {...props}
          disabled={disabled}
          readOnly={readOnly}
          {...register(props.name)}
          className={textareaStyles}
          style={children ? {paddingLeft: '3.5rem'} : {}}
        />
        <div className='absolute peer-focus:w-full bottom-0 left-0 right-0 h-[3px] w-0 transition-all duration-300 bg-accent'></div>

        {childrenWithProps}
      </div>
      {!hideError && (<p className='py-1 font-heading text-sm text-error-400'>{error?.message || " "}</p>)}
    </div>
  )
};

export default Textarea