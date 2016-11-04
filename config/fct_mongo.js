var mongojs = require("mongojs");
var config = require("./cfg_mongo.json");
var assert = require('assert');
var self = this;
var util = require("../util/funcoes.js");

self.COLLECTION = config.db_collection_tickets;
self.URL = config.db_url;
self.DB_CONFIG = config.db_base;
self.DB = "";

/*
 * Recupera conexão com BD
 */
self.getCollection = function(_collection, callback) {

  self.DB = mongojs(self.URL, [_collection]);
  self.DB.on('error', function(err) {
    console.log('error', err);
  });

  callback(self.DB.collection(_collection));
};

/*
 * Insere tickets
 */
module.exports.insertTicket = function(_collection, file, callback) {

  self.getCollection(_collection, function(collection) {
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
 * Insere trechos
 */
module.exports.insertTrechos = function(_collection, file, callback) {

  self.getCollection(_collection, function(collection) {
    collection.insert({
        trecho: file
      },
      function(err, result) {
        if (err) {
          callback(err, null);
          assert.equal(err, null);
        }
        console.log('Trecho inserido');
        callback(null, result);
      });
  });
};

/*
 * Insere cidades
 */
module.exports.insertCidades = function(_collection, file, callback) {

  self.getCollection(_collection, function(collection) {
    collection.insert({
        cidade: file
      },
      function(err, result) {
        if (err) {
          callback(err, null);
          assert.equal(err, null);
        }
        console.log('Cidade inserida');
        callback(null, result);
      });
  });
};


/*
 * Lista todos os documentos
 */
module.exports.listDocuments = function(_collection, callback) {

  self.getCollection(_collection, function(collection) {

    collection.find().toArray(function(err, result) {

      if (err) {
        console.log('error', err);
        callback(err, null);
      }

      console.log('Documentos listados.');
      callback(null, result);
    });

  });

};

/*
 * Pesquisa de tickets
 */
module.exports.searchTickets = function(_collection, id, callback) {

  self.getCollection(_collection, function(collection) {

    collection.findOne({
      'ticket.cod_checkin': id
    }, function(err, result) {
      if (err) {
        console.log('error', err);
        callback(err, null);
      }
      callback(null, result);

    });

  });

};


/*
 * Pesquisa de valor por trecho
 */
module.exports.searchTransfers = function(_collection, _origem, _destino, callback) {

  self.getCollection(_collection, function(collection) {

    collection.findOne({
      'trecho._id': _origem + _destino
    }, function(err, result) {

      if (err) {
        console.log('error', err);
        callback(err, null);
      }

      callback(null, parseInt(result.trecho.valor));

    });

  });

};

/*
* Pesquisa de cidades por ID
*/
module.exports.listTrechos = function(_collection, _origem, _destino, callback) {

  self.getCollection(_collection, function(collection) {

    collection.findOne({
      'trecho._id': _origem + _destino
    }, function(err, result) {

      if (err) {
        console.log('error', err);
        callback(err, null);
      }

      callback(null, result);

    });

  });

};

