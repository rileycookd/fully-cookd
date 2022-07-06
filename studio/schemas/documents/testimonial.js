import { BsChatSquareQuote } from 'react-icons/bs'

export default {
  name: "testimonial",
  title: "Testimonial",
  type: 'document',
  icon: BsChatSquareQuote,
  fields: [  
    {
      name: 'contact',
      title: 'Contact',
      type: 'reference',
      to: [
        { type: 'contact' }
      ]
    },
    {
      name: 'client',
      title: 'Client',
      type: 'reference',
      to: [
        { type: 'client' }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'quote',
      title: 'Client quote',
      type: 'text',
    },
  ],
  preview: {
    select: {
      name: 'contact.name',
      quote: 'quote',
      photo: 'contact.image'
    },
    prepare({ name, quote, photo }) {
      const excerpt = !quote ? '' : quote.length >= 35 ? `"${quote.substring(0, 35)}..."` : `"${quote}"`
      const title = name ? name : 'Anonymous'
      return {
        title: title,
        subtitle: excerpt,
        media: photo
      }
    }
  }
}