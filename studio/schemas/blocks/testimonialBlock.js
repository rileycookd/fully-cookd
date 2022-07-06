import { BsChatSquareQuote } from 'react-icons/bs'

export default {
  name: 'testimonialsBlock',
  title: 'Testimonials',
  type: 'object',
  icon: BsChatSquareQuote,
  fields: [
    // {
    //   name: 'title',
    //   title: 'Title',
    //   type: 'string',
    //   hidden: true,
    //   initialValue: 'Project list'
    // },
    {
      name: 'testimonials',
      title: 'Featured testimonials',
      type: 'array',
      of: [
        { 
          type: 'reference',
          to: [
            { type: 'testimonial' }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      testimonials: 'testimonials'
    },
    prepare ({ testimonials }) {
      return {
        title: 'Testimonials',
        subtitle: `${testimonials?.length ? `${testimonials.length} testimonial${testimonials.length !== 1 ? 's' : ''}` : 'No testimonials chosen'}`
      }
    }
  }
}