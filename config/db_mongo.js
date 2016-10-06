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
self.getCollection = function(callback) {

  self.DB = mongojs(self.URL, [self.COLLECTION]);
  self.DB.on('error', function(err) {
    console.log('Database ERROR!', err);
  });

  self.DB.on('connect', function() {
    console.log('Database CONNECTED. DB: ' + self.DB_CONFIG + ' --- COLLECTION: ' + self.COLLECTION);
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
        callback(err, null);
      }

      var _res = [];
      for (var i = 0; i < result.length; i++) {
        _res.push(result[i].ticket.cod_checkin + ' - ' + result[i].ticket.nome_cliente);
      }
      callback(null, _res);
    });

  });

};

/*
 * Pesquisa documentos
 */
module.exports.searchDocuments = function(id, callback) {

  self.getCollection(function(collection) {

    collection.findOne({
      'tickets.cod_checkin': id
    }, function(err, result) {
      if (err || !result) {
        callback(null, []);
      }
      callback(null, result);
    });

  });

};
