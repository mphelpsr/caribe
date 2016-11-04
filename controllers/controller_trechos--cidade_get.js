var cidades = require('../processors/lista_trechos.js');

module.exports.executa = function(req, callback){

  cidades.lista_trecho(req.params.origem, req.params.destino, function(err, result) {
    if (err) {
      callback(result);
    }
    callback(result);
  });

};
