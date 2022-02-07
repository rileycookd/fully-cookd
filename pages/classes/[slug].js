import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '../../components/layout'
import { getAllClassTypesWithSlug, getClassTypeBySlug } from '../../lib/api'
import { getClassSizeString, getClassDurationString } from '../../lib/helpers'
import { imageBuilder } from '../../lib/sanity'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import markdownStyles from '../../components/markdown-styles.module.css'
import BlockContent from '@sanity/block-content-to-react'

import { IoTimeOutline as DurationIcon } from 'react-icons/io5'
import { AiOutlineDollar as MoneyIcon } from 'react-icons/ai'
import { BsPeople as StudentsIcon } from 'react-icons/bs'
// import BlockText from '../../components/block-text'
import Testimonial from '../../components/testimonial'
import Pricing from '../../components/pricing'
// import FAQ from '../../components/faq'
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default function Post({ classType }) {
  const router = useRouter()
  console.log("POST: ", classType)
  const {
    title,
    image,
    min,
    max,
    pricing,
    description,
    testimonial,
    faq
  } = classType
  
  if (!router.isFallback && !classType?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout>
      <div className='bg-white' >
        <div className='flex container mx-auto px-5 py-12 gap-x-8'>
          <div className='flex-1 flex flex-col gap-y-8'>
            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <h1 className='font-heading text-3xl text-primary font-bold mb-2'>{classType?.title}</h1>
                <ul className='flex gap-8'>
                  <li className='flex items-center'>
                    <StudentsIcon className='text-secondary w-5 h-5 mr-2'/>
                    <p className='font-heading text-primary'>{getClassSizeString(classType?.min, classType.max)} student{max > 1 ? 's' : ''}</p>
                  </li>
                  <li className='flex items-center'>
                    <DurationIcon className='text-secondary w-5 h-5 mr-2'/>
                    <p className='font-heading text-primary'>{getClassDurationString(classType?.pricing)}</p>
                  </li>
                  <li className='flex items-center'>
                    <MoneyIcon className='text-secondary w-5 h-5 mr-2'/>
                    <p className='font-heading text-primary'>$15</p>
                  </li>
                </ul>
              </div>
            </div>
            {classType?.image && (
              <div className='w-full'>
                <img
                  width={1280}
                  height={720}
                  alt={`Cover Image for ${classType?.title}`}
                  className={'h-full object-cover'}
                  src={imageBuilder(classType?.image).width(1280).height(720).url()}
                />
              </div>
            )}
            <Tabs 
              className=''
              selectedTabClassName='border-b-3 border-accent hover:border-accent'
            >
              <TabList className='flex border-b border-grey-300 gap-x-6'>
                <Tab 
                  className='font-heading text-grey-500 text-xl py-2 cursor-pointer border-transparent transition-all duration-100 ease-out border-b-2 hover:border-grey-400'
                >Overview</Tab>
                <Tab className='font-heading text-grey-500 text-xl py-2 cursor-pointer border-transparent transition-all duration-100 ease-out border-b-2 hover:border-grey-400'>Pricing</Tab>
                {testimonial && (
                  <Tab className='font-heading text-grey-500 text-xl py-2 cursor-pointer border-transparent transition-all duration-100 ease-out border-b-2 hover:border-grey-400'>Reviews</Tab>
                )}
                {faq && (
                  <Tab className='font-heading text-grey-500 text-xl py-2 cursor-pointer border-transparent transition-all duration-100 ease-out border-b-2 hover:border-grey-400'>FAQ</Tab>
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
                  <div style={{maxWidth: '600px'}}>
                    <Testimonial {...testimonial} />
                  </div>
                </TabPanel>
              )}
              {faq && (
                <TabPanel>
                  {/* <FAQ questions={faq._rawQuestions} /> */}
                </TabPanel>
              )}
            </Tabs>
          </div>
          <div className='w-1/3'>Sidebar</div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await getClassTypeBySlug(params.slug)
  console.log("PAGE PROPS: ", data)
  return {
    props: {
      classType: data || null,
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const allClasses = await getAllClassTypesWithSlug()
  console.log("ALL CLASSES: ", allClasses)
  return {
    paths:
      allClasses?.map((classType) => ({
        params: {
          slug: classType.slug,
        },
      })) || [],
    fallback: true,
  }
}
