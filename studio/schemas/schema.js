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

// Object types
import mainImage from './objects/mainImage'
import classPricing from './objects/classPricing'
import classPackage from './documents/classPackage'
import classSizeDiscount from './objects/classSizeDiscount'
import frequentlyAskedQuestion from './objects/frequentlyAskedQuestion'
import testimonial from './documents/testimonial'
import classDayTime from './objects/classDayTime'
import registrationPackage from './objects/registrationPackage'
import classSchema from './objects/class'
import timeRange from './objects/timeRange'
import languageLevelGroup from './objects/languageLevelGroup'

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

    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
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
    languageLevelGroup
  ])
})
