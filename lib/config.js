const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  token: process.env.SANITY_NEXTAUTH_TOKEN,
  apiVersion: '2021-12-03',
  useCdn: process.env.NODE_ENV === 'production',
}

export default config