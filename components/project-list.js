import React from 'react';
import ProjectListItem from './project-list-item'

export default function ProjectList(props) {
  const {
    projects
  } = props

  return (
    <section>
      <ul className=''>
        {projects.map((p, i)=> (
          <ProjectListItem key={p._id} index={i} {...p} />
        ))}
      </ul>

    </section>
  )
}