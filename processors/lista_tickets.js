var bd = require('../config/fct_mongo.js');
var Cliente = require('../models/Cliente.js')();
var config = require("../config/cfg_mongo.json");
var util = require('../util/funcoes.js');

module.exports.lista_todos = function(callback) {

  bd.listDocuments(config.db_collection_tickets, function(err, result) {
    if (err) {
      callback(err, 500);
    }
    callback(null, result);
  });

};

module.exports.lista_um = function(cod_checkin, callback) {

  bd.searchTickets(config.db_collection_tickets, cod_checkin, function(err, result) {
    if (err) {
      callback(err, 500);

    } else if (result) {
      var _passageiros = [];
      for (var i = 0; i < parseInt(result.ticket.qtd_passageiros) - 1; i++) {
        var _cliente = new Cliente();
        _cliente.setNome_cliente('');
        _cliente.setTipo_documento('');
        _cliente.setDocumento('');
        _passageiros[i] = _cliente;
      }
      result.ticket.passageiros = _passageiros;
      console.log('Ticket encontrado: ' + result.ticket.cod_checkin);
      callback(null, result);
    } else {
      console.log('Ticket ' + cod_checkin + ' nao encontrado');
      callback(null, []);
    }

  });

};
