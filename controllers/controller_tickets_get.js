var tickets = require('../processors/lista_tickets.js');

module.exports.executa = function(callback){

  tickets.lista_todos(function(err, result) {
    if (err) {
      callback(result);
    }
    callback(result);
  });
};
