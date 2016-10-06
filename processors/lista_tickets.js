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

module.exports.lista_um = function(tickets, callback) {

  bd.searchDocuments(tickets, function(err, result) {
    if (err) {
      callback(err, 500);
    }
    console.log(result);
  });

};
