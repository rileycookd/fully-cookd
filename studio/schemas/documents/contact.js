import { BsPersonCircle } from 'react-icons/bs'

export default {
  name: 'contact',
  type: 'document',
  title: 'Contact',
  icon: BsPersonCircle,
  fieldsets: [
    {name: 'contact', title: 'Contact info'},
    {name: 'info', title: 'Personal info'},
  ],
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Full name',
      fieldset: 'info'
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      fieldset: 'contact'
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
      fieldset: 'contact'
    },
    {
      name: "city",
      title: "City",
      type: "string",
      fieldset: 'contact'
    },
    {
      name: "country",
      title: "Country",
      type: "string",
      fieldset: 'contact'
    },
    {
      name: "timezone",
      title: "Timezone",
      type: "string",
      fieldset: 'contact'
    },
    {
      title: 'Related client',
      name: 'client',
      type: 'reference',
      to: { type: 'client' },
    },
    {
      name: 'image',
      title: 'Client photo',
      type: 'mainImage'
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    },
    prepare ({ title, media }) {
      return {
        title,
        media
      }
    }
  }
}