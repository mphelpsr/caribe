var bd = require('../config/fct_mongo.js');
var config = require("../config/cfg_mongo.json");


module.exports.cria = function(req, callback) {

    var trecho = {
            _id: req.body._id,
            valor: req.body.valor
        } 

    bd.insertTrechos(config.db_collection_trechos, trecho, function(err, result) {
        if (err) {
            callback(err, 500);
        }

        callback(null, 200);

    });

  
};
