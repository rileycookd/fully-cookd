import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'
import comment from './comment'

// Document types
import registration from './documents/registration'
import teacher from './documents/teacher'
import student from './documents/student'
import classType from './documents/classType'
import faq from './documents/faq'
import level from './documents/level'
import language from './documents/language'
import company from './documents/company'
import page from './documents/page'
import route from './documents/route'
import resource from './documents/resource'
import navigationMenu from './documents/navigationMenu'
import siteSettings from './documents/siteSettings'
import footer from './documents/footer'
import homepage from './documents/homepage'
import testimonial from './documents/testimonial'
import contactForm from './documents/contactForm'


// Block types
import * as blocks from './blocks'

// Object types
import mainImage from './objects/mainImage'
import classPricing from './objects/classPricing'
import classPackage from './documents/classPackage'
import classSizeDiscount from './objects/classSizeDiscount'
import frequentlyAskedQuestion from './objects/frequentlyAskedQuestion'
import classDayTime from './objects/classDayTime'
import registrationPackage from './objects/registrationPackage'
import classSchema from './objects/class'
import timeRange from './objects/timeRange'
import languageLevelGroup from './objects/languageLevelGroup'
import cta from './objects/cta'
import ctaLabel from './objects/ctaLabel'
import openGraph from './objects/openGraph'
import ctaGroup from './objects/ctaGroup'
import blockText from './objects/blockText'
import link from './objects/link'
import dropdown from './objects/dropdown'




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
    post,
    author,
    category,
    registration,
    teacher,
    classType,
    student,
    testimonial,
    faq,
    level,
    language,
    company,
    page,
    route,
    resource,
    navigationMenu,
    siteSettings,
    footer,
    homepage,
    contactForm,

    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
    blockText,
    comment,
    mainImage,
    classPricing,
    classSizeDiscount,
    frequentlyAskedQuestion,
    classDayTime,
    registrationPackage,
    classSchema,
    classPackage,
    timeRange,
    languageLevelGroup,
    ctaLabel,
    cta,
    openGraph,
    ctaGroup,
    link,
    dropdown
  ])
  .concat(allBlocks),
})
