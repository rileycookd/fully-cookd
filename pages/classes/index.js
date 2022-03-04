import Container from 'components/container'
import MoreStories from 'components/more-stories'
import HeroPost from 'components/hero-post'
import Intro from 'components/intro'
import Layout from 'components/layout'
import { getPageFooter, getPageBlocks, getAllLanguageData } from 'lib/api'
import Head from 'next/head'
import { CMS_NAME } from 'lib/constants'
import Link from 'next/link'
import HeroPage from 'components/hero-page'
import InfoBlock from 'components/info-block'
import PostPreviewGrid from 'components/post-preview-grid'
import TestimonialBlock from 'components/testimonial-block'
import LanguageRadioGroup from 'components/language-radio-group'
import ClassTypesBlock from 'components/class-types-block'



export default function Classes({ footer, languageData }) {

  return (
    <>
      <Layout footer={footer}>
        <Head>
          <title>Courses | Amelio Language Institute</title>
        </Head>
        <div className='mb-24'>
        <ClassTypesBlock languages={languageData} />
        {/* <TestimonialBlock />  */}
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const footer = await getPageFooter('homepage')
  const languageData = await getAllLanguageData()
  return {
    props: { footer, languageData },
    revalidate: 1
  }
}
