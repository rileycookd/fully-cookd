import { MdLink } from 'react-icons/md'


export default {
  name: 'ctaBlock',
  title: 'Call-to-action block',
  type: 'object',
  icon: MdLink,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type:'string'
    },
    {
      name: 'highlight',
      title: 'Highlight',
      description: 'Type the word(s) from title to highlight',
      type: 'array',
      of: [
        { type: 'string' }
      ],
      options: {
        layout: 'tags'
      },
      validation: Rule => Rule.custom((highlight, context) => {
        if(highlight && context.parent.title) {
          let titleArray = context.parent.title.split(" ")
          let errors = highlight.filter(word => {
            return !titleArray.includes(word)
          })
          console.log(errors)
          if(errors.length) {
            return `"${errors[0]}" not found in title`
          }
        } 

        return true
      })
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: '(Optional)',
    },
    {
      name: 'cta',
      title: 'Call-to-action',
      type: 'link',
    },
  ],
  preview: {
    select: {
      subtitle: 'title'
    },
    prepare ({ subtitle }) {
      return {
        title: 'Call-to-action block',
        subtitle
      }
    }
  }
}