var bd = require('../config/fct_mongo.js');
var texts = require('../util/strings.js');
var email = require('../config/fct_email.js');
var config = require("../config/cfg_email.json");
var util = require('../util/funcoes.js');
var moment = require('moment');
var parser_json = require('../util/parser_transfer.js');
var config = require("../config/cfg_mongo.json");

module.exports.orcamento = function(req, callback) {

  parser_json.tratamento(req, function(result) {
    ticket = result;

    //  Regra de excecoes
    if (!ticket.origem || !ticket.destino || !ticket.origem && !ticket.destino) {
      var html_cotacao = texts.cotacao_sem_trechos(ticket);
      email.send(ticket.email_cliente, texts.sub_cotacao, '', html_cotacao, ticket.cod_checkin);
      callback(null, 422);

    } else if (ticket.origem == '------' || ticket.destino == '------') {
      var html_cotacao = texts.cotacao_sem_trechos(ticket);
      email.send(ticket.email_cliente, texts.sub_cotacao, '', html_cotacao, ticket.cod_checkin);
      callback(null, 422);

    } else if (ticket.origem == ticket.destino) {
      var html_cotacao = texts.cotacao_trecho_indisponivel(ticket);
      email.send(ticket.email_cliente, texts.sub_cotacao, '', html_cotacao, ticket.cod_checkin);
      callback(null, 422);

    } else if (ticket.qtd_passageiros > 4) {
      var html_cotacao = texts.cotacao_qtd_indisponivel(ticket);
      email.send(ticket.email_cliente, texts.sub_cotacao, '', html_cotacao, ticket.cod_checkin);
      callback(null, 422);

    } else {

      bd.insertDocument(config.db_collection_tickets, ticket, function(err, result) {
        if (err) {
          callback(err, 500);
        }

        var html_cotacao = texts.cotacao(ticket);

        if (ticket.data_check == '') {

          var html_cotacao_info = texts.cotacao_informativa(ticket);

          if (ticket.observacoes != '') {
            var _txt = 'Cliente: ' + ticket.nome_cliente + ' - E-mail: ' + ticket.email_cliente;
            _txt += '<p/>' + ticket.observacoes;

            email.send(config.mail_info, 'Observacao - ' + texts.sub_cotacao, '', _txt, ticket.cod_checkin);
          }

          email.send(ticket.email_cliente, texts.sub_cotacao, '', html_cotacao_info, 'INFORMATIVA-ticket.cod_checkin:' + ticket.cod_checkin);
          callback(null, 200);

        } else {
          //E-mail para consultores
          if (ticket.observacoes != '') {
            var _txt = 'Cliente: ' + ticket.nome_cliente + ' - E-mail: ' + ticket.email_cliente;
            _txt += '<p/>' + ticket.observacoes;
            email.send(config.mail_info, 'Observacao - ' + texts.sub_cotacao, '', _txt, ticket.cod_checkin);
          }
          email.send(ticket.email_cliente, texts.sub_cotacao, '', html_cotacao, ticket.cod_checkin);
          callback(null, 200);

        }

      });

    }

  });

};
