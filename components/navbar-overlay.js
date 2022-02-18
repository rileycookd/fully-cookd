import React, { useState, useEffect } from 'react'

import Flag from 'react-world-flags'
import { BsPeople as StudentsIcon } from 'react-icons/bs'
import { useLanguages } from '../lib/swr'
import { imageBuilder } from '../lib/sanity'
import { getClassSizeString } from '../lib/helpers'
import Link from 'next/link'

function NavbarOverlay(props) {
  const {
    className
  } = props

  const { languages, error, isLoading } = useLanguages()

  const[currentCategory, setCurrentCategory] = useState(0)

  return (
    <div className={`absolute hidden opacity-0 shadow-md transition-opacity duration-500 flex top-full left-0 z-50 border-t border-grey-300 bg-grey-100 w-full pb-8 ${className} cursor-default`}>
      {languages && (
        <div className='flex gap-8 container mx-auto px-5 py-5'>
          <div className='w-1/5'>
            <h3 className='font-heading text-base font-bold text-grey-700 mb-5'>Languages taught</h3>
            <ul className='flex flex-col'>
              {languages.map((l, i) => (
              <li 
                className={`flex items-center font-body ${currentCategory === i ? 'text-primary bg-grey-300' : 'text-grey-800 hover:text-grey-900'} cursor-pointer transition-colors duration-75 rounded-md py-1 px-2 font-bold text-base`}
                onClick={() => setCurrentCategory(i)}
              >
                <div className='flex justify-center items-center h-8 w-8 mr-3'>
                  <Flag code={l.code} height='8' />
                </div>
                {l.title}
              </li>
              ))}
            </ul>
          </div>
          <div className='flex-1 flex flex-col'>
            <h3 className='font-heading text-base font-bold text-grey-700 mb-5'>Featured classes</h3>
            <ul className='grid flex-1 gap-3 grid-cols-3'>
              {languages[currentCategory]?.classTypes?.map((ct,i) => (
                <li className='w-full h-max'>
                  <Link href={`/classes/${ct.slug.current}`}>
                    <a className='flex p-2 bg-grey-200 cursor-pointer hover:bg-grey-300 transition-colors duration-75 rounded-md border border-grey-300'>
                      <div className='w-28'>
                        {ct.image && (
                          <img
                            width={400}
                            height={400}
                            alt={`Image for ${ct.title}`}
                            className={'h-full object-cover'}
                            src={imageBuilder(ct.image).width(300).height(Math.floor((3 / 4) * 300)).url()}
                          />
                        )}
                      </div>
                      <div className='flex flex-col justify-between px-4 py-1'>
                        <h4 className='font-heading text-base text-sm font-bold text-grey-900 mb-1'>{ct.title}</h4>
                        <div className='flex items-center gap-1'>
                          <StudentsIcon className='h-4 w-4 fill-grey-600'/>
                          <p className='font-heading text-xs text-grey-800'>{getClassSizeString(ct.min, ct.max)}</p>
                        </div>
                      </div>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default NavbarOverlay