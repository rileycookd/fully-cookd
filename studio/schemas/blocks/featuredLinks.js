import React from 'react'
import { HiLink } from 'react-icons/hi'
import * as FontAwesome from 'react-icons/fa'
import linkFields from '../parts/link'

export default {
  name: 'featuredLinksBlock',
  title: 'Featured links',
  type: 'object',
  icon: HiLink,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: '(Optional)'
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: '(Optional)'
    },
    {
      name: 'icon',
      title: 'Icon name (Font Awesome)',
      description: (
        <>
          (Optional) Copy icon name from Font Awesome:{" "}
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
    {
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          name: 'link',
          type: 'object',
          title: 'Link',
          fields: [
            {
              title: 'Title',
              name: 'title',
              type: 'string',
            },
            {
              title: 'Subtitle',
              name: 'subtitle',
              type: 'string'
            },
            {
              name: 'icon',
              title: 'Icon name (Font Awesome)',
              description: (
                <>
                  (Optional) Copy icon name from Font Awesome:{" "}
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
            ...linkFields,
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
      ]
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      links: 'links',
      icon: 'icon'
    },
    prepare ({ title, subtitle, icon, links}) {
      let displayIcon
      if(icon) displayIcon = FontAwesome[icon]
      return {
        title: 'Featured links',
        subtitle: `${links.length} link${links.length !== 1 ? 's' : ''}`,
        media: displayIcon
      }
    }
  }
}