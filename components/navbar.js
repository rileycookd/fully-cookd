import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
// import NavbarOverlay from './navbar-overlay';
import { IoMenuSharp as MenuIcon, IoClose as CloseIcon , IoChevronForward, IoChevronDown} from 'react-icons/io5'


export default function Navbar() { 

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [openMenuOption, setOpenMenuOption] = useState(null)

  const handleOpenMenuOption = (index) => {
    if(openMenuOption === index) {
      setOpenMenuOption(null)
    } else {
      setOpenMenuOption(index)
    }
  }

  return (
    <nav className="relative bg-primary text-white">
      <div className="flex justify-between gap-4 py-4 p-page">
        <div className='flex items-center min-w-max gap-4'>
          <Link href="/">
            <a className='flex w-max h-max px-2'>
              <Image 
                src="/images/company_logo.svg" 
                width="48" 
                height="48"
                objectFit="contain"
              />
            </a>
          </Link>

        </div>
        <ul className='hidden lg:flex'>
          <li className='flex-1 px-2 hover:bg-primary-700 rounded transition-all duration-75 h-full flex items-center font-heading cursor-pointer'>
            <Link href="/projects">
              <a className='flex items-center py-2 px-2 h-full w-max'>
                past recipes
              </a>
            </Link>
          </li>
          <li className='flex-1 px-2 hover:bg-primary-700 rounded transition-all duration-75 h-full flex items-center font-heading cursor-pointer'>
            <Link href="/blog">
              <a className='flex items-center py-2 px-2 h-full w-max'>
                kitchen updates
              </a>
            </Link>
          </li>
          <li className='flex-1 px-2 hover:bg-primary-700 rounded transition-all duration-75 h-full flex items-center font-heading cursor-pointer'>
            <Link href="/contact">
              <a className='flex items-center py-2 px-2 h-full w-max'>
                contact us
              </a>
            </Link>
          </li>
        </ul>
      </div>
      {/* <div className={`${isSidebarOpen ? '' : 'hidden'} md:hidden flex flex-col absolute bg-white top-0 left-0 z-50 w-screen min-h-screen`}>
        <div className='flex items-center justify-between'>
          
          <div className='ml-5 flex items-center min-w-max gap-4'>
            <Link href="/">
              <a className='my-2'>
                <Image 
                  src="/images/company_logo.svg" 
                  width="120" 
                  height="40" 
                />
              </a>
            </Link>
          </div>
          <button 
            onClick={() => {
              setIsSidebarOpen(false)
            }}
            className={`self-end w-max m-2 p-3`}
          >
            <CloseIcon className='fill-primary h-8 w-8'/>
          </button>
        </div>
        
        <ul className='flex flex-col w-full border-y border-grey-300 divide-y divide-grey-300'>
          <li className='relative flex flex-col'>
            <input checked={openMenuOption === 0} onClick={() => handleOpenMenuOption(0)} className='hidden peer' id={`trigger-classes`} type="checkbox" />

            <label 
              for={`trigger-classes`} 
              className='relative peer-checked:bg-grey-300 flex-1 flex-col gap-2 px-5 py-4 justify-between group cursor-pointer'
            >
              
              <div className='flex justify-between items-center'>
                <h5 className='font-heading text-primary text-md'>
                  Classes
                </h5>
                <IoChevronDown className={`w-4 h-4 fill-primary ${openMenuOption === 0 ? '-rotate-180' : ''}`} />
              </div>
            
            </label>
            <div className='hidden h-0 peer-checked:h-full peer-checked:flex my-3 mx-5 overflow-hidden transition-all ease-in-out duration-400'>
              <ul className='flex flex-col flex-1 w-full divide-y divide-grey-300'>
                <li className='w-full'>
                  <Link href="/classes/general-spanish">
                    <a className='flex font-heading items-center py-5 px-5 h-full w-full'>
                      General Spanish
                    </a>
                  </Link>
                </li>
                <li className='w-full'>
                  <Link href="/classes/general-english">
                    <a className='flex font-heading items-center py-5 px-5 h-full w-full'>
                      General English
                    </a>
                  </Link>
                </li>
                <li className='w-full'>
                  <Link href="/classes/conversation-class">
                    <a className='flex font-heading items-center py-5 px-5 h-full w-full'>
                      Conversation Class
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          {/* <div key={q._key} className='my-1 flex items-start justify-start transition-all duration-200'>

          </div> */}
          {/* <Link href="/contact">
            <a className='flex items-center py-4 px-5 h-full w-full'>
              Contact
            </a>
          </Link>
        </ul> */}
      {/* </div> */}
    </nav>
  )
}