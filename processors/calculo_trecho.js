var bd = require('../config/fct_mongo.js');
var config = require("../config/cfg_mongo.json");


module.exports.valores = function(origem, destino, passageiros, callback) {

  bd.searchTransfers(config.db_collection_trechos, origem, destino, function(err, result) {
    if (err) {
      callback(err, 500);

    } else if (result) {

      if (passageiros == 1 || passageiros == 2) {
        result += 0;
        callback(null, result);

      } else if (passageiros == 3) {
        result += 20;
        callback(null, result);

      } else if (passageiros == 4) {
        result += 40;
        callback(null, result);

      } else {
        callback(null, 999);
      }

    } else {
      callback(null, 0); // TODO: tratar erro
    }

  });


};
