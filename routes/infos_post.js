var email = require('../config/cfg_email.js');
var config = require("../config/cfg_email.json");
var texts = require('../util/strings.js');
var util = require('../util/funcoes.js');

module.exports = function(app) {

  app.route("/infos/").post(function(req, res) {
    var params = req.body;
    var message = 'Nome cliente: ' + params.nome_cliente + '<br/> E-mail cliente: ' + params.email_cliente + '<br/> Mensagem: ' + params.mensagem;
    email.send(config.mail_info, 'Duvidas - Caribe Nordestino', '', message, 'DUVIDA');
    res.sendStatus(200);

  });

};
