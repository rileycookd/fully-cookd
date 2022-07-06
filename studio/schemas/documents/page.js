import { BsLayoutTextWindow } from 'react-icons/bs'
// import pageFields from '../parts/page'

export default {
  name: 'page',
  title: 'Page',
  icon: BsLayoutTextWindow,
  type: 'document',
  fieldsets: [
    { 
      name: 'openGraph', 
      title: 'Open graph', 
      options: {
        collapsible: true,
        collapsed: false
      }
    }
  ],
  fields: [
    {
      name: 'title',
      title: 'Page title',
      type: 'string'
    },
    {
      name: 'content',
      type: 'array',
      title: 'Page sections',
      description: 'Add, edit, and reorder sections',
      of: [
        { type: 'hero' },
        { type: 'infoBlock' },
        { type: 'projectListBlock' },
        { type: 'testimonialsBlock' },
        { type: 'ctaBlock' },
        { type: 'featuredPostsBlock' },
      ],
    },
    // {
    //   title: 'Open graph',
    //   name: 'openGraph',
    //   fieldset: 'openGraph',
    //   description: 'Set page meta info for SEO',
    //   type: 'openGraph'
    // },
  ]
}
