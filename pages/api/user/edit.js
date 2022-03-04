import { Magic } from '@magic-sdk/admin';
import sanityClient from '@sanity/client'

const config = {
  dataset: process.env.SANITY_STUDIO_API_DATASET,
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
}
const client = sanityClient(config)
const magic = new Magic(process.env.MAGIC_SECRET_KEY);

export default async function createUser(req, res) {

  if(req.method !== "PUT") {
    res.send(405).end()
  }

  const { name, email, phone, city, country, timezone, id} = JSON.parse(req.body)

  let mergeFields = {
    ...(name && { name: name }),
    ...(email && { email: email }),
    ...(phone && { phone: phone }),
    ...(city && { city: city }),
    ...(country && { country: country }),
    ...(timezone && { timezone: timezone }),
  }

  let updatedUser
  let serverResponse  = `User updated`
  try {
    updatedUser = await client.patch(id)
      .set(mergeFields)
      .commit()
      .then(updatedDoc => console.log(`Hurray, the doc is updated! New document:`, updatedDoc))
      .catch(err => console.error('Oh no, the update failed: ', err.message))
  } catch (err) {
    console.error(err)
    serverResponse = `Couldn't update user`
    return res.status(500).json({message: serverResponse, err})
  }

  return res.status(200).json({ message: serverResponse, data: updatedUser })
}
