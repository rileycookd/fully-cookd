import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Flag from 'react-world-flags'
import { capitalize } from 'lib/helpers';
import { useRemainingClasses } from 'lib/swr';
import { IoChevronForward } from 'react-icons/io5'

export default function RegistrationListItem(props) {
  const {
    _id,
    language,
    classType,
    state,
    calendarId,
  } = props

  const [remainingClasses, setRemainingClasses] = useState(null)

  const { classes, isLoading, isError } = useRemainingClasses(calendarId)

  useEffect(() => {
    if(!isLoading) {
        classes?.length
        ? setRemainingClasses(classes.length)
        : setRemainingClasses(0)
      }
  }, [classes])

  return (
    <li>
      <Link href={`/students/my-courses/${_id}`}>
        <a className='flex items-center justify-between border border-grey-400 bg-grey-100 hover:bg-secondary-100 hover:border-secondary cursor-pointer transition-colors duration-75 rounded-md px-4 sm:px-6 py-6'>
          <div className='flex items-center gap-4 sm:gap-6'>
            <div className='flex rounded-sm overflow-hidden min-w-6 min-h-10 h-6 w-10 sm:h-9 sm:w-14'>
              <Flag code={language?.code} width="120" style={{objectFit: 'cover'}} />
            </div>
            <div className='flex-1'>
              <h3 className='font-heading font-bold text-sm'>{classType.title}</h3>
              <p className={`xl:hidden font-body text-xs ${remainingClasses <= 3 ? 'text-error' : 'text-grey-800'}`}>{remainingClasses !==  null ? remainingClasses === 0 ? '0 classes' : `${remainingClasses} class${remainingClasses !== 1 ? 'es' : ''} left` : ''}</p>
            </div>
          </div>
          <div className='flex items-center gap-4 sm:gap-6'>
            <p className={`hidden xl:flex font-body text-xs ${remainingClasses <= 3 ? 'text-error' : 'text-grey-800'}`}>{remainingClasses !==  null ? remainingClasses === 0 ? '0 classes' : `${remainingClasses} class${remainingClasses !== 1 ? 'es' : ''} left` : ''}</p>
            <p className={`hidden xs:flex font-heading font-medium text-xs sm:text-sm py-1 px-2 ${state === 'pending' ? 'text-warning-400 bg-warning-100' : 'text-secondary bg-secondary-100'} rounded-md`}>
              {capitalize(state)}
            </p>
            <IoChevronForward className='h-4 w-4' />
          </div>
          
        </a>
      </Link>
    </li>
  )
}

              /* <li className='flex items-center justify-between border border-grey-400 bg-grey-100 hover:bg-secondary-100 hover:border-secondary cursor-pointer transition-colors duration-75 rounded-md px-6 py-6'>
                <div className='flex items-center gap-6'>
                  <div className='flex rounded-sm overflow-hidden h-9 w-14'>
                    <Flag code='us' width="120" style={{objectFit: 'cover'}} />
                  </div>
                  <h3 className='font-heading font-bold text-sm'>Conversation Class</h3>
                </div>
                <div className='flex items-center gap-6'>
                  <p className='font-body text-grey-800 text-xs'>8 classes left</p>
                  <div className='py-1 px-2 bg-secondary-100 rounded-md'>
                    <p className='font-heading text-secondary font-medium text-sm'>
                      Active
                    </p>
                  </div>
                  <IoChevronForward className='h-4 w-4' />
                </div>
              </li> */
