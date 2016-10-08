var ida = require('../processors/ida.js');
var ida_volta = require('../processors/ida_volta.js');

module.exports.executa = function(req, callback){

  var contratacao = req.body.rd_trecho == 'volta' ? contratacao = 'full' : contratacao = 'ida';

  switch (contratacao) {
    case 'ida':

      ida.orcamento(req, function(err, result) {
        if (err) {
          callback(result);
        }
        callback(result);
      });

      break;

    case 'full':

      ida_volta.orcamento(req, function(err, result) {
        if (err) {
          callback(result);
        }
        callback(result);
      });

      break;
  }

};
