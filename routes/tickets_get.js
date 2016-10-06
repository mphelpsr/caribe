var moment = require('moment');
var bd = require('../config/db_mongo.js');
var email = require('../config/cfg_email.js');
var texts = require('../util/strings.js');
var util = require('../util/funcoes.js');
var Cliente = require('../models/Cliente.js')();
var valida_ida = require('../validation/validation_ticket_ida.js');
var valida_full = require('../validation/validation_ticket_full.js');

var tickets = require('../processors/lista_tickets.js');

module.exports = function(app) {

  // Lista todos os tickets
  app.route("/tickets/")
    .get(function(req, res) {

      tickets.lista_todos(function(err, result) {
        if (err) {
          res.sendStatus(result);
        }
        res.json(result);
      });

    });

  // Encontrar um ticket
  app.route("/tickets/:cod_checkin")
    .get(function(req, res) {

      tickets.lista_um(req.params.cod_checkin, function(err, result) {
        if (err) {
          res.sendStatus(result);
        }
        res.json(result);
      });
      
    });
}
