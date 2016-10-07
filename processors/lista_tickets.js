var Cliente = require('../models/Cliente.js')();
var bd = require('../config/db_mongo.js');

module.exports.lista_todos = function(callback) {

  bd.listDocuments(function(err, result) {
    if (err) {
      callback(err, 500);
    }
    callback(null, result);
  });

};

module.exports.lista_um = function(cod_checkin, callback) {

  bd.searchDocuments(cod_checkin, function(err, result) {
    if (err) {
      callback(err, 500);
    }
    
    if (result != '') {
      var _passageiros = [];
      for (var i = 0; i < parseInt(result.ticket.qtd_passageiros) - 1; i++) {
        var _cliente = new Cliente();
        _cliente.setNome_cliente('');
        _cliente.setTipo_documento('');
        _cliente.setDocumento('');
        _passageiros[i] = _cliente;
      }
      result.ticket.passageiros = _passageiros;
      callback(null, result);
    }else{
      callback(null, []);
    }

  });

};
