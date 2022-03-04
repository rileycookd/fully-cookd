import React, { useEffect, useState } from 'react' 
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { format, parseISO } from 'date-fns'
import { useRemainingClasses } from 'lib/swr';
import UpcomingClassesListItem from 'components/upcoming-class-list-item'



export default function UpcomingClassesList(props) {

  const {
    registrations,
  } = props

  const [allUpcomingClasses, setAllUpcomingClasses] = useState([])

  const { classes, isLoading, isError } = useRemainingClasses(registrations[0].calendarId)

  useEffect(() => {
    if(!isLoading) setAllUpcomingClasses(classes.slice(0, 5))
  }, [classes])

  console.log("CLASSES: ", classes)

  
  return (
    <div className='flex-1 flex flex-col gap-4'>
      <h2 className='font-heading font-bold text-md text-grey-900'>Upcoming classes</h2>
      {/* <button className='p-2 bg-secondary w-max rounded' onClick={() => createCalendar()}>
        Click me
      </button> */}
      {allUpcomingClasses.length ? (


        <ul className='flex flex-col gap-1'>

          {allUpcomingClasses.map(cl => {


            return (
              <UpcomingClassesListItem {...cl} />
            )
          })}
        </ul>
        ) : (
          <p>No upcoming classes</p>
        )}
    </div>
  )
}