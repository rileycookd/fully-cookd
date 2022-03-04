import React, { useState } from 'react'
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from 'components/layout';
import Head from 'next/head'
import LayoutSidebar from 'components/layout-sidebar';

import RegistrationList from 'components/registration-list';
import ClassesList from 'components/classes-list';
import UpcomingClassesList from 'components/upcoming-classes-list';
import { useUser } from 'lib/swr';
 


export default function Dashboard(props) {
  const router = useRouter();
  const { data: session } = useSession()
  const { user, isError, isLoading } = useUser(session?.user?.email)

  if(session) {
    return (
      <>
        <Layout hideNav={true}>
          <Head>
            <title>Dashboard | Amelio Language Institute</title>
          </Head>
          <LayoutSidebar>

            <div className="container mx-auto px-12 py-16 flex flex-col gap-y-48 bg-grey-100 min-h-screen">
    
              <div className='flex gap-8'>
                <div className='flex-1 flex flex-col gap-y-24 justify-start h-max'>
                  {user?.registrations && (
                    <>
                      <RegistrationList registrations={user?.registrations} />
                      {/* <ClassesList registrations={user?.registrations} /> */}
                    </>
                  )}

                </div>

                <div className='w-1/3 max-w-xs'>
                  {user?.registrations && (
                    <>
                      <UpcomingClassesList registrations={user?.registrations} />
                    </>
                  )}
                </div>

              </div>
            </div>
          
          </LayoutSidebar>



          {/* {error ? (
            <div>oops... {error.message}</div>
          ) : data === undefined ? (
            <div>Loading... </div>
          ) : (
            <div>{JSON.stringify(data)}</div>
          )} */}
        </Layout>
      </>
    )
  }
  return (
    <p>You must be signed in to access this page.</p>
  )
}

Dashboard.auth = true