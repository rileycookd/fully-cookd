import React, { useEffect, useState } from 'react'
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from 'components/layout';
import Head from 'next/head'
import LayoutSidebar from 'components/layout-sidebar';

import RegistrationList from 'components/registration-list';
import ClassesList from 'components/classes-list';
import UpcomingClassesList from 'components/upcoming-classes-list';
import { useUser } from 'lib/swr';
import { MdModeEdit as EditIcon } from 'react-icons/md'

import { useForm, useFormState } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { BsExclamationCircle as WarningIcon } from 'react-icons/bs'


export default function MyMessages(props) {
  const router = useRouter();
  const { data: session } = useSession()
  const { user, isError, isLoading } = useUser(session?.user?.email)
  

  if(session) {
    return (
      <>
        <Layout hideNav={true}>
          <Head>
            <title>Messages | Amelio Language Institute</title>
          </Head>
          <LayoutSidebar>

            <div className="container mx-auto pb-48 px-12 py-16 flex flex-col gap-y-48 bg-grey-100 min-h-screen">
              {isLoading ? (
                <div>Loading...</div>
              ) : isError ? (
                <div>Couldn't load user data</div>
              ) : (
                <div>Messages inbox coming soon!</div>
              )}
            </div>
          
          </LayoutSidebar>
        </Layout>
      </>
    )
  }
  return (
    <p>You must be signed in to access this page.</p>
  )
}

MyMessages.auth = true