import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Flag from 'react-world-flags'
import { capitalize } from 'lib/helpers';
import { IoChevronForward } from 'react-icons/io5'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { format, parseISO } from 'date-fns'

export default function UpcomingClassListItem(props) {
  const {
    start,
    end,
    id
  } = props

  const [isOpen, setIsOpen] = useState(false)

  let startDate = parseISO(start.dateTime)
  let endDate = parseISO(end.dateTime)

  return (
    <li 
      key={id} 
      onClick={() => setIsOpen(!isOpen)}
      className='relative group flex items-center gap-x-6 border border-grey-400 hover:bg-secondary-100 hover:border-secondary cursor-pointer transition-colors duration-75 rounded-lg px-6 py-4 bg-white'
    >
      <h4 className='flex flex-col font-bold font-heading text-sm leading-snug justify-center items-center'>
        <span>{format(startDate, 'dd')}</span><span>{format(startDate, 'MMM')}</span>
      </h4>
      <div>
        <p className="font-body text-sm">{format(startDate,'EEEE')}</p>
        <p className="font-body text-sm">{format(startDate, 'h:mm')}-{format(endDate, 'h:mmaaa')}</p>
      </div>
      <div className='flex-1 flex justify-end'>
        {/* <BiDotsVerticalRounded className="w-5 h-5 fill-primary hover:fill-grey-700 transition-colors duration-75"/> */}
      </div>

      
      {/* <div className='absolute z-50 hidden opacity-0 group-hover:block group-hover:opacity-100 cursor-pointer transition-all duration-100 top-full right-0'>
        <ul className='flex flex-col rounded-lg border border-grey-300 min-x-xl shadow-md overflow-hidden'>
          <li className='flex-1' >
            <button
              className='flex items-center w-full content-center bg-white pl-4 pr-6 py-3 hover:bg-grey-200 block whitespace-no-wrap'
              onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })}
            >
              Do something
              <span className='p-1 bg-grey-300 rounded-md mr-4'><MdLogout className='fill-primary h-4 w-4'/></span> Logout
            </button>
          </li>
        </ul>
      </div> */}
    </li>
  )
}