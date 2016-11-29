/*
If you are using googleapis the convention would be
npm install googleapis -–save

[code language=”javascript”]
google.calendar({version: ‘v3’, auth: auth});
calendar.events.watch({
auth: auth,
calendarId: ‘primary’,
resource: resource
}, next);

If you are using googleapis-plus the convention would be
npm install googleapis-plus –-save

[code language=”javascript”]
googleplus.discover(‘calendar’, ‘v3’).execute(function (err, client) {
if (err) {
console.log(‘Err’, err);
next(err);
return;
}
client.calendar.events.list(object).withAuthClient(auth).execute(callback);
});

*/

var event = {
    'summary': 'Google I/O 2015',
    'location': '800 Howard St., San Francisco, CA 94103',
    'description': 'A chance to hear more about Google\'s developer products.',
    'start': {
        'dateTime': '2015-05-28T09:00:00-07:00', //ISOString
        'timeZone': 'America/Los_Angeles'
    },
    'end': {
        'dateTime': '2015-05-28T17:00:00-07:00',
        'timeZone': 'America/Los_Angeles'
    },
    'recurrence': [
        'RRULE:FREQ=DAILY;COUNT=2' //Refer recurrence rule to know more
    ],
    'attendees': [
        { 'email': 'lpage@example.com' },
        { 'email': 'sbrin@example.com' }
    ],
    'reminders': {
        'useDefault': false,
        'overrides': [
            { 'method': 'email', 'minutes': 24 * 60 },
            { 'method': 'popup', 'minutes': 10 }
        ]
    };
}

//import the google apis module using require
var google = require('googleapis-plus');

//get the OAuthClient
var OAuth2Client = google.OAuth2Client;
var auth = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
/* the code below is authorizationCode(Google OAuth2 – Exchange Access Code) which can be retrieved when user gives permissions to access the app.https://accounts.google.com/o/oauth2/v2/auth its needs scope and client_id and response_type and nonceplease refer to documentation where client has to send back to server */

auth.getToken(code, function(err, tokens) {
            oauth2Client.setCredentials(tokens);
        }

        //if you have store the access_token you can use this to get the auth (optional).
        

        var object = {
            auth: auth,
            calendarId: 'primary',
            resource: event
        }
        googleplus.discover('calendar', 'v3').execute(function(err, client) {
            //get the google calendar api
            if (err) {
                console.log('Err', err);
                return;
            }
            //using the client access the calendar event and insert
            client.calendar.events.create(object).withAuthClient(auth).execute(callback);
        });

        /** List the Events in Google Calendar.
         * Auth: same as above create event.
         * calendarId : 'primary' if its not specify the calendarId if you have multiple calendars.
         * Please refer calendar listing api to get list of calendars ids.
         * timeMax specifies upto maxlimit
         * timeMin specifies upto minlimit
         * maxResults: max upto 0-2500
         * are mandatory. Google has a list of fields please refer to google apis if any extrafields are needed.
         */

        var object = {
            auth: auth,
            calendarId: 'primary',
            singleEvents: true,
            timeMax: '2015-12-10T13:35:03.850Z' //ISOTIMESTRING,
            timeMin: '2015-12-08T13:35:03.850Z' //ISOTIMESTRING,
            maxResults: 2500,
            orderBy: 'startTime'
        };

        googleplus.discover('calendar', 'v3').execute(function(err, client) {
            if (err) {
                console.log('Err', err);
                return;
            }
            client.calendar.events.list(object).withAuthClient(auth).execute(callback);
        });

        /** Delete Events in Google Calendar.
         * Auth: same as above create event.
         * eventId : which event to be deleted.
         * calendarId:
         */
        var object = {
            auth: auth,
            calendarId: 'primary',
            eventId: event.id
        }; googleplus.discover('calendar', 'v3').execute(function(err, client) {
            if (err) {
                console.log('Err', err);
                return;
            }
            client.calendar.events.delete(object).withAuthClient(auth).execute(callback);
        });

        /** Update Events in Google Calendar.
         * Auth: same as above create event.
         * eventId : which event to be deleted.
         * calendarId:
         * id: id can be retrieved using get list
         */
        var object = {
            auth: auth,
            calendarId: 'primary',
            eventId: id,
            resource: event
        }; googleplus.discover('calendar', 'v3').execute(function(err, client) {
            if (err) {
                console.log('Err', err);
                return;
            }
            client.calendar.events.update(object).withAuthClient(auth).execute(callback);
        });