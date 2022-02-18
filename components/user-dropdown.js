import React from 'react'
import { imageBuilder } from '../lib/sanity'
import { IoChevronDown, IoPerson, IoPersonCircle } from 'react-icons/io5'
import { MdLogout, MdLogin, MdDashboard } from 'react-icons/md'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { useUser } from '../lib/swr';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';


function UserDropdown(props) {
  const { data: session, status } = useSession()
  const { user, error, isLoading } = useUser(session?.user?.email)

  return (
    <div className='relative group w-max border border-grey-300 rounded-full hover:border-grey-400 transition-colors duration-100'>
      {user ? (
        <div className='cursor-pointer flex items-center gap-2 px-2 py-2 rounded-md'>
          <div className='rounded-full overflow-hidden h-12 w-12'>
            {user.image ? (
              <img
                width={120}
                height={120}
                alt={`Profile image for ${user.name}`}
                className={'h-full object-cover'}
                src={imageBuilder(user.image).width(120).height(120).url()}
              />
            ) : (
              <IoPersonCircle className='fill-grey-500 w-12 h-12 cursor-pointer'/>
            )}
          </div>
          <div className='flex flex-col justify-center'>
            <h4 className='leading-snug font-heading font-bold text-sm text-primary'>{user.name}</h4>
            <p className='font-heading text-xs font-normal text-grey-600'>Student</p>
          </div>
        
          <IoChevronDown className='mx-3 stroke-grey-500 group-hover:stroke-grey-700 transition-colors duration-100'/>
        </div>
      ) : (
        <IoPersonCircle className='fill-grey-500 w-12 h-12 cursor-pointer'/>
      )}
    
      <div className='absolute z-50 hidden opacity-0 group-hover:block group-hover:opacity-100 cursor-pointer transition-all duration-100 top-full right-0'>
        <ul className='flex flex-col rounded-lg border border-grey-300 min-x-xl shadow-md overflow-hidden'>
          {user ? (
            <>
              <li className='flex-1 '>
                <Link href='/students'>
                  <a className='flex items-center w-full content-center bg-white pl-4 pr-6 py-3 hover:bg-grey-200 block whitespace-no-wrap'>
                    <span className='p-1 bg-grey-300 rounded-md mr-4'><MdDashboard className='fill-primary h-4 w-4'/></span> Dashboard
                  </a>
                </Link>
              </li>
              <li className='flex-1 '>
                <Link href='/students/account-settings'>
                  <a className='flex items-center w-full content-center bg-white pl-4 pr-6 py-3 hover:bg-grey-200 block whitespace-no-wrap'>
                    <span className='p-1 bg-grey-300 rounded-md mr-4'><IoPerson className='fill-primary h-4 w-4'/></span> Account
                  </a>
                </Link>
              </li>
              <li className='flex-1' >
                <button
                  className='flex items-center w-full content-center bg-white pl-4 pr-6 py-3 hover:bg-grey-200 block whitespace-no-wrap'
                  onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })}
                >
                  <span className='p-1 bg-grey-300 rounded-md mr-4'><MdLogout className='fill-primary h-4 w-4'/></span> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className='flex-1 '>
                <Link href='/register'>
                  <a className='flex items-center content-center bg-white pl-4 pr-6 py-3 hover:bg-grey-100 block whitespace-no-wrap'>
                    <span className='p-1 bg-grey-300 rounded-md mr-4'><AiOutlineUserAdd className='fill-primary h-4 w-4'/></span> Register
                  </a>
                </Link>
              </li>
              <li className='flex-1 '>
                <Link href='/auth/signin'>
                  <a className='flex items-center content-center bg-white pl-4 pr-6 py-3 hover:bg-grey-100 block whitespace-no-wrap'>
                    <span className='p-1 bg-grey-300 rounded-md mr-4'><MdLogin className='fill-primary h-4 w-4'/></span> Sign in
                  </a>
                </Link>
              </li>
    
            </>
          )}

        </ul>
      </div>
    </div>

  )
}

export default UserDropdown