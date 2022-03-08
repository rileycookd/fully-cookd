import React, { useState, useEffect } from 'react'

import Flag from 'react-world-flags'
import { BsPeople as StudentsIcon } from 'react-icons/bs'
import { useLanguages } from '../lib/swr'
import { imageBuilder } from '../lib/sanity'
import { getClassSizeString } from '../lib/helpers'
import { IoMdArrowForward } from 'react-icons/io'
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
        <div className='flex gap-8 container mx-auto px-5 py-12'>
          <div className='w-1/5 flex flex-col justify-between gap-8'>
            <div>
              <h3 className='font-heading text-base font-bold text-grey-700 mb-5'>Languages taught</h3>
              <ul className='flex flex-col'>
                {languages.map((l, i) => (
                <li 
                  key={l._id}
                  className={`flex items-center font-body border border-transparent ${currentCategory === i ? 'text-primary bg-secondary-100 border-secondary' : 'text-grey-800 hover:text-grey-900'} cursor-pointer transition-colors duration-75 rounded-md py-1 px-2 font-bold text-base`}
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
            <Link href='/classes'>
              <a className='w-max flex items-center text-grey-700 hover:text-grey-900 transition-colors duration-75 underline font-heading'>
                All courses <IoMdArrowForward className="ml-1 w-4 h-4 fill-grey-700" />
              </a>
            </Link>
          </div>
          <div className='flex-1 flex flex-col'>
            <h3 className='font-heading text-base font-bold text-grey-700 mb-5'>Featured courses</h3>
            <ul className='grid flex-1 gap-3 grid-cols-4'>
              {languages[currentCategory]?.classTypes?.map((ct,i) => (
                <li key={ct._id} className='w-full h-max'>
                  <Link href={`/classes/${ct.slug.current}`}>
                    <a className='flex flex-col p-2 cursor-pointer hover:bg-secondary-100 border border-transparent hover:border-secondary transition-colors duration-75 rounded-md'>
                      <div className='group relative w-full overflow-hidden rounded-t '>
                        {ct.image && (
                          <img
                            width={400}
                            height={400}
                            alt={`Image for ${ct.title}`}
                            className={'h-full object-cover'}
                            src={imageBuilder(ct.image).width(300).height(Math.floor((9 / 16) * 300)).url()}
                          />
                        )}
                        <div className='absolute top-0 left-0 right-0 bottom-0 bg-primary-900/20 group-hover:bg-transparent transition-colors duration-100'></div>
                      </div>
                      <div className='flex flex-col justify-between px-1 py-1'>
                        <h4 className='font-heading text-sm text-sm font-bold text-grey-900 mb-1'>{ct.title}</h4>
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