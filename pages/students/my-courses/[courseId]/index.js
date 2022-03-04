import React, { useState, useEffect } from 'react'

import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '/components/layout'

import { IoTimeOutline as DurationIcon } from 'react-icons/io5'
import { AiOutlineDollar as MoneyIcon } from 'react-icons/ai'
import { BsPeople as StudentsIcon } from 'react-icons/bs'
import { useClassById } from '/lib/swr'
import { getAllRegistrationsWithSlug, getRegistrationById } from '/lib/api'
import { useUser } from 'lib/swr';
import { useSession, getSession } from "next-auth/react";
import LayoutSidebar from 'components/layout-sidebar';
import Head from 'next/head'
import { format, parseISO } from 'date-fns'
import { capitalize } from 'lib/helpers'
import Flag from "react-world-flags";
import { imageBuilder } from 'lib/sanity'
import { IoPersonCircle, IoAdd as AddIcon } from 'react-icons/io5'
import Link from 'next/link'
import { useRemainingClasses } from 'lib/swr'



export default function ClassPage({ registration }) {
  const router = useRouter()
  const { data: session } = useSession()


  const [registrationData, setRegistrationData] = useState({})
  const [remainingClasses, setRemainingClasses] = useState(null)
  

  const { user, isError, isLoading } = useUser(session?.user?.email)
  const { 
    classes, 
    isError: isErrorClasses,
    isLoading: isLoadingClasses 
  } = useRemainingClasses(
    registrationData?.calendarId 
    ? registrationData.calendarId
    : null
  )


  useEffect(() => {
    const paramsArray = router.asPath.split('/').slice(-1)
  // const { registrationData, isLoading, isError } = useClassById(...paramsArray)
    if(user?.registrations) {
      let selectedRegistration = user.registrations
        .find(r => r._id === paramsArray[0])
      setRegistrationData(selectedRegistration)
    }

  }, [isLoading])

  console.log(registrationData)

  useEffect(() => {
    if(!isLoading && classes?.length) setRemainingClasses(classes?.length)
  }, [classes])
  

  return (
    <Layout hideNav={true}>
      <Head>
        <title>{registrationData.classType ? `${registrationData.classType.title} - ${registrationData.students.length} student${registrationData.students.length > 1 ? 's' : ''}` : 'Registration details'}</title>
      </Head>
      <LayoutSidebar>
        <div className="container mx-auto px-12 py-16 flex flex-col gap-y-48 bg-grey-100">

          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Something went wrong...</div>
          ) : (

            <div className='flex gap-8'>

              {registrationData?.language?.title && (


                <div className='flex-1 flex flex-col gap-y-8'>
                  <div className='rounded-lg border border-grey-400 p-8 bg-white'>

                    <div className='flex flex-col gap-12'>
                      <div className='flex items-center gap-4'>
                        <div className='flex rounded-sm overflow-hidden h-9 w-14'>
                          <Flag code={registrationData.language.code} width="120" style={{objectFit: 'cover'}} />
                        </div>
                        <h1 className='font-heading text-lg font-bold text-primary'>{registrationData.classType.title}</h1>
                        <div className='flex-1 flex justify-end'>
                          <p className={`font-heading font-medium text-sm py-1 px-2 ${registrationData.state === 'pending' ? 'text-warning-400 bg-warning-100' : 'text-secondary bg-secondary-100'} rounded-md`}>
                            {capitalize(registrationData.state)}
                          </p>
                        </div>
                      </div>

                    </div>

                  </div>


                  <div className='rounded-lg border border-grey-400 p-8 bg-white'>

                    <div className='flex flex-col gap-12'>

                      <div className='flex flex-col'>
                        <div className='flex-1 flex pb-4 justify-start border-b border-grey-300'>
                          <h3 className='font-heading font-bold text-grey-600'>Course details</h3>
                        </div>
                        <ul className='flex flex-col'>
                          <li className='flex px-4 py-6'>
                            <div className='w-1/4 flex justify-start items-center'>
                              <h4 className='font-heading text-primary'>Language:</h4>
                            </div>
                            <div className='flex-1 flex'>
                              <p className='font-heading font-bold text-primary'>{registrationData.language?.title}</p>
                            </div>
                          </li>
                          <li className='flex px-4 py-6 bg-grey-100'>
                            <div className='w-1/4 flex justify-start items-center'>
                              <h4 className='font-heading text-primary'>Classes left:</h4>
                            </div>
                            <div className='flex-1 flex justify-between items-center'>
                              <p className={`font-heading font-bold ${remainingClasses <= 3 ? 'text-error' : 'text-primary'}`}>{remainingClasses} class{remainingClasses > 1 ? 'es' : ''} left</p>
                              <Link href={`${router.asPath}/add-classes`}>
                                <a className="flex bg-secondary hover:bg-secondary-300 transition-colors duration-75 py-2 px-3 rounded text-xs items-center font-medium font-heading text-white">
                                  Add <AddIcon className="ml-1 w-4 h-4 fill-white" />
                                </a>
                              </Link>
                            </div>
                          </li>
                          <li className='flex px-4 py-6'>
                            <div className='w-1/4 flex justify-start items-center'>
                              <h4 className='font-heading text-primary'>Students:</h4>
                            </div>
                            <div className='flex-1 flex'>
                              <p className='font-heading font-bold text-primary'>{registrationData.students.length} student{registrationData.students.length > 1 ? 's' : ''}</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>

                    </div>

                    <div className='rounded-lg border border-grey-400 p-8 bg-white'>

                      <div className='flex flex-col gap-12'>

                        <div className='flex flex-col'>
                          <div className='flex-1 flex pb-4 justify-start border-b border-grey-300'>
                            <h3 className='font-heading font-bold text-grey-600'>Schedule</h3>
                          </div>
                          <ul className='flex flex-col'>
                            {registrationData?.schedule.map((d, i) => (
                              <li key={d._key} className={`flex px-4 py-6 ${i % 2 === 0 ? '' : 'bg-grey-100'}`}>
                                <div className='w-1/4 flex justify-start items-center'>
                                  <h4 className='font-heading text-primary'>{capitalize(d.day)}:</h4>
                                </div>
                                <div className='flex-1 flex'>
                                  <p className='font-heading font-bold text-primary'>{d.time.start.slice(0,5)}-{d.time.end.slice(0,5)}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      </div>

                </div>

              )}

              <div className='w-1/3 max-w-xs'>
                <div className='flex flex-col gap-12'>

                  <div>
                    <h3 className='font-heading text-primary font-bold text-lg mb-2'>Teacher</h3>
                    <ul>
                      {registrationData.teacher ? (
                        <li className='p-4 border border-grey-400 rounded-md flex items-center bg-white'>
                          <div className='rounded-full overflow-hidden h-12 w-12 mr-4'>
                            {registrationData.teacher.image ? (
                              <img
                                width={120}
                                height={120}
                                alt={`Profile image for ${registrationData.teacher.image}`}
                                className={'h-full object-cover'}
                                src={imageBuilder(registrationData.teacher.image).width(120).height(120).url()}
                              />
                            ) : (
                              <IoPersonCircle className='fill-grey-500 w-12 h-12 cursor-pointer'/>
                            )}
                          </div>
                          <h4 className='font-heading text-base text-primary'>{registrationData.teacher.name}</h4>
                        </li>
                      ) : (
                        <li>
                          <p>No teacher assigned</p>
                        </li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h3 className='font-heading text-primary font-bold text-lg mb-2'>Students</h3>
                    <ul>
                      {registrationData.students?.length ? registrationData.students.map(s => (
                        <li className='p-4 border border-grey-400 rounded-md flex items-center bg-white'>
                          <div className='rounded-full overflow-hidden h-12 w-12 mr-4'>
                            {user.image ? (
                              <img
                                width={120}
                                height={120}
                                alt={`Profile image for ${user.name}`}
                                className={'h-full object-cover'}
                                src={imageBuilder(user.image).width(120).height(120).url()}
                              />
                            ) : (
                              <IoPersonCircle className='fill-grey-500 w-12 h-12 cursor-pointer'/>
                            )}
                          </div>
                          <h4 className='font-heading text-base text-primary'>{s.name}</h4>
                        </li>
                      )) : (
                        <li>
                          <p>No students added</p>
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

ClassPage.auth = true