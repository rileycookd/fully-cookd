import { AiFillFileAdd } from 'react-icons/ai'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { parseISO, format } from 'date-fns'

export default {
  type: 'object',
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
      options: {
        // dateFormat: 'YYYY-MM-DD',
        // timeFormat: 'HH:mm',
        timeStep: 15,
        // calendarTodayLabel: 'Today'
      },
      validation: Rule => Rule.required().custom((startDate, context) => {
        const expirationDate = context.document.packages.find(p => p._key === context.path[1]._key).end
        if (new Date(expirationDate) < new Date(startDate.slice(0, -14))) {
          return 'Start datetime must be before the end date of the package'
        }
        
        return true
      })
    },
    {
      title: 'End time',
      name: 'end',
      type: 'datetime',
      options: {
        // dateFormat: 'YYYY-MM-DD',
        // timeFormat: 'HH:mm',
        timeStep: 15,
        // calendarTodayLabel: 'Today'
      },
      validation: Rule => [
        Rule.required().min(Rule.valueOfField('start')).error('Must be later that start time'),
        // Rule.max(Rule.valueOfField('start')).warning('End time is not on the same day')
      ]
    },
    {
      title: 'Cancelled',
      name: 'cancelled',
      type: 'boolean',
      initialValue: false
    },
    {
      title: 'Homework',
      name: 'tasks',
      type: 'array', 
      of: [
        {
          title: 'Assignments',
          name: 'homework',
          type: 'homework',
        },
      ]
    },
    {
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          title: 'Link',
          name: 'link',
          type: 'link'
        },
      ]
    },
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [
        { type: 'mainImage' }
      ]
    },
    {
      title: 'Files',
      name: 'files',
      type: 'array',
      of: [
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