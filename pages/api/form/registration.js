import sanityClient from '@sanity/client'
import { v4 as uuidv4 } from 'uuid';
import { calculateRegistrationPrice } from 'lib/helpers';

const config = {
  dataset: process.env.SANITY_STUDIO_API_DATASET,
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
}
const client = sanityClient(config)

export default async function createRegistration(req, res) {
  const { classType, language, quantity, size, students, days, calendarId } = JSON.parse(req.body)

  // let packagePrice = calculateRegistrationPrice(classType, duration, size, chosenPackage).price
  let registrationForm
  let serverResponse  = `Message sent`
  try {
    registrationForm = await client.create({
      _type: 'registration',
      submittedDate: new Date().toISOString(),
      state: 'pending',
      calendarId: calendarId,
      language: {
        _type: "reference",
        _ref: language
      },
      students: [
        {
          _key: uuidv4(),
          _type: "reference",
          _ref: students?.[0].id
        }
      ],
      classType: {
        _type: 'reference',
        _ref: classType,
      },
      packages: [
        {
          _type: "registrationPackage",
          _key: uuidv4(),
          quantity: parseInt(quantity, 10),
          active: false,
          price: 675,
        },
      ],
      schedule: days.map(d => (
        {
          _type: 'classDayTime',
          _key: uuidv4(),
          day: d.day.toLowerCase(),
          time: {
            _type: 'timeRange',
            start: d.start,
            end: d.end
          }
        }
      ))
    })
  } catch (err) {
    console.error(err)
    serverResponse = `Couldn't complete registration`
    return res.status(500).json({message: serverResponse, err})
  }

  return res.status(200).json({ message: serverResponse, data: registrationForm })
}