import React, { useState, useEffect } from 'react'
import SidebarNav from './sidebar-nav'
import UserDropdown from './user-dropdown'

export default function LayoutSidebar({ children, hidden }) {
  return (
    <>
      <div className="flex">
        <SidebarNav />
        <div className='flex-1'>
          <div className='flex justify-between items-center py-2 border-b border-grey-300 container mx-auto px-12'>
            <div></div>
            {/* <h1 className="font-heading font-bold text-3xl text-primary">My Dashboard</h1> */}
            <UserDropdown />
          </div>
          {children}
        </div>
      </div>
    </>
  )
}
