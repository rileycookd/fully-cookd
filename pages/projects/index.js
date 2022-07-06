
import Layout from 'components/layout'
import Head from 'next/head'
import HeroMain from 'components/hero-main'
import { getAllProjects, getPageById } from 'lib/api'
import ProjectList from 'components/project-list'
import InfoBlock from 'components/info-block'
import Footer from 'components/footer'
import TestimonialBlock from 'components/testimonial-block'
import CTABlock from 'components/cta-block'

export default function Index({ projects, pageData }) {

  const content = (pageData?.content || [])
    .map((c, i) => {
      let el = null;
      switch (c._type) {
        case "infoBlock":
          el = <InfoBlock key={c._key} {...c} />;
          break;
        case "projectListBlock":
          if(!c.projects?.length) c.projects = projects
          el = <ProjectList key={c._key} {...c} />;
          break;
        case "hero":
          el = <HeroMain key={c._key} {...c} />
          break;
        case "testimonialsBlock":
          el = <TestimonialBlock key={c._key} {...c} />
          break;
        case "ctaBlock":
          el = <CTABlock key={c._key} {...c} />
          break;
        default:
          el = null;
      }
      return el;
    });

  
  return (
    <>
      <Layout>
        <Head>
          <title>Past Projects | Fully Cookd </title>
        </Head>
        <ProjectList projects={projects} />
        {content}
        <Footer />
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const projects = await getAllProjects()
  const pageData = await getPageById('projects')
  return {
    props: { projects, pageData },
    revalidate: 1
  }
}
