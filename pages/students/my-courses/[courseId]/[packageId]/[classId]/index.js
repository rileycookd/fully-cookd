import React, { useState, useEffect } from 'react'

import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '/components/layout'

import { IoTimeOutline as DurationIcon, IoChevronForward, IoChevronBack } from 'react-icons/io5'
import { AiOutlineDollar as MoneyIcon } from 'react-icons/ai'
import { BsPeople as StudentsIcon } from 'react-icons/bs'
import { useClassById } from '/lib/swr'
import { getAllRegistrationsWithSlug, getRegistrationById } from '/lib/api'
import { useUser } from 'lib/swr';
import { imageBuilder } from 'lib/sanity'
import { useSession, getSession } from "next-auth/react";
import LayoutSidebar from 'components/layout-sidebar';
import Head from 'next/head'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import Flag from "react-world-flags";
import { HiLink as LinkIcon } from 'react-icons/hi'
import { IoMdDownload as DownloadIcon } from 'react-icons/io'




export default function Registration({ registration }) {
  const router = useRouter()
  const { data: session } = useSession()
  const { user, isError, isLoading } = useUser(session?.user?.email)

  const [registrationData, setRegistrationData] = useState({})
  const paramsArray = router.asPath.split('/').slice(-3)

  useEffect(() => {
  // const { classData, isLoading, isError } = useClassById(...paramsArray)
    if(user?.registrations) {
      let selectedRegistration = user.registrations
        .find(r => r._id === paramsArray[0])
      setRegistrationData(selectedRegistration)
    }

  }, [isLoading])

  const packageData = registrationData?.packages?.find(p => p._key === paramsArray[1])
  const classData = packageData?.classes?.find(cl => cl._key === paramsArray[2])

  const renderLinkItem = (item) => {
    let el = null
    if(item.type === 'url') {
      el = (
        <a 
          className='my-4 text-secondary font-body underline hover:text-secondary-500'
          href={item.url} target="_blank" rel="noopener noreferrer"
        >
          {item.title}
        </a>
      )
    }
    if(item.type === 'path') {
      el = (
        <Link href={item.path}>
          <a className='my-4 text-secondary font-body underline hover:text-secondary-500'>
            {item.title}
          </a>
        </Link>
      )
    }
    return el;
  }


  console.log("CLASS DATA: ", classData)
  return (
    <Layout hideNav={true}>
      <Head>
        <title>Class {classData?.start && `${format(parseISO(classData.start), 'dd MMM')} - ${classData.course}`}</title>
      </Head>
      <LayoutSidebar>
        <div className="min-h-screen container mx-auto px-12 py-16 flex flex-col gap-y-48 bg-grey-100">
        {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Something went wrong...</div>
          ) : (

            <div className='flex gap-8'>

              {classData && (


                <div className='flex-1 flex flex-col'>
                  {/* <div className='px-6 flex gap-2 mb-6 flex items-center'>
                    <Link href={`/students/my-courses/${registrationData._id}`}>
                      <a className='group font-heading font-medium text-grey-700 flex items-center gap-2 hover:underline hover:text-grey-800 transition-all duration-75'>
                       <IoChevronBack className='group-hover:stroke-grey-800 transition-colors duration-75 h-3 w-3 stroke-grey-700' />
                        {registrationData.classType.title}
                      </a>
                    </Link>
                  </div> */}
                  <div className='flex flex-col gap-12'>
                    <div className='rounded-lg border border-grey-400 p-8 bg-white'>

                      <div className='flex flex-col gap-12'>
                        <div className='flex items-center gap-4'>
                          <div className='flex rounded-sm overflow-hidden h-9 w-14'>
                            <Flag code={registrationData.language.code} width="120" style={{objectFit: 'cover'}} />
                          </div>
                          <div>
                            <h3 className='font-heading text-grey-800 mb-1'>{registrationData.classType.title}</h3>
                            <h1 className='font-heading text-lg font-bold text-primary'>{classData.title || format(parseISO(classData.start), "EEEE")}</h1>
                          </div>
                          <div className='flex-1 flex justify-end'>
                            <p className={`font-heading font-medium text-sm py-1 px-2  text-secondary bg-secondary-100 rounded-md`}>
                              {format(parseISO(classData.start), "dd MMM yyyy")}
                            </p>
                          </div>
                        </div>
                      </div>

                    </div>
                    {classData?.links && (
                      <div className='rounded-lg border border-grey-400 p-6 bg-white'>
                        <h2 className='w-full py-4 font-heading text-md font-bold text-primary border-b border-grey-300'>Links</h2>
                        <ul className=''>
                          {classData.links.map(item => (
                            <li key={item._key} className='flex items-center'>
                              <LinkIcon className='w-4 h-4 mr-2 fill-grey-700' />
                              {renderLinkItem(item)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {classData?.files && (
                      <div className='rounded-lg border border-grey-400 p-6 bg-white'>
                        <h2 className='w-full py-4 font-heading text-md font-bold text-primary border-b border-grey-300'>Files</h2>
                        <ul className=''>
                          {classData.files.map(item => (
                            <li key={item._key} className='flex items-center'>
                              <DownloadIcon className='w-4 h-4 mr-2 fill-grey-700' />
                              <a 
                                className='my-4 text-secondary font-body underline hover:text-secondary-500'
                                href={item.asset.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                              >
                                {item.title || item.asset.originalFileName}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    
                    {classData?.images && (
                      <div className='rounded-lg border border-grey-400 p-6 bg-white'>
                        <h2 className='w-full py-4 font-heading text-md font-bold text-primary border-b border-grey-300'>Images</h2>
                        <ul className='flex flex-wrap gap-2 my-4'>
                          {classData.images.map(image => (
                            <li key={image._key} className='flex'>
                              <a 
                                href={image.asset.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                className='p-2 rounded border border-grey-300 bg-white hover:bg-secondary-100 hover:border-secondary cursor-pointer transition-colors duration-75'
                              >
                                <img
                                  width={240}
                                  height={160}
                                  alt={`image`}
                                  className={'h-full object-cover'}
                                  src={imageBuilder(image).width(240).height(160).url()}
                                />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  </div>

                </div>

              )}

              <div className='w-1/3 max-w-xs'>
                <div className='flex flex-col gap-12'>
                  <div>
                    <h3 className='font-heading text-primary font-bold text-lg mb-2'>Assignments</h3>
                    <ul className='flex flex-col gap-2'>
                      {classData?.tasks?.length ? classData.tasks.map(t => (
                        <li className='p-4 border border-grey-400 rounded-md flex flex-col gap-1 bg-white'>
                          <h4 className='font-heading text-sm font-bold text-primary'>{t.title}</h4>
                          <p className='font-body text-sm text-grey-900'>{t.description}</p>
                          <p className='font-body text-sm text-grey-700 mt-2 text-right border-t border-grey-300 pt-2'>{t.due ? `Due: ${format(parseISO(t.due), 'h:mmaaa dd MMM')}` : '' }</p>
                        </li>
                      )) : (
                        <li>
                          <p>No assignments</p>
                        </li>
                      )}
                    </ul>
                  </div>

                </div>
              </div>

            </div>
          )}
        </div>
      </LayoutSidebar>
      

    </Layout>
  )
}

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       session: await getSession(context),
//     },
//   }
// }


// Teacher 
// Student
// Course (registration)

// Assignment 
// 