import React from 'react'
import Flag from 'react-world-flags'

const LanguageRadioGroup = (props) => {
  const {
    languages,
    name,
    children,
    label,
    currentLanguage,
    handleChange
  } = props

  const getLanguageData = (id) => {
    return languages.find(l => l._id === id)
  }

  return (
    <div className='flex justify-center' onChange={(e) => handleChange(getLanguageData(e.target.value))}>
      {languages?.map((l, i) => {
        let borderRadius = ''
        if(i === 0) borderRadius = 'rounded-l-lg'
        if(i === languages.length-1) borderRadius ='rounded-r-lg'
        return (
          <div>
            <input
              type="radio"
              id={`radio-${l._id}`}
              value={l._id}
              {...props}       
              className='peer hidden'
              style={children ? {paddingLeft: '3.5rem'} : {}}
              checked={currentLanguage._id === l._id}
            />
            <label 
              className={`relative select-none cursor-pointer flex flex-col items-center bg-white border border-grey-400 peer-checked:bg-secondary-100 peer-checked:border-secondary ${borderRadius} px-6 py-4 font-heading font-bold text-primary transition-all ease-out duration-100`}
              htmlFor={`radio-${l._id}`}
            >
              {l.code && (
                <div className='flex justify-center items-center w-10 h-10'>
                  <Flag code={ l.code } />
                </div>
                )}
              <h5 className='font-heading font-bold text-xs'>{l.title}</h5>
              {children}
            </label>
          </div>
          )
        }
      )}
      
    </div>
  )
};

export default LanguageRadioGroup

