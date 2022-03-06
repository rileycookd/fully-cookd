import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image'
import { useUser } from '../lib/swr';
import { imageBuilder } from '../lib/sanity'
import { IoChevronDown, IoPerson } from 'react-icons/io5'
import { MdLogout } from 'react-icons/md'
import UserDropdown from './user-dropdown';
import NavbarOverlay from './navbar-overlay';

export default function Navbar() { 

  return (
    <nav className="relative border-b border-grey-300">
      <div className="flex justify-between container mx-auto px-5">
        <div className='flex items-center gap-4'>
          <Link href="/">
            <a className='my-2'>
              <Image 
                src="/images/company_logo.svg" 
                width="150" 
                height="40" 
              />
            </a>
          </Link>

        </div>
        <ul className='flex'>
          <li className='group flex-1 self-stretch hover:bg-grey-200 h-full flex items-center font-heading py-2 px-2 cursor-pointer'>
            Classes <IoChevronDown className='ml-1 w-3 h-3'/>
            <NavbarOverlay className='group-hover:flex group-hover:opacity-100' />
          </li>
          <li className='flex-1 self-stretch hover:bg-grey-200 h-full flex items-center font-heading cursor-pointer'>
            <Link href="/contact">
              <a className='flex items-center py-2 px-2 h-full w-full'>
                Contact
              </a>
            </Link>
          </li>
        </ul>
        <ul className="flex">
          <li className='my-2'>
            <UserDropdown />
          </li>
        </ul>
      </div>
    </nav>
  )
}