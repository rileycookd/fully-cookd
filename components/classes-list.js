import React, { useState, useEffect } from 'react' 
import {
  DropdownMenu,
} from './form'
import { GiNotebook as HomeworkIcon } from 'react-icons/gi'
import { IoChevronForward } from 'react-icons/io5'
import { format, parse, parseISO } from 'date-fns'
import Link from 'next/link'


export default function ClassesList(props) {
  const {
    registrations,
  } = props

  const [allPastClasses, setAllPastClasses] = useState([])
  const [courseOptions, setCourseOptions] = useState()
  const [currentCourse, setCurrentCourse] = useState('all')

  useEffect(() => {
    const pastClasses = registrations.map(r => (
      r.activePackages?.map(p => p.pastClasses)
    ).concat(r.expiredPackages.map(p => p.classes))
    ).flat(3)
    setAllPastClasses(pastClasses)
  }, [registrations])

  console.log("ALL PAST COURSES: ", allPastClasses)


  return (
    <div className='flex-1 flex flex-col gap-4'>
      <h2 className='font-heading font-bold text-md text-grey-900'>Past classes</h2>
      <div className='rounded-lg border border-grey-400 p-4 flex flex-col gap-4 bg-white'>
        <div>
          <DropdownMenu 
            value={currentCourse}
            label='Course'
            selectedLabel='Course:'
            options={[
              { value: 'all', label: 'All Courses' },
              { value: 'course1', label: 'General Spanish' },
              { value: 'course2', label: 'Conversational English' },
            ]}
            onChange={setCurrentCourse}
          />
        </div>
        <ul className='flex flex-col gap-2'>
          {allPastClasses.map(cl => (
            <li key={cl._key}>
              <Link href={`/students/my-courses/${cl.rid}/${cl.pid}/${cl._key}`}>
                <a className='flex items-center justify-between border border-grey-400 bg-grey-100 hover:bg-secondary-100 hover:border-secondary cursor-pointer transition-colors duration-75 rounded-md px-6 py-6'>
                  <div className='flex items-center gap-6'>
                    <h4 className='px-4 flex flex-col font-bold font-heading text-sm leading-snug justify-center items-center'>
                      <span>{new Date(cl.start).getDate()}</span><span>{format(parseISO(cl.start), 'MMM')}</span>
                    </h4>
                    <div>
                      <h3 className='font-heading font-bold text-sm leading-snug text-primary'>{cl.title || format(parseISO(cl.start),'EEEE')}</h3>
                      <p className='font-body text-sm text-primary'>{cl.course}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    {cl.homework?.length && (
                      <div className="flex items-center justify-center bg-warning-100 p-2 rounded-full">
                        <HomeworkIcon className="w-6 h-6 fill-warning-400" />
                      </div>
                    )}
                    <div className='flex items-center gap-6'>
                      <IoChevronForward className='h-4 w-4' />
                    </div>
                  </div>
                </a>
              </Link>
            </li>

          ))}

        </ul>
      </div>
    </div>
  )
}