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
    if(!isLoading) {
      classes?.length
      ? setRemainingClasses(classes?.length)
      : setRemainingClasses(0)
    }
  }, [classes])
  

  return (
    <Layout hideNav={true}>
      <Head>
        <title>{registrationData.classType ? `${registrationData.classType.title} - ${registrationData.students.length} student${registrationData.students.length > 1 ? 's' : ''}` : 'Registration details'}</title>
      </Head>
      <LayoutSidebar>
        <div className="p-page py-16 flex flex-col gap-y-48 bg-grey-100">

          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Something went wrong...</div>
          ) : (

            <div className='flex flex-col lg:flex-row gap-8'>

              {registrationData?.language?.title && (


                <div className='flex-1 flex flex-col gap-y-8'>
                  <div className='rounded-lg border border-grey-400 px-4 py-4 md:px-8 md:py-8 bg-white'>

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


                  <div className='rounded-lg border border-grey-400 px-4 py-4 md:px-8 md:py-8 bg-white'>

                    <div className='flex flex-col gap-12'>

                      <div className='flex flex-col'>
                        <div className='flex-1 flex pb-4 justify-start border-b border-grey-300'>
                          <h3 className='font-heading font-bold text-grey-600'>Course details</h3>
                        </div>
                        <table className='table-auto w-full'>
                          <tbody className='rounded-lg overflow-hidden divide-y divide-grey-300'>
                            <tr className='bg-white'>
                              <th className='px-2 md:px-4 py-6 text-left font-heading font-normal text-sm md:text-base' data-column="1">Language:</th>
                              <td className='px-2 md:px-4 py-6 text-left font-heading font-bold text-sm md:text-base w-full' data-column="2">
                                {registrationData.language?.title}
                              </td>
                            </tr>
                            <tr className='bg-white'>
                              <th className='px-2 md:px-4 py-6 text-left font-heading font-normal text-sm md:text-base' data-column="1">Classes left:</th>
                              <td className='px-2 md:px-4 py-6 text-left font-heading font-bold text-sm md:text-base w-full' data-column="2">
                                <span className={`${remainingClasses <= 3 ? 'text-error' : 'text-primary'}`}>{remainingClasses} class{remainingClasses !== 1 ? 'es' : ''} left</span>
                              </td>
                            </tr>
                            <tr className='bg-white'>
                              <th className='px-2 md:px-4 py-6 text-left font-heading font-normal text-sm md:text-base' data-column="1">Students:</th>
                              <td className='px-2 md:px-4 py-6 text-left font-heading font-bold text-sm md:text-base w-full' data-column="2">
                                {registrationData.students.length} student{registrationData.students.length > 1 ? 's' : ''}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className='sm:hidden flex justify-end'>
                          <Link href={`${router.asPath}/add-classes`}>
                            <a className="flex bg-secondary hover:bg-secondary-300 transition-colors duration-75 py-2 px-3 rounded text-xs items-center font-medium font-heading text-white">
                              Add classes<AddIcon className="ml-1 w-4 h-4 fill-white" />
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>

                    </div>

                    <div className='rounded-lg border border-grey-400 px-4 py-4 md:px-8 md:py-8 bg-white'>

                      <div className='flex flex-col gap-12'>

                        <div className='flex flex-col'>
                          <div className='flex-1 flex pb-4 justify-start border-b border-grey-300'>
                            <h3 className='font-heading font-bold text-grey-600'>Schedule</h3>
                          </div>
                          <table className='table-auto w-full'>
                            <tbody className='rounded-lg overflow-hidden divide-y divide-grey-300'>
                              {registrationData?.schedule.map((d, i) => (
                                <tr className='bg-white'>
                                  <th className='px-2 md:px-4 py-6 text-left font-heading font-normal text-sm md:text-base' data-column="1">{capitalize(d.day)}:</th>
                                  <td className='px-2 md:px-4 py-6 text-left font-heading font-bold text-sm md:text-base w-full' data-column="2">
                                    {d.time.start.slice(0,5)}-{d.time.end.slice(0,5)}
                                  </td>
                                </tr>
                              ))}
             
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>

                    <div className='rounded-lg border border-grey-400 px-4 py-4 md:px-8 md:py-8 bg-white'>

                      <div className='flex flex-col gap-12'>

                        <div className='flex flex-col'>
                          <div className='flex-1 flex pb-4 justify-start border-b border-grey-300'>
                            <h3 className='font-heading font-bold text-grey-600'>Purchase history</h3>
                          </div>
                          {registrationData.packages ? (
                            <table className='table-auto w-full'>
                              <tbody className='rounded-lg overflow-hidden divide-y divide-grey-300'>
                                {registrationData.packages.map((p, i) => (

                                  <tr className='bg-white flex items-center'>
                                    <th className='px-2 md:px-4 py-6 text-left font-heading font-normal text-sm md:text-base w-max' data-column="1">{format(parseISO(p.start || p.submittedDate), 'dd MMM')}:</th>
                                    <td className='px-2 md:px-4 py-6 text-center font-heading font-bold text-xs sm:text-sm md:text-base w-full' data-column="2">
                                      {p.quantity} class{p.quantity === 1 ? '' : 'es'}
                                    </td>
                                    <td className='px-2 md:px-4 py-6 text-center font-heading text-secondary font-bold text-xs sm:text-sm md:text-base w-full' data-column="3">
                                      {p.price ? `$${p.price}` : ''}

                                    </td>
                                    <td className='px-2 md:px-4 py-6 text-center font-heading font-bold text-xs sm:text-sm md:text-base w-full' data-column="4">
                                      <span className={`font-heading font-medium text-sm py-1 px-2 ${!p.active ? 'text-warning-400 bg-warning-100' : 'text-secondary bg-secondary-100'} rounded-md`}>{p.active ? 'Paid' : 'Pending'}</span>
                                    </td>
                                  </tr>
                                ))}
              
                              </tbody>
                            </table>

                          ) : (
                            <div className='py-4'>No class history</div>
                          )}   
                        </div>
                      </div>

                    </div>

                </div>

              )}

              <div className='w-full lg:w-1/3 lg:max-w-xs'>
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