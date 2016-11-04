var trechos = require('../processors/criacao_de_trechos.js');

module.exports.executa = function(req, callback){

  trechos.cria(req, function(err, result) {
    if (err) {
      callback(result);
    }
    callback(result);
  });

};
