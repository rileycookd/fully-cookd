import { FaToolbox } from 'react-icons/fa'

export default {
  type: "document",
  name: 'project',
  icon: FaToolbox,
  title: 'Project',
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Project title',
      validation: Rule => Rule.required()
    },
    {
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      type: 'date',
      name: 'start',
      title: 'Start date',
    },
    {
      type: 'date',
      name: 'end',
      title: 'End date',
    },
    {
      type: 'text',
      name: 'excerpt',
      title: 'Excerpt',
      rows: 4,
    },
    {
      type: 'reference',
      name: 'client',
      title: 'Client',
      to: [
        { type: 'client' }
      ]
    },
    {
      type: 'array',
      name: 'categories',
      title: 'Categories',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'category' }
          ]
        },
      ]
    },
    {
      type: 'blockText',
      name: 'overview',
      title: 'Overview',
    },
    {
      title: 'Project link',
      name: 'url',
      type: 'url',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'mainImage',
    },
    {
      name: 'content',
      type: 'array',
      title: 'Page sections',
      description: 'Add, edit, and reorder sections',
      of: [
        { type: 'infoBlock' },
        { type: 'projectListBlock' },
        { type: 'testimonialsBlock' },
        { type: 'ctaBlock' },
        { type: 'captionsListBlock' },
      ],
    },
  ]
}