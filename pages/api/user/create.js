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
  const { email, didToken } = JSON.parse(req.body)

  // validate magic DID token
  magic.token.validate(didToken);

  // fetch user metadata
  const { publicAddress } = await magic.users.getMetadataByToken(didToken);

  // check if user already exists in database
  let user
  const query = '*[_type == "student" && publicAddress == $publicAddress][0] { _id }'
  const params = {publicAddress: publicAddress}
  user = await client.fetch(query, params)

  // create new user in database if doesn't already exist
  let message = `User already exists`
  if(!user) {
    try {
      user = await client.create({
        _type: 'student',
        name: 'Riley Cook',
        email: email,
        publicAddress: publicAddress,
      })
      message = `User created`
    } catch (err) {
      console.error(err)
      message = `Couldn't create user`
      return res.status(500).json({message: message, err})
    }
  }

  return res.status(200).json({ message: message, user: user })
}
