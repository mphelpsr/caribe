var mongojs = require("mongojs");
var config = require("./cfg_mongo.json");
var assert = require('assert');
var self = this;

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
    console.log('error', error);
  });

  callback(self.DB.collection(_collection));
};

/*
 * Insere documentos no BD
 */
module.exports.insertDocument = function(_collection, file, callback) {

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
 * Lista documentos
 */
module.exports.listDocuments = function(_collection, callback) {

  self.getCollection(_collection, function(collection) {

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
module.exports.searchDocuments = function(_collection, id, callback) {

  self.getCollection(_collection, function(collection) {

    collection.findOne({
      'ticket.cod_checkin': id
    }, function(err, result) {
      if (err) {
        console.log('error', error);
        callback(err, null);
      }
      callback(null, result);

    });

  });

};
