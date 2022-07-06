import markdownStyles from './markdown-styles.module.css'
import SanityBlockContent from '@sanity/block-content-to-react'

export default function BlockContent({ content }) {
  return (
    <div className="max-w-2xl mx-auto">
      <SanityBlockContent blocks={content} projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID} dataset={process.env.NEXT_PUBLIC_SANITY_DATASET} className={markdownStyles.markdown} />
    </div>
  )
}