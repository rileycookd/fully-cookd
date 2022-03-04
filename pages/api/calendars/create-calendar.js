let { google } = require('googleapis');
let privatekey = require("google-calendar.json");

export default async function createCalendar(req, res) {
  const { students } = JSON.parse(req.body)
 
 if (req.method !== "POST") {
    return res.status(405).end();
  }

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