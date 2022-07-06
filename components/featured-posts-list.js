import React from 'react';
import FeaturedPost from './featured-post'

export default function FeaturedPostsList(props) {
  const {
    posts
  } = props

  return (
    <section>
      <ul className=''>
        {projects.map((p, i)=> (
          <FeaturedPost key={p._id} {...p} />
        ))}
      </ul>

    </section>
  )
}