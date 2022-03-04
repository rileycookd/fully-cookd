// import Unsplash from 'part:sanity-plugin-asset-source-unsplash/image-asset-source'
// import Default from 'part:sanity-plugin-media/asset-source'
import { BsImage } from 'react-icons/bs'

export default {
  name: 'mainImage',
  title: 'Main image',
  type: 'image',
  icon: BsImage,
  options: {
    hotspot: true,
    // sources: [Unsplash]
  },
  fields: [
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Provide an optional caption',
    },
    {
      name: 'alt',
      title: 'Alternative text (for screen readers)',
      type: 'string',
      description: 'Overrides the alt text from the media library',
    }
  ]
}
