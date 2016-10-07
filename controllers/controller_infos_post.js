var informacoes = require('../processors/informacoes.js');

module.exports.executa = function(req, callback){

  informacoes.solicitacao(req, function(err, result) {
    if (err) {
      callback(result);
    }
    callback(result);
  });
};
