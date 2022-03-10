let { google } = require('googleapis');
import service from "services/service-account.enc";
import crypto from 'crypto';
// const privatekey = JSON.parse(
//   Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_JSON, "base64").toString()
// );

export default async function createCalendar(req, res) {
  const { students } = JSON.parse(req.body)
 
  if (req.method !== "POST") {
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

  let newCalendar

  try {
    // Create Service Account Auth token
    const jwtClient = await new google.auth.JWT(
      privatekey.client_email,
      null,
      privatekey.private_key,
      ['https://www.googleapis.com/auth/calendar'],
      'admin@ameliolanguageinstitute.com'
    );

    //authenticate request
    const auth = await jwtClient.authorize();

    //Google Calendar API
    let calendar = google.calendar('v3');
    let calendarResponse = await calendar.calendars.insert({
      auth: jwtClient,
      resource: {
        "conferenceProperties": {},
        "description": `Clases con ${students.map(s => s.name).join(', ')}`,
        // "etag": "my_etag",
        // "id": "test@ameliolanguageinstitute.com",
        "kind": "calendar#calendar",
        "location": "Santiago, Chile",
        "summary": `${students.length > 1 ? 'Group': 'Solo'}: ${students.map(s => s.name).join(', ')}`,
        "timeZone": "America/Santiago"
      }
    });

    if (calendarResponse?.data) {
      newCalendar = calendarResponse.data
      console.log("Calendar: ", newCalendar)
      let insertCalendarResponse = await calendar.calendarList.insert({
        auth: jwtClient,
        resource: {
          "id": newCalendar.id
        }
      })
      if(insertCalendarResponse.data) {
        console.log("Successfully inserted calendar to list: ", insertCalendarResponse)
      } else {
        console.log("SOMETHING WENT WRONG WITH ADDING TO LIST")
      }
    } else {
      console.log('Couldn\'t create calendar');
    }

  } catch (error) {
      return res.status(500).json({ message: `Something went wrong`, error: error })
  }


  return res.status(200).json({ message: 'Success!', calendar: newCalendar })
}