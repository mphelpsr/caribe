var tickets = require('../processors/lista_tickets.js');

module.exports.executa = function(req, callback){

  tickets.lista_um(req.params.cod_checkin, function(err, result) {
    if (err) {
      callback(result);
    }
    callback(result);
  });

};
