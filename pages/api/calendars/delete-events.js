// let { google } = require('googleapis');
// const privatekey = JSON.parse(
//   Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_JSON, "base64").toString()
// );

// export default async function getCalendarEvents(req, res) {
//   const { calendarId, eventId } = JSON.parse(req.body)

//   // configure a JWT auth client
//   let jwtClient = new google.auth.JWT(
//     privatekey.client_email,
//     null,
//     privatekey.private_key,
//     ['https://www.googleapis.com/auth/spreadsheets',
//     'https://www.googleapis.com/auth/drive',
//     'https://www.googleapis.com/auth/calendar']);

//   //authenticate request
//   jwtClient.authorize(function (err, tokens) {
//     if (err) {
//       console.log(err);
//       return res.status(500).json({ message: `Something went wrong`, err })
//     } else {
//       console.log("Successfully connected!");
//     }
//   });

//   //Google Calendar API
//   let calendar = google.calendar('v3');
//   let calendarData = await calendar.events.delete({
//     auth: jwtClient,
//     calendarId: calendarId,
//     eventId: eventId,
//   }, function (err, response) {
//     if (err) {
//       console.log('The API returned an error: ' + err);
//       return res.status(500).json({ message: `Something went wrong`, err })
//     }
//     if(response) {
//       console.log(response)
//       return res.status(200).json({ message: 'Success!', response }) 
//     }
//   });

//   // console.log(calendarData)


//   // return res.status(200).json({ message: 'Success!', events: events })
// }


