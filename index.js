var express = require('express'),
    consign = require('consign'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    methodOverride = require('method-override'),
    expressValidator = require('express-validator');

/* Inicio - Arquivos auxiliares */
var email = require('./config/cfg_email.js');
var config = require("./config/cfg_email.json");
var texts = require('./util/strings.js');
var util = require('./util/funcoes.js');
var moment = require('moment');
var bd = require('./config/db_mongo.js');
var Cliente = require('./models/Cliente.js')();
var valida_ida = require('./validation/validation_ticket_ida.js');
var valida_full = require('./validation/validation_ticket_full.js');
var tickets = require('./processors/lista_tickets.js');
var ida = require('./processors/ida.js');
var ida_volta = require('./processors/ida_volta.js');

/* Fim - Arquivos auxiliares */

var port = 21087;
var application_root = __dirname;
var app = express();

app.use(express.static(application_root));
app.use(cookieParser('caribe_tickets'));
app.use(expressSession({
    secret: 'caribe_kinghost',
    resave: true,
    saveUninitialized: true
}));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressValidator());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

consign()
  .include('config')
  .then('routes')
  .into(app);

/* Inicio rotas */
app.route("/infos/").post(function(req, res) {
  var params = req.body;
  var message = 'Nome cliente: ' + params.nome_cliente + '<br/> E-mail cliente: ' + params.email_cliente + '<br/> Mensagem: ' + params.mensagem;
  email.send(config.mail_info, 'Duvidas - Caribe Nordestino', '', message, 'DUVIDA');
  res.sendStatus(200);

});

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

    tickets.lista_um(req.params.cod_checkin, function(err, result) {
      if (err) {
        res.sendStatus(result);
      }
      res.json(result);
    });

  });

  // Criação de tickets - IDA ou VOLTA
  app.route("/tickets").post(function(req, res) {

    var contratacao = req.body.rd_trecho == 'volta' ? contratacao = 'full' : contratacao = 'ida';

    switch (contratacao) {
      case 'ida':

        ida.orcamento(req, res, function(err, result) {
          if (err) {
            res.sendStatus(result);
          }
          res.sendStatus(result);
        });

        break;

      case 'full':

        ida_volta.orcamento(req, res, function(err, result) {
          if (err) {
            res.sendStatus(result);
          }
          res.sendStatus(result);
        });

        break;
    }

  });

/* Fim rotas */

app.listen(port, function() {
    console.log('Caribe no ar. Porta: ' + port);
});
