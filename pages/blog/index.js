
import Layout from 'components/layout'
import Head from 'next/head'
import HeroMain from 'components/hero-main'
import { getAllBlogPosts, getPageById } from 'lib/api'
import ProjectList from 'components/project-list'
import InfoBlock from 'components/info-block'
import Footer from 'components/footer'
import TestimonialBlock from 'components/testimonial-block'
import CTABlock from 'components/cta-block'
import PageContent from 'components/page-content'

export default function Index({ projects, pageData }) {


  
  return (
    <>
      <Layout>
        <Head>
          <title>Blog | Fully Cookd </title>
        </Head>
        Blog Page!
        <PageContent content={pageData?.content} />
        <Footer />
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const posts = await getAllBlogPosts()
  const pageData = await getPageById('blog')
  return {
    props: { posts, pageData },
    revalidate: 1
  }
}
