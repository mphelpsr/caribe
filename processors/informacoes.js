var email = require('../config/fct_email.js');
var config = require("../config/cfg_email.json");

module.exports.solicitacao = function(req, callback) {
  var params = req.body;
  var message = 'Nome cliente: ' + params.nome_cliente + '<br/> E-mail cliente: ' + params.email_cliente + '<br/> Mensagem: ' + params.mensagem;
  //email.send(config.mail_info, 'Duvidas - Caribe Nordestino', '', message, 'DUVIDA');
  callback(200);
};

