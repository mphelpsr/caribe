var ida = require('../processors/ida.js');
var ida_volta = require('../processors/ida_volta.js');

module.exports = function(app) {

  // Criação de tickets - IDA ou VOLTA
  app.route("/tickets").post(function(req, res) {

    var contratacao = req.body.rd_trecho == 'volta' ? contratacao = 'full' : contratacao = 'ida';

    switch (contratacao) {
      case 'ida':

        ida.orcamento(req, res, function(err, result) {
          if (err) {
            res.sendStatus(result);
          }
          res.sendStatus(result);
        });

        break;

      case 'full':

        ida_volta.orcamento(req, res, function(err, result) {
          if (err) {
            res.sendStatus(result);
          }
          res.sendStatus(result);
        });

        break;
    }

  });
}
