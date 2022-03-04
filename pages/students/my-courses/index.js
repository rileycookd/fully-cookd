import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '../../../components/layout'

import { IoTimeOutline as DurationIcon } from 'react-icons/io5'
import { AiOutlineDollar as MoneyIcon } from 'react-icons/ai'
import { BsPeople as StudentsIcon } from 'react-icons/bs'
import { getAllRegistrationsWithSlug, getRegistrationById } from '../../../lib/api'

export default function RegistrationsPage({ registration }) {
  const router = useRouter()

  return (
    <Layout>
      <div>All registrations!</div>
    </Layout>
  )
}
