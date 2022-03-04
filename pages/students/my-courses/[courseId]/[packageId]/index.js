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


export default function Package({ registration }) {
  const router = useRouter()
  const { data: session } = useSession()
  const { user, isError, isLoading } = useUser(session?.user?.email)

  const [packageData, setPackageData] = useState({})

  useEffect(() => {
    const paramsArray = router.asPath.split('/').slice(-2)
  // const { packageData, isLoading, isError } = useClassById(...paramsArray)
    if(user?.registrations) {
      let selectedClass = user.registrations
        .find(r => r._id === paramsArray[0])
        .packages.find(p => p._key === paramsArray[1])
      setPackageData(selectedClass)
    }

  }, [isLoading])

  console.log(packageData)
  

  return (
    <Layout hideNav={true}>
      <Head>
        <title>Package {packageData.start && `${format(parseISO(packageData.start), 'dd MMM')}-${format(parseISO(packageData.end), 'dd MMM')} | ${packageData.course}`}</title>
      </Head>
      <LayoutSidebar>
        <div className="container mx-auto px-12 py-16 flex flex-col gap-y-48">
          <div className='flex gap-8'>

            <div className='flex-1 flex flex-col gap-y-24'>
              <div>Individual Package Page!</div>
              <p>{packageData?.start}</p>
            </div>

            <div className='w-1/3 max-w-xs'>
              Sidebar
            </div>

          </div>
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