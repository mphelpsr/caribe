var bd = require('../config/fct_mongo.js');
var config = require("../config/cfg_mongo.json");


module.exports.cria = function(req, callback) {

    var cidade = {
            nome: req.body.nome_cidade,
            abreviacao: req.body.abreviacao
        } 

    bd.insertCidades(config.db_collection_cidades, cidade, function(err, result) {
        if (err) {
            callback(err, 500);
        }

        callback(null, 200);

    });

  
};
