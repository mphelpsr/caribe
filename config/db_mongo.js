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
    console.log('Database CONNECTED. DB: ' + self.DB_CONFIG + '--- COLLECTION: ' + self.COLLECTION);
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
        if(err){
          callback(err, null);
          assert.equal(err, null);
        }
        console.log("Ticket inserido com sucesso!");
        callback(null,result);
      });
  });
};
