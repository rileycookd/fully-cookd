import sanityClient from '@sanity/client'
const config = {
  dataset: process.env.SANITY_STUDIO_API_DATASET,
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
}
const client = sanityClient(config)

export default async function getUser(req, res) {
  const { email } = JSON.parse(req.body)
  console.log(email)
  let user
  try {
     const query = '*[_type == "student" && email == $email][0] {email}'
     const params = {email: email}
     user = await client.fetch(query, params) || {}
     if(!user.email) user = undefined
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: `Something went wrong`, err })
  }
  return res.status(200).json({ user: user })
}
