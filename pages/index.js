import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getPageFooter, getPageBlocks, getAllLanguageData } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Link from 'next/link'
import HeroPage from '../components/hero-page'
import InfoBlock from '../components/info-block'
import PostPreviewGrid from '../components/post-preview-grid'
import TestimonialBlock from '../components/testimonial-block'
import LanguageRadioGroup from '../components/language-radio-group'
import ClassTypesBlock from '../components/class-types-block'
import FeaturedLinksBlock from 'components/featured-links-block'



export default function Index({ footer, pageBlocks, languageData }) {
  console.log("LANGUAGE DATA: ", languageData)

  const content = (pageBlocks || [])
    .map((c, i) => {
      let el = null;
      switch (c._type) {
        case "infoBlock":
          el = <InfoBlock key={c._key} {...c} />;
          break;
        case "featuredLinksBlock":
          el = <FeaturedLinksBlock key={c._key} {...c} />;
          break;
        case "classTypesList":
          el = (
            <ClassTypesBlock key={c._key} content={{...c}} languages={languageData} />
          );
          break;
        case "testimonialGroup":
          el = <TestimonialBlock key={c._key} {...c} />;
          break;
        case "hero":
          el = <HeroPage key={c._key} {...c} />
          break;
        // case "form":
        //   el = <CtaForm key={c._key} {...c} />
        //   break;
        default:
          el = null;
      }
      return el;
    });

  console.log("Footer: ", footer)
  
  return (
    <>
      <Layout footer={footer}>
        <Head>
          <title>Amelio Language Institute | Personalized language courses</title>
        </Head>
        {content}
        {/* <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container> */}
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const pageBlocks = await getPageBlocks('homepage')
  const footer = await getPageFooter('homepage')
  const languageData = await getAllLanguageData()
  return {
    props: { footer, pageBlocks, languageData },
    revalidate: 1
  }
}
