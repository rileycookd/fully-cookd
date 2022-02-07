import Avatar from '../components/avatar'
import Date from '../components/date'
import CoverImage from '../components/cover-image'
import Link from 'next/link'
import { useRef, useState, useLayoutEffect } from 'react'
import { imageBuilder } from '../lib/sanity'
import NavFeaturedLinks from '../components/nav-featured-links'


export default function HeroPage({
  title,
  subtitle,
  image,
  navigation
}) {

  return (
    <section>
      <div className='relative bg-primary pb-32'>
        <div className='relative px-64 py-32 z-20 '>
          <h1 className='text-white text-6xl pb-1 font-bold font-heading'>{title}</h1>
          {subtitle && <p className='font-body text-xl text-grey-400'>{subtitle}</p>}
        </div>
        <div className='absolute bottom-0 top-0 right-0 w-1/2 ml-auto'>
          <img
            width={1240}
            height={540}
            alt={`Cover Image for ${title}`}
            className={'h-full object-cover'}
            src={imageBuilder(image).width(1240).height(540).url()}
          />
        </div>
        <div className='absolute w-1/2 h-full top-0 right-0 bottom-0 bg-gradient-to-r from-primary'></div>
      </div>
      <div className='relative bg-grey-300 h-52 w-full'>
      {navigation?.length && <NavFeaturedLinks links={navigation} />}
      </div>
    </section>
  )
}
