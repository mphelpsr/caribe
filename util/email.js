var nodemailer = require('nodemailer');
var moment = require('moment');

var smtpConfig = {
    host: 'email-ssl.com.br',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'cotacao@caribenordestino.com.br',
        pass: 'c@ribeverao2017'
    }
};

var transporter = nodemailer.createTransport(smtpConfig);

module.exports.send = function(_to, _subject, _text, _html, _cod) {
    var mailOptions = {
        from: 'Caribe Nordestino<info@caribenordestino.com.br>',
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
