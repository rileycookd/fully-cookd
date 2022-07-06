import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from 'components/layout'
import { getAllProjectsWithSlug, getProjectBySlug } from 'lib/api'
import { BsCaretRightFill } from 'react-icons/bs'
import { FaFacebookF as FacebookIcon, FaInstagram as InstagramIcon, FaDribbble as DribbbleIcon, FaBehance as BehanceIcon } from 'react-icons/fa'
import BlockContent from 'components/block-content'
import Link from 'next/link'
import Footer from 'components/footer'
import { parseISO, format, formatDistanceStrict } from 'date-fns'
import PageContent from 'components/page-content'

export default function ClassType({ projectData }) {
  const router = useRouter()
  console.log(projectData)
  const {
    title,
    categories,
    client,
    url,
    start,
    end,
    overview,
  } = projectData

  if (!router.isFallback && !projectData?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout>
      <header className='w-full bg-accent py-48'>
        <div className='flex flex-col gap-8 items-center'>
          <div className='flex flex-col items-center'>
            {/* {categories && (
              <p className='flex gap-3 font-bold text-primary/60 font-heading '>
                {categories.map(c => (<span>{c.title}</span>))}
              </p>
            )}  */}
            <h1 className='font-heading font-bold text-5xl'>{title}</h1>
          </div>
          <ul className='flex gap-2 items-center'>
            <li>
              <a className='group flex items-center cursor-pointer hover:bg-primary transition-colors duration-100 justify-center bg-accent-100 p-2 rounded-full'>
                <FacebookIcon className='fill-primary w-6 h-6 group-hover:fill-white transition-colors duration-100' />
              </a>
            </li>
            {/* <li>
              <a className='group flex items-center cursor-pointer hover:bg-primary transition-colors duration-100 justify-center bg-accent-100 p-2 rounded-full'>
                <InstagramIcon className='fill-primary w-6 h-6 group-hover:fill-white transition-colors duration-100' />
              </a>
            </li> */}
            <li>
              <a className='group flex items-center cursor-pointer hover:bg-primary transition-colors duration-100 justify-center bg-accent-100 p-2 rounded-full'>
                <DribbbleIcon className='fill-primary w-6 h-6 group-hover:fill-white transition-colors duration-100' />
              </a>
            </li>
            <li>
              <a className='group flex items-center cursor-pointer hover:bg-primary transition-colors duration-100 justify-center bg-accent-100 p-2 rounded-full'>
                <BehanceIcon className='fill-primary w-6 h-6 group-hover:fill-white transition-colors duration-100' />
              </a>
            </li>
            <a 
              href={url}
              className='group ml-8 flex items-center gap-2 text-body text-base px-4 py-3 text-black font-bold rounded bg-white transition-colors duration-75 hover:bg-primary hover:text-white cursor-pointer'
            >
              View site <BsCaretRightFill className='group-hover:fill-white fill-black w-3 h-3 transition-colors duration-100'/>
            </a>
          </ul>
        </div>
      </header>
      <section className='p-page flex py-24'>
        <div className='flex flex-1  w-max flex-col gap-6 mr-12'>
          {(start && end) && (
            <div className='mt-20 w-max mr-12 flex flex-col gap-8'>
              <div className='flex flex-col'>
                <h4 className='font-heading text-accent font-bold'>Launch</h4>
                <p className='font-heading text-primary'>{format(parseISO(start), 'MMMM yyyy')}</p>
              </div>
              <div className='flex flex-col'>
                <h4 className='font-heading text-accent font-bold'>Timeline</h4>
                <p className='font-heading text-primary'>{formatDistanceStrict(parseISO(start), parseISO(end))}</p>
              </div>
            </div>
          )}
        </div>
        <div className='w-full relative flex-1 min-w-max max-w-2xl mx-auto'>
          <h2 className='font-heading font-bold text-3xl text-accent'>Project Overview</h2>
          <BlockContent content={overview} />
        </div>
        <div className='flex-1'></div>
      </section>
      <section>
        <PageContent content={projectData?.content} />
      </section>
      <Footer />
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const projectData = await getProjectBySlug(params?.slug)
  return {
    props: {
      projectData: projectData || null
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const allProjects = await getAllProjectsWithSlug()
  return {
    paths:
      allProjects?.map((project) => ({
        params: {
          slug: project?.slug,
        },
      })) || [],
    fallback: true,
  }
}