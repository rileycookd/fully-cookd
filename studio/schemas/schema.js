import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Document types
import project from './documents/project'
import client from './documents/client'
import category from './documents/category'
import siteSettings from './documents/siteSettings'
import page from './documents/page'
import contact from './documents/contact'
import testimonial from './documents/testimonial'
import companyInfo from './documents/companyInfo'
import blog from './documents/blog'

// Block types
import * as blocks from './blocks'

// Object types
import mainImage from './objects/mainImage'
import blockText from './objects/blockText'
import link from './objects/link'
import cta from './objects/cta'



const allBlocks = Object.values(blocks).map((block) => {
  return { ...block, fields: block.fields }
})

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    project,
    client,
    category,
    siteSettings,
    page,
    contact,
    testimonial,
    companyInfo,
    blog,

    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockText,
    mainImage,
    link,
    cta,
  ])
  .concat(allBlocks),
})
