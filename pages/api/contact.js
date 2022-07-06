import sanityClient from '@sanity/client'
import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);


export default async function sendMessage(req, res) {
  const { name, email, message } = JSON.parse(req.body)

  let serverResponse  = `Message sent`
  try {
    await sendgrid.send({
      to: "hello@fullycookd.com", // Your email where you'll receive emails
      from: "noreply@fullycookd.com", // your website email address here
      subject: `Website Contact Form`,
      html: `
      <div>
        <h1>New Contact Form</h1>
        <h3>From: ${name}</h3>
        <h3>Email: ${email}</h3>
        <p>${message}</p>
      </div>`,
    });
  } catch (error) {
    console.log(error)
    serverResponse = `Couldn't send message`
    return res.status(error.statusCode || 500).json({message: serverResponse, error})
  }

  return res.status(200).json({ message: serverResponse })
}
