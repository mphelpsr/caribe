var bd = require('../config/fct_mongo.js');
var config = require("../config/cfg_mongo.json");

module.exports.lista_todos = function(callback) {

  bd.listDocuments(config.db_collection_trechos, function(err, result) {
    if (err) {
      callback(err, 500);
    }
    callback(null, result);
  });

};
