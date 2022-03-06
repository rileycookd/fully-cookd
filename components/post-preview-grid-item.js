import React from 'react'
import { BsPeople as StudentsIcon } from 'react-icons/bs'
import { imageBuilder } from '../lib/sanity'
import Link from 'next/link'
import { getClassSizeString } from '../lib/helpers'

function PostPreviewGridItem (props) {
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

  let animationDelay = `animation-delay-${(index + 1) * 100}`
  
  
  console.log(title, animationDelay)
    
  return (
    <Link href={fullPath}>
      <a className={`group flex flex-col animate-slide-up ${animationDelay} p-2 opacity-0 rounded-lg bg-white transition-all duration-100 border border-grey-400 hover:bg-secondary-100 hover:border-secondary hover:shadow-md overflow-hidden`}>
        <div className='relative rounded-t overflow-hidden'>
          {image && (
            <img
              width={800}
              height={800}
              alt={`Image for ${title}`}
              className={'h-full object-cover'}
              src={imageBuilder(image).width(800).height(Math.floor((9 / 16) * 800)).url()}
            />
          )}
          <div className='group-hover:bg-transparent transition-colors duration-75 absolute top-0 left-0 right-0 bottom-0 bg-primary-900/20'></div>
        </div>
        <div className='flex flex-col justify-between gap-4 flex-1 px-2 py-4'>
          <div className=''>
            <h4 className='text-primary text-base pb-2 font-bold font-heading'>{title}</h4>
            <p className='font-body text-sm text-primary mb-4'>{excerpt || description}</p>
          </div>
          <div className='flex justify-between mt-4'>
            {renderMeta()}
          </div>
        </div>
      </a>
    </Link>
  )
}

export default PostPreviewGridItem