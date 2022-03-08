export default [
  {
    name: 'title',
    title: 'Page title',
    type: 'string'
  },
  // {
  //   name: 'navMenu',
  //   type: 'reference',
  //   title: 'Navigation menu',
  //   // weak: true, // Uncomment if you want to be able to delete navigation even though pages refer to it
  //   to: [{ type: 'navigationMenu' }],
  //   description: 'Which nav menu should be shown, if any',
  // },
  {
    name: 'content',
    type: 'array',
    title: 'Page sections',
    description: 'Add, edit, and reorder sections',
    of: [
      { type: 'hero' },
      { type: 'testimonialGroup' },
      { type: 'infoBlock' },
      { type: 'classTypesList' },
      { type: 'featuredLinksBlock' },
      // { type: 'form' },
    ],
  },
  {
    title: 'Open graph',
    name: 'openGraph',
    fieldset: 'openGraph',
    description: 'Set page meta info for SEO',
    type: 'openGraph'
  },
]