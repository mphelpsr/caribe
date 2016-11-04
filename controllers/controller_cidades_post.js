var cidades = require('../processors/criacao_cidades.js');

module.exports.executa = function(req, callback){

  cidades.cria(req, function(err, result) {
    if (err) {
      callback(result);
    }
    callback(result);
  });

};
