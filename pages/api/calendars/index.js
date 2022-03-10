let { google } = require('googleapis');
import service from "services/service-account.enc";
import crypto from 'crypto';
// const privatekey = JSON.parse(
//   Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_JSON, "base64").toString()
// );

export default async function calendarsList(req, res) {

  if (req.method !== "GET") {
    return res.status(405).end();
  }

  
  const algorithm = 'aes-128-cbc';
  const decipher = crypto.createDecipheriv(
    algorithm,
    process.env.SERVICE_ENCRYPTION_KEY,
    process.env.SERVICE_ENCRYPTION_IV
  );
  let decrypted = decipher.update(service.encrypted, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  const privatekey = JSON.parse(decrypted)

  let calendars = []

  try {
    // Create Service Account Auth token
    const jwtClient = await new google.auth.JWT(
      privatekey.client_email,
      null,
      privatekey.private_key,
      ['https://www.googleapis.com/auth/calendar']);

    //authenticate request
    const auth = await jwtClient.authorize();

    //Google Calendar API
    let calendar = google.calendar('v3');
    let calendarResponse = await calendar.calendarList.list({
      auth: jwtClient,
    });

    if (calendarResponse?.data?.items) {
      calendars = calendarResponse.data.items
      console.log("Calendars: ", calendarResponse.data)
    } else {
      console.log('No calendars found.');
    }

  } catch (error) {
      return res.status(500).json({ message: `Something went wrong`, error: error })
  }


  return res.status(200).json({ message: 'Success!', calendars: calendars })
}

// let { google } = require('googleapis');
// let privatekey = require("google-calendar.json");

// export default async function calendarsList(req, res) {

//   if (req.method !== "GET") {
//     return res.status(405).end();
//   }

//   let calendar

//   try {
//     // Create Service Account Auth token
//     const jwtClient = await new google.auth.JWT(
//       privatekey.client_email,
//       null,
//       privatekey.private_key,
//       ['https://www.googleapis.com/auth/calendar']);

//     //authenticate request
//     const auth = await jwtClient.authorize();

//     //Google Calendar API
//     let calendar = google.calendar('v3');
//     let calendarResponse = await calendar.calendarList.insert({
//       auth: jwtClient,
//       resource: {
//         "id": 'admin@ameliolanguageinstitute.com'
//       }
//     });

//     if (calendarResponse?.data) {
//       calendar = calendarResponse.data
//       console.log("Calendars: ", calendarResponse.data)
//     } else {
//       console.log('No calendars found.');
//     }

//   } catch (error) {
//       return res.status(500).json({ message: `Something went wrong`, error: error })
//   }


//   return res.status(200).json({ message: 'Success!', calendar: calendar })
// }


