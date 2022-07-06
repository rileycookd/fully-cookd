import { IoMegaphone } from 'react-icons/io5'

export default {
  type: "document",
  name: 'blog',
  icon: IoMegaphone,
  title: 'Blog post',
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Post title',
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
      type: 'text',
      name: 'excerpt',
      title: 'Excerpt',
      rows: 4,
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
      title: 'Image',
      name: 'image',
      type: 'mainImage',
    },
  ]
}