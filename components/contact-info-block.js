import React from 'react';
import Link from 'next/link'
import { BsCaretRightFill } from 'react-icons/bs'
import { MdOutlineEmail as EmailIcon } from 'react-icons/md'
import Image from 'next/image'
import { FaFacebookF as FacebookIcon, FaInstagram as InstagramIcon, FaDribbble as DribbbleIcon, FaBehance as BehanceIcon } from 'react-icons/fa'

export default function ContactInfoBlock(props) {

  return (
    <div className='flex flex-col bg-primary-700'>
      <div className='p-page py-6 flex justify-between'>
        <div className='flex gap-4 items-center'>
          <EmailIcon className='h-8 w-8 fill-accent'/>
          <p className='text-white font-heading text-2xl font-bold'>hello@fullycookd.com</p>
        </div>
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
    </div>
  )
}