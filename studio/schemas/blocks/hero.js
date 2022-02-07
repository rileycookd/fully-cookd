import { BsCardHeading } from 'react-icons/bs'

export default {
  name: 'hero',
  title: 'Hero',
  icon: BsCardHeading,
  type: 'object',
  fieldsets: [
    { 
      name: 'cta', 
      title: 'CTA',
      description: '(Optional)',
      options: {
        collapsible: true,
        collapsed: true,
      }
    },
    { 
      name: 'navigation', 
      title: 'Navigation',
      description: '(Optional)',
      options: {
        collapsible: true,
        collapsed: true,
      }
    }
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: '(Optional)',
    },
    {
      name: 'cta',
      type: 'cta',
      title: 'Call-to-action',
      fieldset: 'cta',
    },
    {
      name: 'navigation',
      title: 'Featured links',
      type: 'array',
      of: [
        { type: 'ctaLabel' },
      ], 
      fieldset: 'navigation'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'mainImage',
      description: 'Add a featured image',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare ({title}) {
      return {
        title: title
      }
    }
  }
}