import React from 'react'
import Link from 'next/link'
import { BsCaretRightFill } from 'react-icons/bs'
import { imageBuilder } from 'lib/sanity'
import Image from 'next/image'

export default function HeroMain(props) {
  const {
    title,
    kicker,
    subtitle,
    images,
    cta,
    cta2,
  } = props

  return (
    <section className='bg-primary'>
      <div className='relative p-page py-48 '>
        <div className='flex flex-col gap-12 w-max'>
          
          <h1 className='w-max flex flex-col gap-3 font-bold font-heading text-white leading-none text-6xl'>
            {kicker && (<span className='text-2xl'>{kicker}</span>)}
            <span className='uppercase'>{title}</span>
            {subtitle && (<span className='text-2xl self-end'>{subtitle}</span>)}
          </h1>

          <ul className='flex gap-4 self-end'>
            {cta2 && (
            <Link href='/contact'>
              <a className='flex items-center gap-2 text-body text-base px-4 py-3 text-secondary font-bold rounded hover:text-secondary-800 transition-colors duration-75'>
                {cta2.title}
              </a>
            </Link>
            )}
            {cta && (
              <Link href='/contact'>
                <a className='flex items-center gap-2 text-body text-base px-4 py-3 text-black font-bold rounded bg-secondary transition-colors duration-75 hover:bg-secondary-800'>
                  {cta.title} <BsCaretRightFill className='fill-black w-3 h-3'/>
                </a>
              </Link>
            )}
          </ul>
        </div>

        <div className='absolute top-0 right-0 bottom-0 flex items-center'>
          <div className='absolute top-0 right-0 bottom-0 flex h-full w-full items-center bg-primary-900/70'></div>
          <div className='rounded-lg overflow-hidden'>
              {images && (
                <img
                  width={120}
                  height={120}
                  alt={`Featured images`}
                  className={'h-full w-full object-cover'}
                  src={imageBuilder(images[0]).width(600).height(400).url()}
                />
              )}
            </div>
        </div>

      </div>
    </section>
  )
}
