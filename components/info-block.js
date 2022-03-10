import React from 'react'
// import { buildImageObj, cn } from "../lib/helpers";
import { imageBuilder } from '../lib/sanity'

function InfoBlock ({images, description, subtitle, title, reverse}) {

  const imageList = images.map((image) => (
    <li key={image._key} className='flex-1'>
      <img
        width={400}
        height={400}
        alt={`${image.alt}`}
        className='object-cover'
        src={imageBuilder(image).width(400).height(400).url()}
      />
    </li>
  ))

  const imageContainer = (
    <ul className='max-h-max grid grid-cols-2 gap-4'>
      {imageList}
    </ul>
  )


  const infoBox = (
    <div className='flex flex-1 justify-center flex-col px-8 md:px-0 md:py-12 md:pr-12 lg:pr-24'>
      {title && (
        <h4 className='font-heading font-bold mb-4'>{title}</h4>
      )}
      {subtitle && (
        <p>{subtitle}</p>
      )}
      {description && (
        <p className='font-body text-base'>{description}</p>
      )}
    </div>
  )

  return (
    <div className='grid md:grid-cols-2 gap-8  md:gap-12 items-center xl:gap-24 my-32'>
      {reverse ? imageContainer : infoBox}
      {reverse ? infoBox : imageContainer}
    </div>
  )
}

export default InfoBlock