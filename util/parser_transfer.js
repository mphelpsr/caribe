var util = require('../util/funcoes.js');
var moment = require('moment');

module.exports.tratamento = function(req, callback){
  var tipo_contratacao = req.body.destino_volta ? tipo_contratacao = 'full' : tipo_contratacao = 'ida';

  if(tipo_contratacao == 'ida'){
    var json = {
      cod_checkin: util.gerar_string_alfanumerica(8),
      nome_cliente: req.body.nome_cliente,
      email_cliente: req.body.email_cliente,
      contratacao: req.body.contratacao,

      data_check: req.body.data_check,
      origem: req.body.origem,
      destino: req.body.destino,
      horario_origem: req.body.horario_origem,
      horario_destino: util.tempo_transfer(req.body.horario_origem, req.body.origem, req.body.qtd_passageiros),
      valor_ticket: util.calc_valores(req.body.origem, req.body.destino, req.body.qtd_passageiros),
      qtd_passageiros: req.body.qtd_passageiros,
      data_solicitacao: moment().format('DD-MM-YYYY'),
      status_ticket: false,
      observacoes: req.body.observacoes
    };

  }else{

    var valor_ticket_ida = util.calc_valores(req.body.origem_ida, req.body.destino_ida, req.body.qtd_passageiros);
    var valor_ticket_volta = util.calc_valores(req.body.origem_volta, req.body.destino_volta, req.body.qtd_passageiros);
    var horario_destino_ida = util.tempo_transfer(req.body.horario_origem, req.body.origem_ida, req.body.destino_ida);
    var horario_destino_volta = util.tempo_transfer(req.body.horario_volta, req.body.origem_volta, req.body.destino_volta);

    var json = {
      cod_checkin: util.gerar_string_alfanumerica(8),
      nome_cliente: req.body.nome_cliente,
      email_cliente: req.body.email_cliente,
      contratacao: req.body.contratacao,

      data_check_ida: req.body.data_check_ida,
      origem_ida: req.body.origem_ida,
      destino_ida: req.body.destino_ida,
      horario_origem_ida: req.body.horario_origem,
      horario_destino_ida: horario_destino_ida,

      data_check_volta: req.body.data_check_volta,
      origem_volta: req.body.origem_volta,
      destino_volta: req.body.destino_volta,
      horario_origem_volta: req.body.horario_volta,
      horario_destino_volta: horario_destino_volta,

      qtd_passageiros: req.body.qtd_passageiros,
      data_solicitacao: moment().format('DD-MM-YYYY'),
      valor_ticket: valor_ticket_ida + valor_ticket_volta,
      status_ticket: false,
      observacoes: req.body.observacoes
    };
  }


  callback(json);

}
