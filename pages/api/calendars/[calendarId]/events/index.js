let { google } = require('googleapis');
const privatekey = JSON.parse(
  Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_JSON, "base64").toString()
);

export default async function calendarEvents(req, res) {

  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const { calendarId } = req.query
  let events = []

  try {
    // Create Servicee Account Auth token
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
    let calendarResponse = await calendar.events.list({
      auth: jwtClient,
      calendarId: calendarId,
      singleEvents: true,
      // eventId: 'mo0rct6srt3qoptpq7t9abl3to',
      timeMin: (new Date()).toISOString(),
      orderBy: "startTime",
    });

    if (calendarResponse?.data?.items?.length) {
      events = calendarResponse.data.items
      console.log("Events: ", events)
    } else {
      console.log('No upcoming events found.');
    }

  } catch (error) {
      return res.status(500).json({ message: `Something went wrong`, error: error })
  }


  return res.status(200).json({ message: 'Success!', events: events })
}

