var ida = require('../processors/ida.js');
var ida_volta = require('../processors/ida_volta.js');

module.exports.executa = function(req, callback){

  //var contratacao = req.body.rd_trecho == 'volta' ? contratacao = 'full' : contratacao = 'ida';
  var tipo_contratacao = req.body.contratacao == 'volta' ? tipo_contratacao = 'full' : tipo_contratacao = 'ida';

  switch (tipo_contratacao) {
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
