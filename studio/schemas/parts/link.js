export default [
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
]