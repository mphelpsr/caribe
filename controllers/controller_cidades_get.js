var cidades = require('../processors/lista_cidades.js');

module.exports.executa = function(callback){

  cidades.lista_todos(function(err, result) {
    if (err) {
      callback(result);
    }
    callback(result);
  });
};
