import React from "react";
import Link from 'next/link';
import { BsCaretRightFill } from 'react-icons/bs'

export default function CTABlock(props) {
  const {
    title,
    subtitle,
    highlight,
    cta,
  } = props

  let highlightedTitle = title
  if(highlight) {
    highlightedTitle = title.split(" ").map(word => (
      highlight.includes(word) 
      ? (<span className='text-accent'>{word} </span>)
      : (<span>{word} </span>)
    ))    
  }

  return (
    <div className="p-page flex flex-col items-center gap-6 py-24">
      <h2 className="text-center text-3xl font-bold text-primary max-w-xl">{highlightedTitle}</h2>
      {cta && (
        <Link href='/contact'>
          <a className='flex items-center gap-2 text-body text-base px-4 py-3 text-black font-bold rounded bg-secondary transition-colors duration-75 hover:bg-secondary-800'>
            {cta.title} <BsCaretRightFill className='fill-black w-3 h-3'/>
          </a>
        </Link>
      )}
    </div>
  )
}