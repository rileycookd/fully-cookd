import React from 'react'
import Link from 'next/link'
import * as FontAwesome from 'react-icons/fa'
import { getLinkRoute } from 'lib/helpers'

export default function FeaturedLinksBlock(props) {
  console.log(props)
  const {
    links
  } = props
  console.log(links)

  return (
    <ul className='my-24 container mx-auto px-5 grid grid-cols-3 gap-3'>
      {links?.map(l => {
        let displayIcon
        if(l.icon) displayIcon = FontAwesome[l.icon]
        return (
          <li key={l._key} className='w-full h-full flex'>
            <Link href={getLinkRoute(l)}>
              <a className=' flex-1 bg-grey-200 hover:shadow-md border border-grey-300 rounded-md px-6 py-8 flex gap-6 cursor-pointer hover:bg-grey-300 transition-all duration-100'>
                <div className='p-2 bg-secondary-200 rounded-full self-center'>
                  {displayIcon && React.createElement(displayIcon, {className: 'h-6 w-6 fill-secondary'})}
                </div>
                <div className='flex-1 flex flex-col  gap-2'>
                  <h4 className='font-heading font-bold text-grey-800 text-base'>{l.title}</h4>
                  {l.subtitle && <p className='flex-1 font-body text-grey-900 text-sm'>{l.subtitle}</p>}
                </div>
              </a>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}