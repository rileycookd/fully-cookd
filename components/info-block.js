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
    <ul className='flex flex-1 gap-4'>
      {imageList}
    </ul>
  )


  const infoBox = (
    <div className='flex flex-1 justify-center flex-col py-12 pr-24'>
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
    <div className='flex w-full gap-24 my-32'>
      {reverse ? imageContainer : infoBox}
      {reverse ? infoBox : imageContainer}
    </div>
  )
}

export default InfoBlock