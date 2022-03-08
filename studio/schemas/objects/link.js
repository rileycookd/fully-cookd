import { HiLink } from 'react-icons/hi'
import linkFields from '../parts/link'
import React from 'react'
import * as FontAwesome from 'react-icons/fa'

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
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      icon: 'icon',
      page: 'page.title',
      document: 'document.title',
      path: 'path',
      url: 'url'
    },
    prepare ({ title, type, icon, page, document, path, url }) {
      let displayIcon
      let displayRoute
      if(type === 'path') displayRoute = path
      if(type === 'url') displayRoute = url
      if(type === 'document') displayRoute = document
      if(type === 'page') displayRoute = page
      if(icon) displayIcon = FontAwesome[icon]
      return {
        title: `Link: ${title}`,
        subtitle: `${type}: ${displayRoute}`,
        media: displayIcon
      }
    }
  }

}