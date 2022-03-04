import React from 'react'
import { BsPeople as StudentsIcon } from 'react-icons/bs'
import { imageBuilder } from '../lib/sanity'
import Link from 'next/link'
import { getClassSizeString } from '../lib/helpers'

function PostPreview (props) {
  const {
    _id,
    title,
    excerpt,
    description,
    image,
    slug,
    pathPrefix,
    category,
    _type,
    children,
    min,
    max,
    pricing,
    index
  } = props

  console.log("Animation Delay:", `animation-delay-${index * 100}`)

  const renderMeta = () => {
    if(_type === 'resource') {
      return (
        <h5>{category.title}</h5>
      )
    }
    if(_type === 'classType') {
      
      return (
        <>
          <div className='flex items-center'>
            <StudentsIcon className='mr-2 text-secondary w-5 h-5'/>
            <p className='font-heading text-grey-600'>{getClassSizeString(min, max)}</p>
          </div>
          <p className='align-middle font-heading text-grey-600'>starting at: <span className='ml-1 font-medium font-heading text-secondary'>${pricing?.[0].price}+</span></p>
        </>
      )
    }
  }

  const fullPath = pathPrefix
    ? `/${pathPrefix}/${slug.current}`
    : `/${slug.current}`

  let animationDelay = ''
  if(index > 0 ) {
    animationDelay = `animation-delay-${index * 200}`
  }
    
  return (
    <Link href={fullPath}>
      <a key={_id} className={`flex animate-slide-up ${animationDelay} opacity-0 rounded-lg bg-white transition-all duration-100 border border-grey-400 hover:shadow-md overflow-hidden`}>
        <div className='w-5/12 p-4'>
          {image && (
            <img
              width={400}
              height={400}
              alt={`Image for ${title}`}
              className={'h-full object-cover'}
              src={imageBuilder(image).width(400).height(Math.floor((3 / 4) * 400)).url()}
            />
          )}
        </div>
        <div className='flex flex-col justify-between flex-1 px-4 py-6'>
          <div className=''>
            <h4 className='text-primary text-lg pb-2 font-bold font-heading'>{title}</h4>
            <p className='font-body text-base text-primary mb-4'>{excerpt || description}</p>
          </div>
          <div className='flex justify-between'>
            {renderMeta()}
          </div>
        </div>
      </a>
    </Link>
  )
}

export default PostPreview