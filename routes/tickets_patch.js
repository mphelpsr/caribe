var moment = require('moment');
var bd = require('../config/db_mongo.js');
var email = require('../util/email.js');
var texts = require('../util/strings.js');

module.exports = function(app) {

  // Atualizar um ticket
  app.route("/tickets/:cod_checkin/:status_ticket")
    .patch(function(req, res) {
      var params = req.params.cod_checkin;
      var _status = req.params.status_ticket;

      bd.getCollection('tickets', 'caribenordesti01', function(collection) {

        collection.findOne({
          'ticket.cod_checkin': params
        }, function(err, result) {
          if (err) {
            res.sendStatus(501);
          } else if (result.ticket.status_ticket == false) {
            collection.update({
              'ticket.cod_checkin': params
            }, {
              $set: {
                'ticket.status_ticket': true
              }
            });
            var ticket = result.ticket;
            var html_sucesso = texts.html_sucesso(ticket);

            result.ticket.status_ticket = _status;
            if (_status) {

              var results = collection.update({
                'ticket.cod_checkin': params
              }, {
                $inc: {
                  status_ticket: true
                }
              });
              //email.send(ticket.email_cliente, texts.sub_agendamento_sucesso,'',html_sucesso,ticket.cod_checkin);
              res.sendStatus(200);
            } else {
              res.sendStatus(422);
            }

          } else {
            res.sendStatus(404);
          }

        });

      });
    });
}
