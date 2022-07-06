import { MdLink } from 'react-icons/md'
import linkFields from '../parts/link'

export default {
  title: 'Call-to-action',
  name: 'cta',
  icon: MdLink,
  type: 'object',
  // fieldsets: [
  //   {
  //     title: 'Link',
  //     name: 'link',
  //     description: 'Only the first value of these will be used'
  //   }
  // ],
  fields: [
    {
      title: 'Style',
      name: 'style',
      type: 'string',
      options: {
        layout: 'radio',
        list: ['primary', 'secondary', 'tertiary']
      }
    },
    {
      title: 'Text',
      name: 'title',
      type: 'string',
      description: 'This will be the button or link text',
      hidden: ({parent}) => parent?.style === 'icon',
    },
    ...linkFields,
  ],
  preview: {
    select: {
      title: 'title',
      landingPage: 'page.slug.current',
      route: 'path',
      link: 'url',
      innerPageRoute: 'document.slug.current',
      innerPageTitle: 'document.title',
    },
    prepare ({title, landingPage, innerPageRoute, innerPageTitle, route, link}) {
      const linkTitle = innerPageTitle || title || 'Missing title'
      let subtitle = 'Not set'
      if (landingPage) {
        subtitle = `Route: /${landingPage}`
      }
      if (innerPageRoute) {
        subtitle = `Route: /${innerPageRoute}`
      }
      if (route) {
        subtitle = `Route: ${route}`
      }
      if (link) {
        subtitle = `External: ${link}`
      }
      return {
        title: linkTitle,
        subtitle
      }
    }
  }
}