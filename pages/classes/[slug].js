import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '../../components/layout'
import { getAllClassTypesWithSlug, getPageFooter, getClassTypeBySlug, getAllLanguageData } from '../../lib/api'
import { getClassSizeString, getClassDurationString } from '../../lib/helpers'
import { imageBuilder } from '../../lib/sanity'
import markdownStyles from '../../components/markdown-styles.module.css'
import BlockContent from '@sanity/block-content-to-react'

import { parseISO, format } from 'date-fns'

import { IoTimeOutline as DurationIcon } from 'react-icons/io5'
import { AiOutlineDollar as MoneyIcon } from 'react-icons/ai'
import { BsPeople as StudentsIcon } from 'react-icons/bs'
// import BlockText from '../../components/block-text'
import Testimonial from '../../components/testimonial'
import Pricing from '../../components/pricing'
import CTAForm from '../../components/forms/cta-form'
import FAQ from '../../components/faq'
import Flag from 'react-world-flags'
import Footer from '../../components/footer'

export default function ClassType({ classType = {}, languageData = {}, footerData = {} }) {
  const router = useRouter()
  const {
    title,
    image,
    min,
    max,
    pricing,
    description,
    languages,
    testimonials,
    faq
  } = classType

  if (!router.isFallback && !classType?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout footer={footerData}>
      <div className='bg-grey-100' >
        <header className='relative w-full bg-primary'>
          <div className='relative flex flex-col z-10 gap-y-4 container mx-auto px-5 py-32'>
            <ul className='flex gap-3'>
              {languages?.map(l => (
                  <Flag code={l.code} width='32' style={{objectFit: 'cover'}} />
              ))}
            </ul>
            <h1 className='font-heading text-5xl text-white font-bold'>{title}</h1>
            <ul className='flex gap-8'>
              {(min && max) && (
                <li className='flex items-center'>
                  <StudentsIcon className='text-secondary w-5 h-5 mr-2'/>
                  <p className='font-heading text-grey-300'>{getClassSizeString(min, max)} student{max > 1 ? 's' : ''}</p>
                </li>
              )}
              {pricing && (
                <li className='flex items-center'>
                  <DurationIcon className='text-secondary w-5 h-5 mr-2'/>
                  <p className='font-heading text-grey-300'>{getClassDurationString(classType?.pricing)}</p>
                </li>
              )}
              <li className='flex items-center'>
                <MoneyIcon className='text-secondary w-5 h-5 mr-2'/>
                <p className='font-heading text-grey-300'>$15+</p>
              </li>
            </ul>
          </div>
          {image && (
            <div className='absolute top-0 right-0 bottom-0 w-2/3 h-full'>
              <img
                width={1280}
                height={720}
                alt={`Cover Image for ${classType?.title}`}
                className={'h-full w-full object-cover'}
                src={imageBuilder(classType?.image).width(1280).height(720).url()}
              />
              <div className='absolute top-0 right-0 bottom-0 left-0 w-full h-full bg-gradient-to-l from-primary-900/50 to-primary-900'></div>
            </div>
          )}
        </header>
        <div className='flex container mx-auto px-5 py-12 gap-x-8'>
          <div className='flex-1 flex flex-col gap-y-16'>
            {description && (
              <div className='flex flex-col p-6 bg-white rounded-sm border border-grey-300'>
                <h2 className='font-heading font-bold text-2xl text-primary'>About this course</h2>
                <BlockContent blocks={description} projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID} dataset={process.env.NEXT_PUBLIC_SANITY_DATASET} className={markdownStyles.markdown} />
              </div>
            )}


            <div className='flex flex-col p-6 bg-white rounded-sm border border-grey-300'>
              <h2 className='font-heading font-bold text-2xl text-primary'>Pricing</h2>
              <Pricing {...classType} />
            </div>
  

            {testimonials && (
              <div className='flex flex-col p-6 bg-white rounded-sm border border-grey-300'>
                <h2 className='font-heading font-bold text-2xl text-primary'>What our students think</h2>
                <div className='flex justify-start my-12'>
                    {testimonials.map((t) => (
                      <div className='flex items-center max-w-full'>
                        <h5 className='min-w-max font-heading font-bold px-8 text-grey-500'>{format(parseISO(t._createdAt), 'yyyy MMM')}</h5>
                          <Testimonial {...t} />
                      </div>
                    ))}
                </div>
              </div>
            )}
            {faq && (
              <div className='flex flex-col p-6 bg-white rounded-sm border border-grey-300'>
                <h2 className='font-heading font-bold text-2xl text-primary'>Frequent Questions</h2>
                <FAQ {...faq} open={true} />
              </div>
            )}
          </div>
          {languageData && (
            <div className='w-1/3 max-w-sm'>
              <CTAForm 
                className='sticky top-10 -mt-40'
                languageData={languageData} 
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const classData = await getClassTypeBySlug(params?.slug)
  const languageData = await getAllLanguageData()
  const footerData = await getPageFooter()
  return {
    props: {
      classType: classData || null,
      languageData,
      footerData
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const allClasses = await getAllClassTypesWithSlug()
  return {
    paths:
      allClasses?.map((classType) => ({
        params: {
          slug: classType?.slug,
        },
      })) || [],
    fallback: true,
  }
}

// GRAVEYARD 

{/* <Tabs 
  className=''
  selectedTabClassName='border-b-4 text-primary-500 border-accent hover:border-b-4 hover:text-primary hover:border-accent-300'
>
  <TabList className='flex border-b border-grey-300 gap-x-6'>
    <Tab 
      className='font-heading text-grey-500 text-xl py-2 cursor-pointer transition-all duration-100 ease-out hover:text-grey-600 hover:border-grey-400 hover:border-b-2'
    >Overview</Tab>
    <Tab className='font-heading text-grey-500 text-xl py-2 cursor-pointer transition-all duration-100 ease-out hover:text-grey-600 hover:border-grey-400 hover:border-b-2'>Pricing</Tab>
    {testimonial && (
      <Tab className='font-heading text-grey-500 text-xl py-2 cursor-pointer transition-all duration-100 ease-out hover:text-grey-600 hover:border-grey-400 hover:border-b-2'>Reviews</Tab>
    )}
    {faq && (
      <Tab className='font-heading text-grey-500 text-xl py-2 cursor-pointer transition-all duration-100 ease-out hover:text-grey-600 hover:border-grey-400 hover:border-b-2'>FAQ</Tab>
    )}
  </TabList>

  <TabPanel>
    <div className=''>
      <BlockContent blocks={description} projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID} dataset={process.env.NEXT_PUBLIC_SANITY_DATASET} className={markdownStyles.markdown} />
    </div>
  </TabPanel>

  <TabPanel>
    <Pricing {...classType} />
  </TabPanel>

  {testimonial && (
    <TabPanel>
      <div className='flex justify-start my-12'>
        <div className='max-w-lg'>
          <Testimonial {...testimonial} />
        </div>
      </div>
    </TabPanel>
  )}
  {faq && (
    <TabPanel>
      <FAQ {...faq} />
    </TabPanel>
  )}
</Tabs> */}
