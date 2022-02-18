import sanityClient from '@sanity/client'

const config = {
  dataset: process.env.SANITY_STUDIO_API_DATASET,
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
}
const client = sanityClient(config)

export default async function sendMessage(req, res) {
  const { name, email, message } = JSON.parse(req.body)

  // create new user in database if doesn't already exist
  let contactForm
  let serverResponse  = `Message sent`
  try {
    contactForm = await client.create({
      _type: 'contactForm',
      submittedDate: new Date().toISOString(),
      name: name,
      email: email,
      message: message,
    })
  } catch (err) {
    console.error(err)
    serverResponse = `Couldn't send message`
    return res.status(500).json({message: serverResponse, err})
  }

  return res.status(200).json({ message: serverResponse, data: contactForm })
}
