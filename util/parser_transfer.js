var util = require('../util/funcoes.js');
var moment = require('moment');
var calculo_trecho = require('../processors/calculo_trecho.js');
var async = require('async');

module.exports.tratamento = function(req, callback) {

  var tipo_contratacao = req.body.contratacao == 'volta' ? tipo_contratacao = 'full' : tipo_contratacao = 'ida';

  if (tipo_contratacao == 'ida') {

    calculo_trecho.valores(req.body.origem, req.body.destino, req.body.qtd_passageiros, function(err, result) {
      if (err) {
        callback(err)
      }

      var json = {
        cod_checkin: util.gerar_string_alfanumerica(8),
        nome_cliente: req.body.nome_cliente,
        email_cliente: req.body.email_cliente,
        contratacao: req.body.contratacao,

        data_check_ida: req.body.data_check_ida,
        origem_ida: req.body.origem_ida,
        destino_ida: req.body.destino_ida,

        valor_ticket: result,
        qtd_passageiros: req.body.qtd_passageiros,
        data_solicitacao: moment().format('DD-MM-YYYY'),
        status_ticket: false,
        observacoes: req.body.observacoes
      };
      callback(json);

    });


  } else {

    async.parallel([
      function(callback) {
        calculo_trecho.valores(req.body.origem_ida, req.body.destino_ida, req.body.qtd_passageiros, function(err, result) {
          if (err) {
            callback(err)
          }

          callback(err, result)

        });

      },
      function(callback) {
        calculo_trecho.valores(req.body.origem_volta, req.body.destino_volta, req.body.qtd_passageiros, function(err, result) {
          if (err) {
            callback(err)
          }

          callback(err, result)

        });
      }
    ], function(err, result) {

      if (err) {
        callback(err);
      }


      var valor_ticket_ida = result[0];
      var valor_ticket_volta = result[1];

      var json = {
        cod_checkin: util.gerar_string_alfanumerica(8),
        nome_cliente: req.body.nome_cliente,
        email_cliente: req.body.email_cliente,
        contratacao: req.body.contratacao,

        data_check_ida: req.body.data_check_ida,
        origem_ida: req.body.origem_ida,
        destino_ida: req.body.destino_ida,


        data_check_volta: req.body.data_check_volta,
        origem_volta: req.body.origem_volta,
        destino_volta: req.body.destino_volta,

        qtd_passageiros: req.body.qtd_passageiros,
        data_solicitacao: moment().format('DD-MM-YYYY'),
        valor_ticket: valor_ticket_ida + valor_ticket_volta,
        status_ticket: false,
        observacoes: req.body.observacoes
      }

      callback(json);

    });


  }
};
