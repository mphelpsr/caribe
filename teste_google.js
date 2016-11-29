var moment = require('moment');
var googleapis = require('googleapis');
var GoogleToken = require('gapitoken');
var OAuth2Client = googleapis.OAuth2Client;
var config = require("./config/cfg_google.json");


var express = require('express');
var app = express();
var oauth2Client;

app.get('/', function(req, res) {

    // these two come from the google api console, after creating
    // a web service client (as opposed to a service account)
    // these
    oauth2Client =
        new OAuth2Client(
            config.web.client_id,
            config.web.client_secret,
            "http://localhost:21087/oauth2callback"); // callback url. arbitrary, but set at google console API

    var url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/calendar'
    });

    res.redirect(url);
});

app.get('/oauth2callback', function(req, res) {
    console.log(req.query["code"]);
    oauth2Client.getToken(req.query["code"], function(err, token) {
        if (err) {
            console.log("error: " + err);
            res.send(500, "Error getting token.");
            return;
        }

        oauth2Client.credentials = token;
        // okay, we've got a token now.	lets actually issue a request.
        googleapis.discover('calendar', 'v3').execute(function(err, client) {
            var now = moment().format();

            client.calendar
                .events
                .insert({
                    calendarId: 'ornv94e5ucmlmrvas8tvnviecc@group.calendar.google.com', // this comes from the calendar settings page towards the bottom
                    resource: { // this was 'primary' in the original example, but that didn't work for me
                        summary: 'hangout', // for some reason.
                        description: 'hangout',
                        reminders: {
                            overrides: {
                                method: 'popup',
                                minutes: 0
                            }
                        },
                        start: {
                            dateTime: now
                        },
                        end: {
                            dateTime: now
                        },
                        attendees: [{
                            email: 'skalinichenko@gmail.com'
                        }]
                    }
                })
                .withAuthClient(oauth2Client)
                .execute(function(err, event) {
                    console.log(err);
                    console.log(event);
                });
        });
        res.send(200);
    });
});