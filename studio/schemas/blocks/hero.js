import { BsCardHeading } from 'react-icons/bs'


export default {
  name: 'hero',
  title: 'Hero',
  type: 'object',
  icon: BsCardHeading,
  fields: [
    {
      name: 'kicker',
      title: 'Kicker',
      type: 'string',
      description: '(Optional) Text that precedes the title'
    },
    {
      name: 'title',
      title: 'Title',
      type:'string'
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: '(Optional)',
    },
    {
      name: 'cta',
      title: 'Primary Call-to-action',
      type: 'link',
    },
    {
      name: 'cta2',
      title: 'Secondary Call-to-action',
      type: 'link',
      description: '(Optional)',
      collapsible: true,
      collapsed: true,
    },
    // {
    //   name: 'content',
    //   title: 'Content',
    //   type: 'array',
    //   of: [
    //     { type: 'text', rows: 4 }
    //   ]
    // },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        { type: 'mainImage' },
      ],
      options: {
        layout: 'grid',
      },
    },
  ],
  preview: {
    select: {
      subtitle: 'title'
    },
    prepare ({ subtitle }) {
      return {
        title: 'Hero',
        subtitle
      }
    }
  }
}