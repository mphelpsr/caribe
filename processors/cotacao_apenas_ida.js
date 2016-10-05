var bd = require('../config/db_mongo.js');
var texts = require('../util/strings.js');
var email = require('../util/email.js');
var config = require("../config/cfg_email.json");
var util = require('../util/funcoes.js');
var moment = require('moment');

module.exports.solicita_cotacao = function(ticket, req, res, callback) {

  var cod_check = util.gerar_string_alfanumerica(8);
  var data_solicitacao = moment().format('DD-MM-YYYY');
  var status_ticket = false;

  //Valores obtidos do formulario
  var _qtd_passageiros = req.body.qtd_passageiros;
  var _origem = req.body.combo_trecho_ida[0];
  var _destino = req.body.combo_trecho_volta[0];
  var valor_ticket = util.calc_valores(_origem, _destino, _qtd_passageiros);
  var horario_destino = util.tempo_transfer(req.body.horario_origem[0], _origem, _destino);

  ticket = {
    cod_checkin: cod_check,
    nome_cliente: req.body.nome_cliente,
    email_cliente: req.body.email_cliente,
    contratacao: contratacao,

    data_check: req.body.data_check_ida[0],
    origem: _origem,
    destino: _destino,
    horario_origem: req.body.horario_origem,
    horario_destino: horario_destino,

    qtd_passageiros: _qtd_passageiros,
    data_solicitacao: data_solicitacao,
    valor_ticket: valor_ticket,
    status_ticket: status_ticket,
    observacoes: req.body.observacoes
  };

  //  Regra de exceções
  if (!ticket.origem || !ticket.destino || !ticket.origem && !ticket.destino) {
    var html_cotacao = texts.cotacao_sem_trechos(ticket);
    email.send(ticket.email_cliente, texts.sub_cotacao, '', html_cotacao, cod_check);
    callback(null, 422);

  } else if (ticket.origem == '------' || ticket.destino == '------') {
    var html_cotacao = texts.cotacao_sem_trechos(ticket);
    email.send(ticket.email_cliente, texts.sub_cotacao, '', html_cotacao, cod_check);
    callback(null, 422);

  } else if (ticket.origem == ticket.destino) {
    var html_cotacao = texts.cotacao_trecho_indisponivel(ticket);
    email.send(ticket.email_cliente, texts.sub_cotacao, '', html_cotacao, cod_check);
    callback(null, 422);

  } else if (ticket.qtd_passageiros > 4) {
    var html_cotacao = texts.cotacao_qtd_indisponivel(ticket);
    email.send(ticket.email_cliente, texts.sub_cotacao, '', html_cotacao, cod_check);
    callback(null, 422);

  } else {

    bd.insertDocument(ticket, function(err, result) {
      if (err) {
        callback(err, null);
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

};
