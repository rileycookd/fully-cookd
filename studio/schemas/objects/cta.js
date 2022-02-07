import { MdLink } from 'react-icons/md'

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
        list: ['button', 'link', 'icon']
      }
    },
    {
      title: 'Text',
      name: 'title',
      type: 'string',
      description: 'This will be the button or link text',
      hidden: ({parent}) => parent?.style === 'icon',
    },
    {
      title: 'Link type',
      name: 'type',
      type: 'string',
      options: {
        list: [
          {title: 'Page', value: 'page'},
          {title: 'Document', value: 'document'},
          {title: 'Path', value: 'path'},
          {title: 'Url', value: 'url'}
        ], 
        layout: 'radio'
      },
      // validation: Rule => Rule.required()
    },
    {
      title: 'Page',
      name: 'page',
      type: 'reference',
      to: [{type: 'route'}],
      hidden: ({parent}) => parent?.type !== 'page',
      // validation: Rule => Rule.required()
    },
    {
      title: 'Document',
      name: 'document',
      type: 'reference',
      to: [
        {type: 'resource'},
        {type: 'classType'}
      ],
      hidden: ({parent}) => parent?.type !== 'document',
      // validation: Rule => Rule.required()
    },
    {
      title: 'Path',
      name: 'path',
      description: 'Example: /blog',
      type: 'string',
      hidden: ({parent}) => parent?.type !== 'path',
      // validation: Rule => Rule.required(),
    },
    {
      title: 'Url',
      name: 'url',
      type: 'string',
      description: 'Example: https://www.ameliolanguageinstitute.com',
      hidden: ({parent}) => parent?.type !== 'url',
      // validation: Rule => Rule.required()
    },
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