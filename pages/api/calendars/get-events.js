let { google } = require('googleapis');
const privatekey = JSON.parse(
  Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_JSON, "base64").toString()
);

export default async function getCalendarEvents(req, res) {
  const { calendarId } = JSON.parse(req.body)

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
  let calendarData = await calendar.events.list({
    auth: jwtClient,
    calendarId: calendarId,
    // eventId: 'mo0rct6srt3qoptpq7t9abl3to',
    timeMin: (new Date()).toISOString(),
    // orderBy: 'start',
  }, function (err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return res.status(500).json({ message: `Something went wrong`, err })
    }
    if(response?.data?.items) {
      events = response.data.items
      console.log(events)
      return res.status(200).json({ message: 'Success!', events }) 
    }
  });

  // console.log(calendarData)


  // return res.status(200).json({ message: 'Success!', events: events })
}



