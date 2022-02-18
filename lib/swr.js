

import useSWR from 'swr'
import { CMS_API_URL } from './constants'

// Fetcher function
export const fetcher = (...args) => fetch(...args).then(res => res.json())

// Hooks
export function useUser (email) {
  const encodedQuery = encodeURIComponent(`
    *[_type == 'student' && email == $email][0] {
      ...,
    }
  `)
  const { data, error } = useSWR(
    `${CMS_API_URL}?query=${encodedQuery}&$email="${email}"`, 
    fetcher
  )

  return {
    user: data?.result || undefined,
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