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
    callback(null, result);

  });

};
