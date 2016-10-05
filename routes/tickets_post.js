var moment = require('moment');
var bd = require('../config/db_mongo.js');
var email = require('../util/email.js');
var texts = require('../util/strings.js');
var util = require('../util/funcoes.js');
var Cliente = require('../models/Cliente.js')();
var valida_ida = require('../validation/validation_ticket_ida.js');
var valida_full = require('../validation/validation_ticket_full.js');

var cotacao_ida = require('../processors/cotacao_apenas_ida.js');

module.exports = function(app) {

  // Criação de tickets - IDA ou VOLTA
  app.route("/tickets").post(function(req, res) {

    var ticket = null;
    var contratacao;
    var params = req.body.rd_trecho == 'volta' ? contratacao = 'full' : contratacao = 'ida';

    switch (params) {
      case 'ida':

        cotacao_ida.solicita_cotacao(ticket, req, res, function(err, result) {
          if (err) {
            res.sendStatus(500);
          }
          res.sendStatus(200);
        });

        break;

      case 'full':
        var cod_check = util.gerar_string_alfanumerica(8);
        var data_solicitacao = moment().format('DD-MM-YYYY');
        var status_ticket = false;

        //Valores obtidos do formulario
        var _qtd_passageiros = req.body.qtd_passageiros;
        var _origem_ida = req.body.combo_trecho_ida[1];
        var _destino_ida = req.body.combo_trecho_ida[2];
        var _origem_volta = req.body.combo_trecho_volta[1];
        var _destino_volta = req.body.combo_trecho_volta[2];
        var valor_ticket_ida = util.calc_valores(_origem_ida, _destino_ida, _qtd_passageiros);
        var valor_ticket_volta = util.calc_valores(_origem_volta, _destino_volta, _qtd_passageiros);
        var horario_destino_ida = util.tempo_transfer(req.body.horario_origem[1], _origem_ida, _destino_ida);
        var horario_destino_volta = util.tempo_transfer(req.body.horario_volta, _origem_volta, _destino_volta);

        ticket = {
          cod_checkin: cod_check,
          nome_cliente: req.body.nome_cliente,
          email_cliente: req.body.email_cliente,
          contratacao: contratacao,

          data_check_ida: req.body.data_check_ida[1],
          origem_ida: _origem_ida,
          destino_ida: _destino_ida,
          horario_origem_ida: req.body.horario_origem[1],
          horario_destino_ida: horario_destino_ida,

          data_check_volta: req.body.data_check_volta,
          origem_volta: _origem_volta,
          destino_volta: _destino_volta,
          horario_origem_volta: req.body.horario_volta,
          horario_destino_volta: horario_destino_volta,

          qtd_passageiros: req.body.qtd_passageiros,
          data_solicitacao: data_solicitacao,
          valor_ticket: valor_ticket_ida + valor_ticket_volta,
          status_ticket: status_ticket,
          observacoes: req.body.observacoes
        };

        //  Regra de exceções
        if (!ticket.origem_ida || !ticket.destino_ida || !ticket.origem_ida && !ticket.destino_ida || !ticket.origem_volta || !ticket.destino_volta || !ticket.origem_volta && !ticket.destino_volta) {
          var html_cotacao = texts.cotacao_trecho_indisponivel(ticket);
          email.send(ticket.email_cliente, texts.sub_cotacao, '', html_cotacao, cod_check);
          res.sendStatus(422);

        } else if (ticket.origem_ida == '------' || ticket.destino_ida == '------' || ticket.origem_volta == '------' || ticket.destino_volta == '------') {
          var html_cotacao = texts.cotacao_trecho_indisponivel(ticket);
          email.send(ticket.email_cliente, texts.sub_cotacao, '', html_cotacao, cod_check);
          res.sendStatus(422);

        } else if (ticket.origem_ida == ticket.destino_ida || ticket.origem_volta == ticket.destino_volta) {
          var html_cotacao = texts.cotacao_trecho_indisponivel(ticket);
          email.send(ticket.email_cliente, texts.sub_cotacao, '', html_cotacao, cod_check);
          res.sendStatus(422);

        } else if (ticket.qtd_passageiros > 4) {
          var html_cotacao = texts.cotacao_qtd_indisponivel(ticket);
          email.send(ticket.email_cliente, texts.sub_cotacao, '', html_cotacao, cod_check);
          res.sendStatus(422);

        } else {
          //Validacao do ticket
          valida_full.ok(ticket, req, res, function(err, done) {
            if (err) {
              res.status(422).send(err);
            } else if (done) {
              //console.log('Passou na validacao. Done: ' + done);
              var html_cotacao = texts.cotacao_full(ticket);

              bd.getCollection('tickets', 'caribenordesti01', function(collection) {
                collection.insert({
                  ticket: ticket
                });
                //console.log('Codigo de cod_checkin gerado: ' + cod_check);
                if (ticket.data_check_ida == '' || ticket.data_check_volta == '') {
                  var html_cotacao_info = texts.cotacao_informativa_full(ticket);
                  if (ticket.observacoes != '') {
                    var _txt = 'Cliente: ' + ticket.nome_cliente + ' - E-mail: ' + ticket.email_cliente;
                    _txt += '<p/>' + ticket.observacoes;
                    email.send('info@caribenordestino.com.br', 'Observacao - ' + texts.sub_cotacao, '', _txt, cod_check);
                  }
                  email.send(ticket.email_cliente, texts.sub_cotacao, '', html_cotacao_info, 'INFORMATIVA-COD_CHECK:' + cod_check);
                  res.sendStatus(200);
                  //Fim - Cotacao simples
                  //Inicio - Cotacao completa
                } else {
                  //E-mail para consultores
                  if (ticket.observacoes != '') {
                    var _txt = 'Cliente: ' + ticket.nome_cliente + ' - E-mail: ' + ticket.email_cliente;
                    _txt += '<p/>' + ticket.observacoes;
                    email.send('info@caribenordestino.com.br', 'Observacao - ' + texts.sub_cotacao, '', _txt, cod_check);
                  }
                  email.send(ticket.email_cliente, texts.sub_cotacao, '', html_cotacao, cod_check);
                  res.sendStatus(200);
                }
                //Fim - Cotacao completa
              });

            } else {
              console.log('Nao passou validacao. Done: ' + done);
              res.sendStatus(422);
            }
          });
        }

        break;
    }

  });
}
