import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getPageFooter, getPageBlocks } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Link from 'next/link'
import HeroPage from '../components/hero-page'
import InfoBlock from '../components/info-block'
import PostPreviewGrid from '../components/post-preview-grid'
import TestimonialBlock from '../components/testimonial-block'



export default function Index({ footer, pageBlocks }) {

  const content = (pageBlocks || [])
    .map((c, i) => {
      let el = null;
      switch (c._type) {
        case "infoBlock":
          el = <InfoBlock key={c._key} {...c} />;
          break;
        case "classTypesList":
          let nodes = c.classTypes
          el = (
          <div className='container mx-auto px-5 flex my-48 gap-x-24'>
            <div className='w-1/3 flex flex-col items-start'>
              <h3 className='text-primary text-3xl pb-2 font-bold font-heading'>{c.title}</h3>
              <p className='font-body text-xl text-primary mb-4'>{c.subtitle}</p>
              <Link href="/">
                <a className='bg-accent hover:bg-accent-400 text-primary font-bold font-heading py-6 px-8 rounded'>{c.cta.title}</a>
              </Link>
            </div>
            <div className='flex-1'>
              <PostPreviewGrid key={c._key} nodes={nodes} />
            </div>
          </div>
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
          <title>Next.js Blog Example with {CMS_NAME}</title>
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
  return {
    props: { footer, pageBlocks },
    revalidate: 1
  }
}
