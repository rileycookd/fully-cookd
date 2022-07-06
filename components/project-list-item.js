import React, { useState, useEffect } from 'react';
import { BsCaretDownFill, BsCaretRightFill } from 'react-icons/bs'
import { imageBuilder } from 'lib/sanity';
import Link from 'next/link'

export default function ProjectListItem(props) {
  const {
    index,
    title,
    image,
    excerpt,
    url,
    slug,
  } = props

  console.log(props)

  const [isOpen, setIsOpen] = useState(false)

  return (
    <li className={`group ${isOpen ? 'bg-secondary-400' : 'hover:bg-secondary-300' } select-none w-full flex py-12 cursor-pointer transition-colors duration-75`} onClick={() => setIsOpen(!isOpen)}>
      <div className='p-page flex flex-1 flex-col gap-8'>
        <div className='flex gap-6'>
          <h3 className='font-heading font-bold text-black text-stroke text-2xl self-end mb-[8px]'>{('0' + `${index + 1}`).slice(-2)}</h3>
          <h2 className={`font-heading font-bold ${isOpen ? 'text-white' : 'text-primary text-stroke-2 group-hover:text-stroke-none'} text-6xl transition-all duration-75`}>{title}</h2>
          <div className='flex flex-1 items-center justify-end'>
            <BsCaretDownFill className={`w-8 h-8  ${isOpen ? '-rotate-180 fill-white' : 'fill-transparent group-hover:fill-black stroke-black stroke-1'} transition-transform duration-300`}/>
          </div>
        </div>
        <div className={`${isOpen ? 'flex' : 'hidden'} ml-12 flex-1 w-full gap-8`}>
          {image && (
            <div className='overflow-hidden rounded w-64 mr-2'>
              <img
                width={400}
                height={400}
                alt={`Project image for ${title}`}
                className={'h-full object-cover'}
                src={imageBuilder(image).width(400).height(300).url()}
              />
            </div>
          )}
          <div className='flex-1 flex flex-col gap-4 justify-center py-2'>
            {excerpt && (
              <p className='max-w-xl font-body text-md'>{excerpt}</p>
            )}
            <Link href={`/projects/${slug?.current}`}>
              <a className='font-heading rounded px-4 py-3 border-2 border-primary flex items-center gap-2 w-max hover:border-secondary-800 hover:text-secondary-800 transition-colors duration-200'>Read more <BsCaretRightFill className='w-3 h-3 fill-current'/></a>
            </Link>
          </div>
        </div>
      </div>
    </li>
  )
}