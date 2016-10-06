var moment = require('moment');
var bd = require('../config/db_mongo.js');
var email = require('../util/email.js');
var texts = require('../util/strings.js');
var util = require('../util/funcoes.js');
var Cliente = require('../models/Cliente.js')();
var valida_ida = require('../validation/validation_ticket_ida.js');
var valida_full = require('../validation/validation_ticket_full.js');

var tickets = require('../processors/lista_tickets.js');

module.exports = function(app) {

  // Lista todos os tickets
  app.route("/tickets/")
    .get(function(req, res) {

      tickets.lista_todos(function(err, result) {
        if (err) {
          res.sendStatus(result);
        }
        res.json(result);
      });

    });

  // Encontrar um ticket
  app.route("/tickets/:cod_checkin")
    .get(function(req, res) {

      var params = req.params.cod_checkin;
      var _passageiros = [];

      bd.getCollection('tickets', 'caribenordesti01', function(collection) {

        collection.findOne({
          'ticket.cod_checkin': params
        }, function(err, result) {

          if (err || !result) {
            res.json('[]');
          } else {

            switch (result.ticket.contratacao) {
              case 'ida':
                var ticket = {
                  cod_checkin: result.ticket.cod_checkin,
                  nome_cliente: result.ticket.nome_cliente,
                  email_cliente: result.ticket.email_cliente,
                  contratacao: result.ticket.contratacao,
                  data_check: result.ticket.data_check,
                  origem: result.ticket.origem,
                  destino: result.ticket.destino,
                  tel_celular: '',
                  documento: '',
                  tipo_documento: '',
                  horario_origem: result.ticket.horario_origem,
                  horario_destino: result.ticket.horario_destino,
                  qtd_passageiros: result.ticket.qtd_passageiros,
                  data_solicitacao: result.ticket.data_solicitacao,
                  valor_ticket: result.ticket.valor_ticket,
                  status_ticket: result.ticket.status_ticket,
                  observacoes: result.ticket.observacoes
                };

                for (var i = 0; i < parseInt(ticket.qtd_passageiros) - 1; i++) {
                  var _cliente = new Cliente();
                  _cliente.setNome_cliente('');
                  _cliente.setTipo_documento('');
                  _cliente.setDocumento('');
                  _passageiros[i] = _cliente;
                }
                ticket.passageiros = _passageiros;
                break;

              case 'full':
                var ticket = {
                  cod_checkin: result.ticket.cod_checkin,
                  nome_cliente: result.ticket.nome_cliente,
                  email_cliente: result.ticket.email_cliente,
                  tel_celular: '',
                  documento: '',
                  tipo_documento: '',
                  contratacao: result.ticket.contratacao,
                  data_solicitacao: result.ticket.data_solicitacao,

                  data_check_ida: result.ticket.data_check_ida,
                  data_check_volta: result.ticket.data_check_volta,
                  origem_ida: result.ticket.origem_ida,
                  destino_ida: result.ticket.destino_ida,
                  destino_volta: result.ticket.destino_volta,
                  origem_volta: result.ticket.origem_volta,

                  horario_destino_ida: result.ticket.horario_destino_ida,
                  horario_destino_volta: result.ticket.horario_destino_volta,
                  horario_origem_ida: result.ticket.horario_origem_ida,
                  horario_origem_volta: result.ticket.horario_origem_volta,

                  qtd_passageiros: result.ticket.qtd_passageiros,

                  valor_ticket: result.ticket.valor_ticket,
                  status_ticket: result.ticket.status_ticket,
                  observacoes: result.ticket.observacoes
                };

                for (var i = 0; i < parseInt(ticket.qtd_passageiros) - 1; i++) {
                  var _cliente = new Cliente();
                  _cliente.setNome_cliente('');
                  _cliente.setTipo_documento('');
                  _cliente.setDocumento('');
                  _passageiros[i] = _cliente;
                }
                ticket.passageiros = _passageiros;

                break;

            }
            res.json(ticket);
          }
        });
      });
    });
}
