import { MdLink } from 'react-icons/md'

export default {
  title: 'Labeled Call-to-action',
  name: 'ctaLabel',
  icon: MdLink,
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Subtitle',
      name: 'subtitle',
      type: 'string'
    },
    {
      title: 'Call-to-action',
      name: 'cta',
      type: 'cta',
      // description: 'Leave the title blank if a Call-To-Action is not needed'
    }
  ]
}