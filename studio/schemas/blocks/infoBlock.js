import { BsFileRichtext } from 'react-icons/bs'

export default {
  name: 'infoBlock',
  title: 'Info block',
  type: 'object',
  icon: BsFileRichtext,
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
    // {
    //   name: 'subtitle',
    //   title: 'Subtitle',
    //   type: 'string',
    //   description: '(Optional)',
    // },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'text', rows: 4 }
      ]
    },
    // {
    //   name: 'images',
    //   title: 'Images',
    //   type: 'array',
    //   of: [
    //     { type: 'mainImage' },
    //   ],
    //   options: {
    //     layout: 'grid',
    //   },
    // },
    {
      name: 'reverse',
      title: 'Reverse order',
      type: 'boolean'
    }
  ],
  preview: {
    select: {
      subtitle: 'title'
    },
    prepare ({ subtitle }) {
      return {
        title: 'Info block',
        subtitle
      }
    }
  }
}