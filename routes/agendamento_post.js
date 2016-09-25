var moment = require('moment');
var bd = require('../config/database_mongoq.js');
var email = require('../util/email.js');
var texts = require('../util/strings.js');
var util = require('../util/funcoes.js');
var Cliente = require('../models/Cliente.js')();

module.exports = function(app) {

  // Criação do agendamento - IDA ou VOLTA
  app.route("/agendamento/:cod_checkin/")
    .post(function(req, res) {

      var params = req.params.cod_checkin;
      var _passageiros = [];

      bd.createCollection('tickets', 'caribe_tickets', function(collection) {

        collection.findOne({
          'ticket.cod_checkin': params
        }, function(err, result) {
          if (err) {
            res.sendStatus(501);
          } else if (result.ticket.status_ticket == false) {

            switch (_trecho) {

              case 'ida':
                var ticket = {
                  cod_checkin: result.ticket.cod_checkin,
                  nome_cliente: result.ticket.nome_cliente,
                  email_cliente: result.ticket.email_cliente,
                  data_check: result.ticket.data_check,
                  origem: result.ticket.origem,
                  destino: result.ticket.destino,
                  tel_celular: req.body.tel_celular,
                  documento: req.body.documento,
                  tipo_documento: req.body.tipo_documento,
                  horario_origem: result.ticket.horario_origem,
                  horario_destino: result.ticket.horario_destino,
                  qtd_passageiros: result.ticket.qtd_passageiros,
                  data_solicitacao: result.ticket.data_solicitacao,
                  valor_ticket: result.ticket.valor_ticket,
                  status_ticket: result.ticket.status_ticket
                };

                for (var i = 0; i < parseInt(ticket.qtd_passageiros) - 1; i++) {
                  var _cliente = new Cliente();
                  _cliente.setNome_cliente(req.body.passageiros[i].nome_cliente);
                  _cliente.setTipo_documento(req.body.passageiros[i].tipo_documento);
                  _cliente.setDocumento(req.body.passageiros[i].documento);
                  _passageiros[i] = _cliente;
                }
                ticket.passageiros = _passageiros;
                var html_reserva_sucesso = texts.html_reserva_sucesso(ticket);

                bd.createCollection('agendamentos', 'caribe_tickets', function(collection) {
                  collection.insert({
                    ticket: ticket
                  });
                  //email.send(ticket.email_cliente, texts.sub_agendamento_concluido,'',html_reserva_sucesso);
                });

                res.sendStatus(200);
                break;

              case 'volta':
                var ticket = {
                  cod_checkin: result.ticket.cod_checkin,
                  nome_cliente: result.ticket.nome_cliente,
                  email_cliente: result.ticket.email_cliente,

                  data_check_ida: result.ticket.data_check_ida,
                  origem_ida: result.ticket.origem_ida,
                  destino_ida: result.ticket.destino_ida,
                  horario_origem_ida: result.ticket.horario_origem_ida,
                  horario_destino_ida: result.ticket.horario_destino_ida,

                  data_check_volta: result.ticket.data_check_volta,
                  origem_volta: result.ticket.origem_volta,
                  destino_volta: result.ticket.destino_volta,
                  horario_origem_volta: result.ticket.horario_origem_volta,
                  horario_destino_volta: result.ticket.horario_destino_volta,

                  tel_celular: req.body.tel_celular,
                  documento: req.body.documento,
                  tipo_documento: req.body.tipo_documento,

                  qtd_passageiros: result.ticket.qtd_passageiros,
                  data_solicitacao: result.ticket.data_solicitacao,
                  valor_ticket: result.ticket.valor_ticket,
                  status_ticket: result.ticket.status_ticket
                };

                for (var i = 0; i < parseInt(ticket.qtd_passageiros) - 1; i++) {
                  var _cliente = new Cliente();
                  _cliente.setNome_cliente(req.body.passageiros[i].nome_cliente);
                  _cliente.setTipo_documento(req.body.passageiros[i].tipo_documento);
                  _cliente.setDocumento(req.body.passageiros[i].documento);
                  _passageiros[i] = _cliente;
                }
                ticket.passageiros = _passageiros;
                var html_reserva_sucesso = texts.html_reserva_sucesso(ticket);

                bd.createCollection('agendamentos', 'caribe_tickets', function(collection) {
                  collection.insert({
                    ticket: ticket
                  });
                  //email.send(ticket.email_cliente, texts.sub_agendamento_concluido,'',html_reserva_sucesso);
                });

                res.sendStatus(200);
                break;
            }

          } else if (result.ticket.status_ticket == true) {
            //Redirecionar para impressao PDF. Agendamento ja realizado.

          } else {
            res.sendStatus(404);
          }

        });

      });

    });
}
