var config = require("../config/cfg_google.json");
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var fs = require('fs');
var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

module.exports.lista_todos = function(req, res, callback) {

    var OAuth2 = google.auth.OAuth2;
    var oauth2Client = new OAuth2(
        config.web.client_id,
        config.web.client_secret,
        config.web.redirect_uris
    );

    oauth2Client.setCredentials({
        access_token: config.web.access_token,
        refresh_token: config.web.refresh_token
            // Optional, provide an expiry_date (milliseconds since the Unix Epoch)
            //expiry_date: (new Date()).getTime() + (1000 * 60 * 60 * 24 * 7)
    });


    var startDate = req.params.data_inicio + 'T00:00:00+10:00';
    var maxDate = req.params.data_fim + 'T23:59:00+10:00';

    var params = {
        'calendarId': config.web.calendarId,
        "singleEvents": true,
        "orderBy": "startTime",
        "timeMin": startDate,
        "timeMax": maxDate
    }

    var calendar = google.calendar({
        version: 'v3',
        auth: oauth2Client
    });


    calendar.events.list(params, function(err, result) {
        if (err) {
            callback(err, null);
        }
        callback(null, result.items);
    });


}