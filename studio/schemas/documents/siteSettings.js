export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text'
    },
    {
      name: 'featuredPhotos',
      title: 'Featured Photos',
      type: 'array',
      of: [
        { type: 'mainImage' }
      ]
    }
  ]
}