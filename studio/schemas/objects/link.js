import { HiLink } from 'react-icons/hi'
import linkFields from '../parts/link'
import React from 'react'

export default {
  type: 'object',
  name: 'link',
  title: 'Link',
  icon: HiLink, 
  fields: [
    {
      name: 'title',
      title: 'Link text',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'icon',
      title: 'Icon name (Font Awesome)',
      description: (
        <>
        Copy icon name from Font Awesome:{" "}
          <a
            href="https://react-icons.github.io/react-icons/icons?name=fa"
            target="_blank"
            rel="noopener noreferrer"
          >
            Search icons
          </a>
        </>
      ),
      type: 'string'
    },
    ...linkFields
  ]
}