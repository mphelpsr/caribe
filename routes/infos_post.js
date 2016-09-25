var email = require('../util/email.js');
var texts = require('../util/strings.js');
var util = require('../util/funcoes.js');

module.exports = function(app) {

  // Lista todos os tickets
  app.route("/infos/").post(function(req, res) {
    var params = req.body;
    var message = 'Nome cliente: ' + params.nome_cliente + '<br/> E-mail cliente: ' + params.email_cliente + '<br/> Mensagem: ' + params.mensagem;
    email.send('info@caribenordestino.com.br', 'Duvidas - Caribe Nordestino', '', message, 'DUVIDA');
    res.sendStatus(200);

  });

};
