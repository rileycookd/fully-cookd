import { BsFileRichtext } from 'react-icons/bs'

export default {
  name: 'captionsListBlock',
  title: 'Captions list block',
  type: 'object',
  icon: BsFileRichtext,
  fields: [
    {
      name: 'content',
      title: 'Content',
      type:'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'content',
              title: 'Text',
              type: 'text',
              rows: 4,
            },
            {
              name: 'image',
              title: 'Image',
              type: 'mainImage',
            }
          ]
        }
      ]
    },
    {
      name: 'numbered',
      title: 'Numbered',
      type: 'boolean',
      initialValue: false,
    }
  ],
  preview: {
    select: {
      content: 'content',
      numbered: 'numbered'
    },
    prepare ({ content, numbered }) {
      let subtitle = `${content?.length ? `${content.length} item${content.length !== 1 ? 's' : ''}` : ''}`
      return {
        title: 'Captions list block',
        subtitle
      }
    }
  }
}