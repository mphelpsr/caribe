var calculo_trecho = require('../processors/calculo_trecho.js');

module.exports.executa = function(req, callback){

  calculo_trecho.valores(req.params.origem, req.params.destino, req.params.qtd_passageiros, function(err, result) {
    if (err) {
      callback(result);
    }
    callback(result);
  });

};
