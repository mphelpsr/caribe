var config = require("../config/cfg_google.json");
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var fs = require('fs');
var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

module.exports.lista_todos = function(req, res, callback) {
    console.log(JSON.stringify(config));

    var google = require('googleapis');
    var OAuth2 = google.auth.OAuth2;

    var oauth2Client = new OAuth2(
        config.web.client_id,
        config.web.client_secret,
        config.web.redirect_uris
    );

    /* generate a url that asks permissions for Google+ and Google Calendar scopes */

    var url = oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',

        // If you only need one scope you can pass it as string
        scope: 'https://www.googleapis.com/auth/calendar'
    });

    res.redirect(url);
}





/*

    //Nao apagar 
    //code=4/qLt7Ad0z0Z6piymT1_GasQUhQc3u4F2fUT9i_xPTlTk#

    function getAccessToken(oauth2Client, callback) {
        var code = '4/qLt7Ad0z0Z6piymT1_GasQUhQc3u4F2fUT9i_xPTlTk#';
        oauth2Client.getToken(code, function(err, tokens) {
            if (err) {
                return callback(err);
            }
            // set tokens to the client
            // TODO: tokens should be set by OAuth2 client.
            oauth2Client.setCredentials(tokens);
            callback();
        });
    }

    // retrieve an access token
    getAccessToken(oauth2Client, function() {
        // retrieve user profile
        plus.people.get({ userId: 'me', auth: oauth2Client }, function(err, profile) {
            if (err) {
                return console.log('An error occured', err);
            }
            console.log(profile.displayName, ':', profile.tagline);
        });
    });


};
*/