import { BsListUl } from 'react-icons/bs'


export default {
  name: 'projectListBlock',
  title: 'Project List',
  type: 'object',
  icon: BsListUl,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: true,
      initialValue: 'Project list'
    },
    {
      name: 'projects',
      title: 'Featured projects',
      type: 'array',
      description: '(Optional) If left blank will show most recent',
      of: [
        { 
          type: 'reference',
          to: [
            { type: 'project' }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      projects: 'projects'
    },
    prepare ({ projects }) {
      return {
        title: 'Project list',
        subtitle: `${projects?.length ? `${projects.length} project${projects.length !== 1 ? 's' : ''}` : 'Most recent projects'}`
      }
    }
  }
}