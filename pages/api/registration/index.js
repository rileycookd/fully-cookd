import sanityClient from '@sanity/client'
import { v4 as uuidv4 } from 'uuid';
import { calculateRegistrationPrice } from 'lib/helpers';
import sendgrid from "@sendgrid/mail";


const config = {
  dataset: process.env.SANITY_STUDIO_API_DATASET,
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
}
const client = sanityClient(config)
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);


export default async function Registration(req, res) {

  // ============
  //     POST
  // ============

  if (req.method === "POST") {

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
      
      await sendgrid.send({
        to: [...students.map(s => s.email)], // Your email where you'll receive emails
        from: "noreply@ameliolanguageinstitute.com", // your website email address here
        subject: `Registration received`,
        html: `
        <div>
          <h1>Registration Received</h1>
          <p>Thank you!</p>
        </div>`,
      });
    } catch (err) {
      console.error(err)
      serverResponse = `Couldn't complete registration`
      return res.status(500).json({message: serverResponse, err})
    }

    return res.status(200).json({ message: serverResponse, data: registrationForm })
  }

  // ============
  //     PUT
  // ============


  if (req.method === "PUT") {

    const { quantity, registrationId } = JSON.parse(req.body)

    let newPackage = {
      _type: "registrationPackage",
      _key: uuidv4(),
      quantity: parseInt(quantity, 10),
      active: false,
      price: 420,
    }

    let updatedRegistration
    let serverResponse  = `Message sent`
    try {
      updatedRegistration = await client.patch(registrationId)
        .setIfMissing({ packages: [] })
        .insert('after', 'packages[-1]', [newPackage])
        .commit()
        .then(updatedDoc => console.log(`Hurray, the doc is updated! New document:`, updatedDoc))
        .catch(err => console.error('Oh no, the update failed: ', err.message))
    } catch (err) {
      console.error(err)
      serverResponse = `Couldn't complete registration`
      return res.status(500).json({message: serverResponse, err})
    }

    return res.status(200).json({ message: serverResponse, data: updatedRegistration })
  }


  return res.status(405).end
}