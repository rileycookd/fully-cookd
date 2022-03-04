import sanityClient from '@sanity/client'
import sendgrid from "@sendgrid/mail";

const config = {
  dataset: process.env.SANITY_STUDIO_API_DATASET,
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
}
const client = sanityClient(config)
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);


export default async function sendMessage(req, res) {
  const { name, email, subject, message } = JSON.parse(req.body)

  // create new message document in database
  let contactForm
  let serverResponse  = `Message sent`
  try {
    // console.log("REQ.BODY", req.body);
    await sendgrid.send({
      to: "admin@ameliolanguageinstitute.com", // Your email where you'll receive emails
      from: "noreply@ameliolanguageinstitute.com", // your website email address here
      subject: `${subject}`,
      html: `
      <div>
        <h1>New Contact Form</h1>
        <h3>From: ${name}</h3>
        <h3>Email: ${email}</h3>
        <p>${message}</p>
      </div>`,
    });
    contactForm = await client.create({
      _type: 'contactForm',
      submittedDate: new Date().toISOString(),
      name: name,
      email: email,
      message: message,
    })
  } catch (error) {
    console.log(error)
    serverResponse = `Couldn't send message`
    return res.status(error.statusCode || 500).json({message: serverResponse, error})
  }

  return res.status(200).json({ message: serverResponse, data: contactForm })
}
