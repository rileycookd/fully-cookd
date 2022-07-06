import { IoMdSettings } from 'react-icons/io'

export default {
  name: 'companyInfo',
  title: 'Company info',
  type: 'document',
  icon: IoMdSettings,
  fieldsets: [
    { name: 'social', title: 'Social'}
  ],
  fields: [
    {
      name: 'name',
      title: 'Company name',
      type: 'string'
    },
    // {
    //   name: 'description',
    //   title: 'Site Description',
    //   type: 'text'
    // },
    {
      name: 'facebook',
      title: 'Facebook',
      type: 'url',
      fieldset: 'social'
    },
    {
      name: 'instagram',
      title: 'Instagram',
      type: 'url',
      fieldset: 'social'
    },
    {
      name: 'dribbble',
      title: 'Dribbble',
      type: 'url',
      fieldset: 'social'
    },
    {
      name: 'behance',
      title: 'Behance',
      type: 'url',
      fieldset: 'social'
    },
  ]
}