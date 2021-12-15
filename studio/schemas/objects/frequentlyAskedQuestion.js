import { BsQuestionCircle } from 'react-icons/bs'

export default {
  name: 'frequentlyAskedQuestion',
  title: 'Question / Answer',
  type: 'object',
  icon: BsQuestionCircle,
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string'
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'text'
    }
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'answer'
    },
    prepare ({ title, subtitle }) {
      let excerpt = subtitle
      if (excerpt.length > 40) {
        excerpt = excerpt.slice(0, 40) + '...'
      }

      return {
        title: title,
        subtitle: excerpt
      }
    }
  }
}