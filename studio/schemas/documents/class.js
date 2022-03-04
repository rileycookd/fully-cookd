import { AiFillFileAdd } from 'react-icons/ai'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { parseISO, format } from 'date-fns'

export default {
  type: 'document',
  name: 'class',
  title: 'Class',
  icon: FaChalkboardTeacher, 
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      description: '(optional)'
    },
    {
      title: 'Start time',
      name: 'start',
      type: 'datetime',
      validation: Rule => Rule.required(),
    },
    {
      title: 'End time',
      name: 'end',
      type: 'datetime',
      validation: Rule => Rule.required().min(Rule.valueOfField('start')),
    },
    {
      title: 'Cancelled',
      name: 'cancelled',
      type: 'boolean',
      initialValue: false
    },
    {
      title: 'Related registration',
      name: 'registration',
      type: 'reference',
      to: [
        { type: 'registration '}
      ]
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        // {
        //   title: 'Homework',
        //   name: 'homework',
        //   type: 'homework'
        // },
        {
          title: 'Link',
          name: 'link',
          type: 'link'
        },
        // {
        //   title: 'Resource',
        //   name: 'resource',
        //   type: 'reference',
        //   to: [
        //     { type: 'resource' }
        //   ]
        // },
        {
          title: 'Image',
          name: 'image',
          type: 'mainImage'
        },
        {
          title: 'File',
          name: 'file',
          type: 'file',
          icon: AiFillFileAdd,
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Title',
              options: {
                isHighlighted: true
              }
            },
          ]
        },
      ]
    },
  ],
  preview: {
    select: {
      start: 'start',
      end: 'end',
      title: 'title',
    },
    prepare ({ start, end, title }) {
      let subtitle = ''
      if(start && end) {
        let parsedStart = parseISO(start)
        let parsedEnd = parseISO(end)
        let formattedStart = format(parsedStart, "dd/MM/yy kk:mm")
        let formattedEnd = format(parsedEnd, "kk:mm")
        subtitle = `${formattedStart} - ${formattedEnd}`
      }
    
      return {
        title: `${title ? title : 'Class'}`,
        subtitle,
      }
    }
  }
}