var nodemailer = require('nodemailer');
var moment = require('moment');
var config = require("../config/cfg_email.json");

var smtpConfig = {
    host: config.mail_host,
    port: config.mail_port,
    secure: config.mail_security, // use SSL
    auth: {
        user: config.mail_uids.user,
        pass: config.mail_uids.pass
    }
};

var transporter = nodemailer.createTransport(smtpConfig);

module.exports.send = function(_to, _subject, _text, _html, _cod) {
    var mailOptions = {
        from: config.mail_from,
        to: _to,
        subject: _subject,
        text: _text,
        html: _html
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log('Error email: ' + error);
        }
        console.log('::: Cotacao! E-mail: ' + mailOptions.to + '. Codigo: ' + _cod + '----- Data: ' + moment().format('DD-MM-YYYY'));
    });
}
