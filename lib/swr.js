import useSWR from 'swr'
import { CMS_API_URL } from './constants'

// Fetcher function
export const fetcher = (...args) => fetch(...args).then(res => res.json())

// Hooks
export function useUser (email) {
  const encodedQuery = encodeURIComponent(`
    *[_type == 'student' && email == $email][0] {
      ...,
      "registrations": *[_type == 'registration' && references(^._id) && !(_id in path('drafts.**'))] {
        _createdAt,
        _submtittedDate,
        _id,
        _type,
        state,
        schedule,
        classType->,
        language->,
        students[]->,
        packages[] {
          ...,
        },
        teacher->,
        calendarId,
      }
    }
  `)

  // "upcomingClasses": classes[dateTime(now()) <= dateTime(start)],

  const { data, error } = useSWR(
    email ? `${CMS_API_URL}?query=${encodedQuery}&$email="${email}"` : null, 
    fetcher
  )

  return {
    user: data?.result || undefined,
    isLoading: !error && !data,
    isError: error
  }
}

export function useRemainingClasses (calendarId) {

  const { data, error } = useSWR(
    calendarId ? `/api/calendars/${calendarId}/events` : null,
    fetcher
  )

  return {
    classes: data?.events || undefined,
    isLoading: !error && !data,
    isError: error
  }
}

export function useLanguages () {
  const encodedQuery = encodeURIComponent(`
    *[_type == "language"] {
      _id,
      title,
      code,
      excerpt,
      "classTypes": *[_type=='classType' && references(^._id)]{ 
        ...,
        packages[]->
      }
    }
  `)
  const { data, error } = useSWR(
    `${CMS_API_URL}?query=${encodedQuery}`, 
    fetcher
  )

  return {
    languages: data?.result || [],
    isLoading: !error && !data,
    isError: error
  }
}

export function useAllClassesByEmail (email) {
  const encodedQuery = encodeURIComponent(`
    *[_type == "teacher" && references($id)] { 
      ...,
    }
  `)
}

// export function useAllRegistrationsByEmail (email) {
//   const encodedQuery = encodeURIComponent(`
//     *[_type == "registration" && references($registrationId)][0] {
//       ...packages[_key == $packageId][0].classes[_key == $classId][0] 
//     }
//   `)
// }

export function useClassById (registrationId, packageId, classId) {
  const encodedQuery = encodeURIComponent(`
    *[_type == "registration" && references($registrationId)][0] {
      ...packages[_key == $packageId][0].classes[_key == $classId][0] 
    }
  `)

  const { data, error } = useSWR(
    `${CMS_API_URL}?query=${encodedQuery}&$registrationId="${registrationId}"&$packageId="${packageId}"&$classId="${classId}"`, 
    fetcher
  )

  return {
    classData: data?.result || undefined,
    isLoading: !error && !data,
    isError: error
  }
}

export function useRegistrationById (registrationId) {
  const encodedQuery = encodeURIComponent(`
    *[_type == "registration" && _id == $id][0] {
      ...,
      language->,
      classType-> {
        ...,
        packages[]->
      }
    }
  `)
  
  const { data, error } = useSWR(
    registrationId ? `${CMS_API_URL}?query=${encodedQuery}&$id="${registrationId}"` : null, 
    fetcher
  )

  return {
    data: data?.result || undefined,
    isLoading: !error && !data,
    isError: error
  }
}



export function useAllTeachersByLanguage (languageId)  {
  const encodedQuery = encodeURIComponent(`
    *[_type == "teacher" && references($id)] { 
      ...,
    }
  `)

  const { data, error } = useSWR(
    `${CMS_API_URL}?query=${encodedQuery}&$id="${languageId}"`, 
    fetcher
  )

  return {
    teachers: data?.result || [],
    isLoading: !error && !data,
    isError: error
  }
}




// GRAVEYARD


// export function useUser (email) {
//   const encodedQuery = encodeURIComponent(`
//     *[_type == 'student' && email == $email][0] {
//       ...,
//       "registrations": *[_type == 'registration' && references(^._id) && !(_id in path('drafts.**'))] {
//         _createdAt,
//         _submtittedDate,
//         _id,
//         _type,
//         state,
//         schedule,
//         "activePackages": packages[dateTime(now()) < dateTime(end + "T00:00:00Z")] | order(start asc) {
//           _key,
//           active,
//           price,
//           quantity,
//           start,
//           end,
//           "rid": ^._id,
//           "activeClasses": classes[dateTime(start) > dateTime(now())] | order(start asc) {
//             ...,
//             "pid": ^._key,
//             "rid": ^.^._id,
//             "course": ^.^.classType->title,
//           },
//           "pastClasses": classes[dateTime(start) < dateTime(now())] | order(start asc) {
//             ...,
//             "pid": ^._key,
//             "rid": ^.^._id,
//             "course": ^.^.classType->title,
//           },
//         },
//         "expiredPackages": packages[dateTime(now()) > dateTime(end + "T00:00:00Z")] {
//           classes[] | order(start desc) {
//             ...,
//             "pid": ^._key,
//             "rid": ^.^._id,
//             "course": ^.^.classType->title,
//           },
//         },
//         classType->,
//         language->,
//         students[]->,
//         packages[] {
//           ...,
//           "rid": ^._id,
//           "course": ^.classType->title,
//           classes[] {
//             ...,
//             files[] {
//               ...,
//               asset->
//             },
//             images[] {
//               ...,
//               asset->,
//             },
//             "pid": ^._key,
//             "rid": ^.^._id,
//             "course": ^.^.classType->title,
//           },

//         },
//         teacher->,
//       }
//     }
//   `)

//   // "upcomingClasses": classes[dateTime(now()) <= dateTime(start)],

//   const { data, error } = useSWR(
//     `${CMS_API_URL}?query=${encodedQuery}&$email="${email}"`, 
//     fetcher
//   )

//   return {
//     user: data?.result || undefined,
//     isLoading: !error && !data,
//     isError: error
//   }
// }