import React, { useState, useEffect } from 'react'
import SidebarNav from './sidebar-nav'
import UserDropdown from './user-dropdown'
import { IoMenuSharp as MenuIcon, IoClose as CloseIcon } from 'react-icons/io5'


export default function LayoutSidebar({ children, hidden }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <div className="flex relative">
        <div className={`${!isSidebarOpen ? '-translate-x-full' : ''} flex items-start fixed flex-1 md:max-w-max z-50 top-0 left-0 md:relative transition-all duration-300 md:flex md:translate-x-0`}>
          <SidebarNav />
          <button 
              onClick={() => {
                setIsSidebarOpen(false)
              }}
              className={`${isSidebarOpen ? '' : 'hidden'} md:hidden m-2 bg-white border border-grey-300 rounded-full shadow-md md:hidden p-3`}
            >
              <CloseIcon className='fill-primary h-8 w-8'/>
            </button>
        </div>
        <div className='flex-1'>
          <div className='flex justify-between items-center py-2 border-b border-grey-300 p-page'>
            <button 
              onClick={() => {
                setIsSidebarOpen(true)
              }}
              className='md:invisible'
            >
              <MenuIcon className='w-10 h-10'/>
            </button>
            {/* <h1 className="font-heading font-bold text-3xl text-primary">My Dashboard</h1> */}
            <UserDropdown />
          </div>
          {children}
        </div>
      </div>
    </>
  )
}
