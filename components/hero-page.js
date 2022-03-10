import Avatar from '../components/avatar'
import Date from '../components/date'
import CoverImage from '../components/cover-image'
import Link from 'next/link'
import { useRef, useState, useLayoutEffect } from 'react'
import { imageBuilder } from '../lib/sanity'
import NavFeaturedLinks from '../components/nav-featured-links'
import HeroCTAForm from './forms/hero-cta-form'


export default function HeroPage({
  title,
  subtitle,
  image,
  navigation
}) {

  return (
    <section>
      <div className={`relative bg-primary ${navigation?.length ? 'pb-32' : ''}`}>
        <div className='relative p-page py-32 z-20 '>
          <h1 className='text-center md:text-left text-white text-5xl md:text-6xl pb-1 font-bold font-heading'>{title}</h1>
          {subtitle && <p className='font-body text-center md:text-left text-xl text-grey-600'>{subtitle}</p>}
          <div className='mt-12 max-w-5xl'>
            <HeroCTAForm />
          </div>
        </div>
        <div className='absolute bottom-0 top-0 right-0 w-full md:w-1/2 ml-auto'>
          <img
            width={1240}
            height={540}
            alt={`Cover Image for ${title}`}
            className={'h-full object-cover'}
            src={imageBuilder(image).width(1240).height(540).url()}
          />
        </div>
        <div className='absolute w-full md:w-1/2 h-full top-0 right-0 bottom-0 bg-gradient-to-r from-primary to-primary-900/70 md:to-primary-900/30'></div>
      </div>
      {navigation && (
        <div className='relative bg-grey-200 h-52 w-full'>
          {navigation?.length && <NavFeaturedLinks links={navigation} />}
        </div>
      )}

    </section>
  )
}
