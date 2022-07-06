import React from 'react'

export default function InfoBlock(props) {
  const {
    title,
    content,
    highlight,
    reverse,
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
    <div className={`p-page flex ${reverse ? 'flex-row-reverse' : ''} w-full gap-16 py-32`}>
      <h3 className={`flex-1 -mt-2 font-heading ${reverse ? 'text-left' : 'text-right'} text-3xl font-bold`}>
        {highlightedTitle}
      </h3>
      <div className='flex flex-1 flex-col gap-4'>
        {content?.map(p => (
          <p className='flex-1 font-body text-md'>{p}</p>
        ))}
      </div>

    </div>
  )
}