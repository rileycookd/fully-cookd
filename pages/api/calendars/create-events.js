import { google } from 'googleapis'
const privatekey = JSON.parse(
  Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_JSON, "base64").toString()
);
import sanityClient from '@sanity/client'

const config = {
  dataset: process.env.SANITY_STUDIO_API_DATASET,
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
}
const client = sanityClient(config)
  
const convertDayStrings = (days) => {
  let convertedDays = days.map(day => {
    let convertedDay
    if(day.day === "Sunday") convertedDay = "SU"
    if(day.day === "Monday") convertedDay = "MO"
    if(day.day === "Tuesday") convertedDay = "TU"
    if(day.day === "Wednesday") convertedDay = "WE"
    if(day.day === "Thursday") convertedDay = "TH"
    if(day.day === "Friday") convertedDay = "FR"
    if(day.day === "Saturday") convertedDay = "SA"
    return convertedDay
  })
  return convertedDays.join(',')
}

export default async function createCalendarEvents(req, res) {
  // Parse request.body 
  const { calendarId, registrationId, quantity, days } = JSON.parse(req.body)
  let convertedDays = convertDayStrings(days)
  console.log(convertedDays)
  let recurrenceString = `RRULE:FREQ=WEEKLY;WKST=SU;COUNT=${quantity};BYDAY=${convertedDays}`

  var event = {
    'summary': 'Class with Riley Cook',
    'location': '588 Manuel Antonio Tocornal Santiago, Chile',
    'description': 'In-person class',
    'start': {
      'dateTime': '2022-03-03T09:00:00-07:00',
      'timeZone': 'America/Santiago'
    },
    'end': {
      'dateTime': '2022-03-03T10:00:00-07:00',
      'timeZone': 'America/Santiago'
    },
    'recurrence': [
      recurrenceString
    ],
    // 'transparency': 'transparent',
    // 'status': 'tentative',
    // 'colorId': '8',
    // 'attendees': [
    //   {'email': 'rileycook@gmail.com'},
    // ],
    // 'reminders': {
    //   'useDefault': false,
    //   'overrides': [
    //     {'method': 'email', 'minutes': 24 * 60},
    //     {'method': 'popup', 'minutes': 10}
    //   ]
    // }
  };

  // configure a JWT auth client
  let jwtClient = new google.auth.JWT(
    privatekey.client_email,
    null,
    privatekey.private_key,
    ['https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/calendar']);

  //authenticate request
  jwtClient.authorize(function (err, tokens) {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: `Something went wrong`, err })
    } else {
      console.log("Successfully connected!");
    }
  });

  //Google Calendar API
  let calendar = google.calendar('v3');
  let events = [] 
  let calendarData = await calendar.events.insert({
    auth: jwtClient,
    calendarId: calendarId,
    resource: event
  }, function (err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      const updatedRegistration = client.patch(registrationId)
        .setIfMissing({ packages: [] })
        .insert('after', 'packages[-1]', [ ])
        .commit()
        .then(updatedDoc => console.log(`Hurray, the doc is updated! New document:`, updatedDoc))
        .catch(err => console.error('Oh no, the update failed: ', err.message))
      return res.status(500).json({ message: `Something went wrong`, err })
    }
    if(response) {
      console.log(response)
      return res.status(200).json({ message: 'Success!', response: response }) 
    }
  });

  // console.log(calendarData)


  // return res.status(200).json({ message: 'Success!', events: events })
}

