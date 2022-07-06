import { BsListUl } from 'react-icons/bs'


export default {
  name: 'featuredPostsBlock',
  title: 'Featured posts',
  type: 'object',
  icon: BsListUl,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: true,
      initialValue: 'Featured posts'
    },
    {
      name: 'content',
      title: 'Featured blogs',
      type: 'array',
      description: '(Optional) If left blank will show most recent',
      of: [
        { 
          type: 'reference',
          to: [
            { type: 'blog' }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      posts: 'posts'
    },
    prepare ({ posts }) {
      return {
        title: 'Featured blog posts',
        subtitle: `${posts?.length ? `${posts.length} post${posts.length !== 1 ? 's' : ''}` : 'Most recent posts'}`
      }
    }
  }
}