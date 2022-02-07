import { BsLayoutTextWindow } from 'react-icons/bs'
import pageFields from '../parts/page'

export default {
  name: 'page',
  title: 'Page',
  icon: BsLayoutTextWindow,
  type: 'document',
  
  liveEdit: false,
  // Uncomment the next line to remove the pages document type from the create-menus.
  // __experimental_actions: ['update', 'publish', /* 'create', 'delete' */],
  fieldsets: [
    { 
      name: 'openGraph', 
      title: 'Open graph', 
      options: {
        collapsible: true,
        collapsed: false
      }
    }
  ],
  fields: [
    ...pageFields
  ]
}
