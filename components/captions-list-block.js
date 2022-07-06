import React from 'react'
import { imageBuilder } from 'lib/sanity'

export default function CaptionsListBlock(props) {
  const {
    content,
    numbered
  } = props

  return (
    <ul className='p-page flex flex-col w-full'>
      {content?.map((ci, i) => (
        <li 
          key={ci._key}
          className={`flex ${i % 2 === 0 ? '' : 'flex-row-reverse'}`}
        >
          <div className='bg-accent flex-1 flex items-center justify-center'>
            <div className='w-full max-w-md m-auto flex flex-col gap-2'>
              {numbered && (
                <p className='font-heading text-xl text-stroke font-bold text-secondary-200'>{('0' + `${i + 1}`).slice(-2)}</p>
              )}
              <h3 className='font-heading text-secondary-200 font-bold text-xl'>{ci.title}</h3>
              <p className='font-body text-white'>{ci.content}</p>
            </div>
          </div>
          {ci.image && (
            <div className='flex-1 overflow-hidden w-full'>
              <img
                width={800}
                height={800}
                alt={`Image for ${ci.title}`}
                className={'h-full object-cover'}
                src={imageBuilder(ci.image).width(800).height(600).url()}
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}