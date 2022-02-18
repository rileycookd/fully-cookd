import { IoIosArrowDropdown } from 'react-icons/io'
import linkFields from '../parts/link'

export default {
  type: 'object',
  name: 'dropdown',
  title: 'Dropdown',
  icon: IoIosArrowDropdown, 
  fields: [
    {
      name: 'title',
      title: 'Link text',
      type: 'string'
    },
    {
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {type: 'link'},
        {type: 'dropdown'},
        // {type: 'featuredLinks'},
      ]
    },
  ]
}