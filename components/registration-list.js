import React, { useEffect, useState } from 'react'
import { IoAdd as AddIcon } from 'react-icons/io5'
import Link from 'next/link'
import RegistrationListItem from '/components/registration-list-item'


export default function RegistrationList(props) {
  const {
    registrations
  } = props

  const [allUpcomingClasses, setAllUpcomingClasses] = useState(null)

  return (
    <div className='flex-1 flex flex-col gap-4'>
      <h2 className='font-heading font-bold text-md text-grey-900'>Current courses</h2>
      {registrations.length ? (

        <div className="rounded-lg border border-grey-400 p-4 bg-white">


            <ul className='flex flex-col gap-2'>

              {registrations?.map(r => (
                  <RegistrationListItem {...r} />
                )
              )}

            </ul>



          <div className="flex justify-end pt-4">
            <Link href='/enroll/step1'>
              <a className="flex bg-secondary hover:bg-secondary-300 transition-colors duration-75 py-2 px-3 rounded text-xs items-center font-medium font-heading text-white">
                Enroll <AddIcon className="ml-1 w-4 h-4 fill-white" /> 
              </a>
            </Link>
          </div>
        </div> 

        
      ) : (
        <div className='flex flex-col gap-3 items-start '>
          <p>You aren't registered for any classes.</p>
          <Link href='/enroll/step1'>
            <a className="flex bg-secondary hover:bg-secondary-300 transition-colors duration-75 py-2 px-3 rounded text-xs items-center font-medium font-heading text-white">
              Enroll <AddIcon className="ml-1 w-4 h-4 fill-white" /> 
            </a>
          </Link>
        </div>
      )}

    </div>
  )
}