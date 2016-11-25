var bd = require('../config/fct_mongo.js');
var texts = require('../util/strings.js');
var email = require('../config/fct_email.js');
var config_mail = require("../config/cfg_email.json");
var util = require('../util/funcoes.js');
var moment = require('moment');
var config = require("../config/cfg_mongo.json");
var parser_json = require('../util/parser_transfer.js');

module.exports.orcamento = function(req, callback) {

  parser_json.tratamento(req, function(result) {
    ticket = result;

    //  Regra de exceções
    if (!ticket.origem_ida || !ticket.destino_ida || !ticket.origem_ida && !ticket.destino_ida || !ticket.origem_volta || !ticket.destino_volta || !ticket.origem_volta && !ticket.destino_volta) {
      var html_cotacao = texts.cotacao_trecho_indisponivel(ticket);
      email.send(ticket.email_cliente, texts.sub_cotacao, '', html_cotacao, ticket.cod_checkin);
      callback(null, 422);

    } else if (ticket.origem_ida == '------' || ticket.destino_ida == '------' || ticket.origem_volta == '------' || ticket.destino_volta == '------') {
      var html_cotacao = texts.cotacao_trecho_indisponivel(ticket);
      email.send(ticket.email_cliente, texts.sub_cotacao, '', html_cotacao, ticket.cod_checkin);
      callback(null, 422);

    } else if (ticket.origem_ida == ticket.destino_ida || ticket.origem_volta == ticket.destino_volta) {
      var html_cotacao = texts.cotacao_trecho_indisponivel(ticket);
      email.send(ticket.email_cliente, texts.sub_cotacao, '', html_cotacao, ticket.cod_checkin);
      callback(null, 200);

    } else if (ticket.qtd_passageiros > 4) {
      var html_cotacao = texts.cotacao_qtd_indisponivel(ticket);
      email.send(ticket.email_cliente, texts.sub_cotacao, '', html_cotacao, ticket.cod_checkin);
      callback(null, 422);

    } else {
      bd.insertTicket(config.db_collection_tickets, ticket, function(err, result) {
        if (err) {
          callback(err, 500);
        }
        var html_cotacao = texts.cotacao_full(ticket);

        if (ticket.data_check_ida == '' || ticket.data_check_volta == '') {

          var html_cotacao_info = texts.cotacao_informativa_full(ticket);

          if (ticket.observacoes) {
            var _txt = 'Cliente: ' + ticket.nome_cliente + ' - E-mail: ' + ticket.email_cliente;
            _txt += '<p/>' + ticket.observacoes;
            email.send(config_mail.mail_info, 'Observacao - ' + texts.sub_cotacao, '', _txt, ticket.cod_checkin);
          }
          email.send(ticket.email_cliente, texts.sub_cotacao, '', html_cotacao_info, 'INFORMATIVA-ticket.cod_checkin:' + ticket.cod_checkin);
          callback(null, 200);
          //Fim - Cotacao simples
          //Inicio - Cotacao completa
        } else {
          //E-mail para consultores
          if (ticket.observacoes) {
            var _txt = 'Cliente: ' + ticket.nome_cliente + ' - E-mail: ' + ticket.email_cliente;
            _txt += '<p/>' + ticket.observacoes;
            email.send(config_mail.mail_info, 'Observacao - ' + texts.sub_cotacao, '', _txt, ticket.cod_checkin);
          }
          email.send(ticket.email_cliente, texts.sub_cotacao, '', html_cotacao, ticket.cod_checkin);
          callback(null, 200);
        }
      });
    }

  });

};
