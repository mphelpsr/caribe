var mongojs = require("mongojs");
var config = require("./cfg_mongo.json");
var assert = require('assert');
var self = this;
var Cliente = require('../models/Cliente.js')();
self.COLLECTION = config.db_collection_tickets;
self.URL = config.db_url;
self.DB_CONFIG = config.db_base;
self.DB = "";

/*
 * Recupera conexão com BD
 */
self.getCollection = function(callback) {

  self.DB = mongojs(self.URL, [self.COLLECTION]);
  self.DB.on('error', function(err) {
    console.log('error', error);
  });

  callback(self.DB.collection(self.COLLECTION));
};

/*
 * Insere documentos no BD
 */
module.exports.insertDocument = function(file, callback) {

  self.getCollection(function(collection) {
    collection.insert({
        ticket: file
      },
      function(err, result) {
        if (err) {
          callback(err, null);
          assert.equal(err, null);
        }
        console.log('Ticket inserido');
        callback(null, result);
      });
  });
};


/*
 * Lista documentos
 */
module.exports.listDocuments = function(callback) {

  self.getCollection(function(collection) {

    collection.find().toArray(function(err, result) {

      if (err) {
        console.log('error', error);
        callback(err, null);
      }

      var _res = [];
      for (var i = 0; i < result.length; i++) {
        _res.push(result[i].ticket.cod_checkin + ' - ' + result[i].ticket.nome_cliente);
      }
      console.log('Tickets listados.');
      callback(null, _res);
    });

  });

};

/*
 * Pesquisa de documentos
 */
module.exports.searchDocuments = function(id, callback) {

  self.getCollection(function(collection) {

    collection.findOne({
      'ticket.cod_checkin': id
    }, function(err, result) {
      if (err) {
        console.log('error', error);
        callback(err, null);
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
        console.log('Ticket nao encontrado');
        callback(null, []);
      }

    });

  });

};
