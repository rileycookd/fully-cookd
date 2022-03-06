import React from 'react'
import PostPreviewGridItem from './post-preview-grid-item'

function PostPreviewGrid (props) {


  return (
    <div>
      {props.title && (
        <h2>
          {props.title}
        </h2>
      )}
      <ul className='grid grid-cols-4 gap-4'>
        {props?.nodes?.map((node, i) => (
          <li key={node._id}>
            <PostPreviewGridItem {...node} index={i} />
          </li>
        ))}
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

{/* <ul className='flex flex-col gap-y-4'>
{props.nodes && (
  props.nodes.map((node, i) => (
    <li key={node.id}>
      <PostPreview {...node} index={i} />
    </li>
  ))
)}
</ul>  */}