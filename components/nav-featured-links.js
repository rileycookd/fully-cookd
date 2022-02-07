import React from 'react'
import { ImArrowRight2 as ArrowIcon } from 'react-icons/im'

export default function NavFeaturedLinks ({links}) {

  console.log("PROPS: ", links)
  
  return (
    <div className='divide-x divide-primary-400 absolute -top-1/2 left-0 right-0 w-full z-10 container flex justify-center mx-auto px-5'>
      {links?.map((link, i) => {
        let borderRadius = ''
        if(i === 0) borderRadius = 'rounded-l-lg'
        if(i === links.length-1) borderRadius ='rounded-r-lg'
        return (
          <div 
            key={link._key} 
            className={`w-1/4 shadow-md flex flex-col text-grey-400 ${borderRadius} py-12 px-8 bg-primary-300 hover:bg-primary-200 cursor-pointer`}>
            <h5 className='font-heading text-md font-bold mb-2'>{link.title}</h5>
            {link?.subtitle && <p className='font-body text-grey-400 text-base'>{link.subtitle}</p>}
            <ArrowIcon className='group-hover:m-2 mt-3 text-accent w-5 h-5'/>
          </div>
        )
      })}
    </div>
    
  )
}