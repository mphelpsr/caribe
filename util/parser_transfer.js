var util = require('../util/funcoes.js');

module.exports.tratamento = function(req, callback){

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

}
