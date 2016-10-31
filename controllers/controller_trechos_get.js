var trechos = require('../processors/lista_trechos.js');

module.exports.executa = function(callback){

  trechos.lista_todos(function(err, result) {
    if (err) {
      callback(result);
    }
    callback(result);
  });
};
