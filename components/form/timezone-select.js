import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import ReactTimezoneSelect, { allTimezones } from 'react-timezone-select'
import { customStyles } from './lib/parts'


const TimezoneSelect = ({children, control, disabled, hideError, error, id, label, name, isDirty, placeholder}) => {

 
  const customStyles = {
    valueContainer: (provided, state) => ({
      ...provided,
      border: 'none',
      outline: 'none',
      padding: `${label ? '2.25rem' : '1.5rem'} 1rem ${label ? '1rem' : '1.5rem'} ${children ? '3.5rem' : '1rem'}`,
    }),
    container: (provided, state) => ({
      ...provided,
      width: '100%',
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: disabled ? 'transparent' : 'white',
      border: disabled ? '1px solid #E5E5E5' : '1px solid #D8DFE2',
      boxShadow: error ? '0 0 0 1px #D44D5C' : 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      "&:hover": {
        border: disabled ? '1px solid #E5E5E5' : "1px solid #082735"
      },
      "&:focus-within": {
        outline: disabled ? 'none' : '2px solid #00BFB2'
      }
    }),
    placeholder: (provided, state) => ({
      ...provided,
      top: 'calc(50% + .25rem)',
      paddingLeft: '0',
      marginLeft: '0',
      fontSize: '14px',
      fontFamily: 'Montserrat',
      fontWeight: '400',
      pointerEvents: 'none',
      color: disabled ? '#E5E5E5' : '#A8B7BE'
    }),
    menuList: (provided, state) => ({
      ...provided,
      fontFamily: 'Montserrat',
      fontWeight: '400',
    }),
    input: (provided, state) => ({
      ...provided,
      margin: 0,
      paddingBottom: 0,
      paddingTop: '0',
      top: 'calc(50% + 2px)',
      paddingLeft: '0',
      fontSize: '14px',
      fontWeight: '400',
      color: disabled ? '#ADBCC2' : '#082735',
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      padding: '0 1rem 0 1.5rem',
      color: disabled ? 'transparent' : '#D8DFE2',
      "&:hover": {
        color: disabled ? 'transparent' : "#D8DFE2",
      },
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      background: 'none'
    }),
    singleValue: (provided, state) => ({
      ...provided,
      top: 'calc(50% + 2px)',
      left: '3.5rem',
      marginLeft: '0',
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: '14px',
      color: disabled ? '#E5E5E5' : '#082735'
    })
  }

  let iconStyles = 'absolute top-1/2 h-6 w-6 left-4 -translate-y-1/2 transition-all duration-300 pointer-events-none'
  if(!disabled) {
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
    <div>
      {(!hideError && error) && <p className='ml-4 py-1 font-heading text-sm text-error-400'>{error?.message}</p>}
      <div className='relative'>
        <Controller
          name={name}
          control={control}
          defaultValue=""
          render={({ field: { onChange, value, ref } }) => (
            <ReactTimezoneSelect 
              inputRef={ref}
              isDisabled={disabled} 
              name={name}
              styles={customStyles}
              value={value}
              onChange={(val) => onChange(val.value)}
              // isSearchable={isSearchable ? true : false}
              placeholder={placeholder ? placeholder : 'Search'}
              timezones={{
                ...allTimezones,
                'America/Lima': 'Pittsburgh',
                'Europe/Berlin': 'Frankfurt',
                'America/Denver': 'Denver',
                'America/Chicago': 'Chicago',
                'America/New_York': 'New York',
              }}
            />
          )}
        />
        {label && (
          <label 
            className={`absolute font-heading font-bold text-sm top-0 left-0 py-3 px-4 pointer-events-none ${!disabled ? 'text-primary' : 'text-grey-400'} ${children ? 'ml-10' : ''}`}
            htmlFor={name}
          >
            {label}
          </label>
        )}
        {childrenWithProps}
      </div>
    </div>
  )
};

export default TimezoneSelect