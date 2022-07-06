import React from 'react';
import Link from 'next/link'
import { BsCaretRightFill } from 'react-icons/bs'
import Image from 'next/image'
import { FaFacebookF as FacebookIcon, FaInstagram as InstagramIcon, FaDribbble as DribbbleIcon, FaBehance as BehanceIcon, FaFacebook } from 'react-icons/fa'

export default function Footer(props) {

  return (
    <footer className='flex flex-col bg-primary'>
      <Link href="/contact">
        <a className='py-8 font-heading text-7xl text-stroke-3 text-white font-bold flex hover:bg-primary-700 hover:text-stroke-none transition-colors duration-100'>
          <span className='flex justify-between items-center p-page'>contact the chef <BsCaretRightFill className='w-8 h-8 fill-white'/></span>
        </a>
      </Link>
      <div className='p-page py-6 flex justify-between'>
        <div className='flex gap-4 items-center'>
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
          <p className='font-body text-grey-700'>Fully Cookd {new Date().getFullYear()}</p>
        </div>
        <ul className='hidden lg:flex text-white'>
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
        <ul className='flex gap-2'>
          <li>
            <a className='group flex items-center cursor-pointer hover:bg-accent transition-colors duration-100 justify-center bg-white p-2 rounded-full'>
              <FacebookIcon className='fill-primary w-6 h-6 group-hover:fill-white transition-colors duration-100' />
            </a>
          </li>
          <li>
            <a className='group flex items-center cursor-pointer hover:bg-accent transition-colors duration-100 justify-center bg-white p-2 rounded-full'>
              <InstagramIcon className='fill-primary w-6 h-6 group-hover:fill-white transition-colors duration-100' />
            </a>
          </li>
          <li>
            <a className='group flex items-center cursor-pointer hover:bg-accent transition-colors duration-100 justify-center bg-white p-2 rounded-full'>
              <DribbbleIcon className='fill-primary w-6 h-6 group-hover:fill-white transition-colors duration-100' />
            </a>
          </li>
          <li>
            <a className='group flex items-center cursor-pointer hover:bg-accent transition-colors duration-100 justify-center bg-white p-2 rounded-full'>
              <BehanceIcon className='fill-primary w-6 h-6 group-hover:fill-white transition-colors duration-100' />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}