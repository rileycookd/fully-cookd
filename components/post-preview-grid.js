import React from 'react'
import PostPreview from './post-preview'

function PostPreviewGrid (props) {


  return (
    <div>
      {props.title && (
        <h2>
          {props.title}
        </h2>
      )}
      <ul className='flex flex-col gap-y-4'>
        {props.nodes && (
          props.nodes.map((node, i) => (
            <li key={node.id}>
              <PostPreview {...node} />
            </li>
          ))
        )}
      </ul>    
    </div>
  )
}

PostPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: ''
}

export default PostPreviewGrid
