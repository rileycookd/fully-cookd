import { BsListUl } from 'react-icons/bs'

export default {
  name: 'classTypesList',
  title: 'Class types list',
  type: 'object',
  icon: BsListUl,
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
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare ({ title, subtitle }) {
      return {
        title: 'Class types list',
        subtitle: subtitle
      }
    }
  }
}