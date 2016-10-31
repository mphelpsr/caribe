var express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  expressSession = require('express-session'),
  methodOverride = require('method-override'),
  expressValidator = require('express-validator');


/* Inicio - Controladores */
var controller_tickets_get = require('./controllers/controller_tickets_get.js');
var controller_tickets_post = require('./controllers/controller_tickets_post.js');
var controller_tickets_get_cod_checkin = require('./controllers/controller_tickets--cod-checkin_get.js');
var controller_infos_post = require('./controllers/controller_infos_post.js');
var controller_trechos_get = require('./controllers/controller_trechos_get.js');
var controller_trechos_calculo_valor_get = require('./controllers/controller_trechos_calculo_valor_get.js');
/* Fim - Controladores */

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

/* Inicio rotas */
app.route("/")
  .post(function(req, res) {
    res.json(res.status);
  });

//Listagem de trechos
app.route("/trechos/")
  .get(function(req, res) {
    controller_trechos_get.executa(function(result) {
      res.json(result);
    });
  });

//Calculo dos trechos
app.route("/trechos/:origem/:destino/:qtd_passageiros")
  .get(function(req, res) {
    controller_trechos_calculo_valor_get.executa(req, function(result) {
      res.json(result);
    });
  });

//Envio e-mail de duvidas para consultor
app.route("/infos/")
  .post(function(req, res) {
    controller_infos_post.executa(req, function(result) {
      res.json(result);
    });
  });

// Lista todos os tickets
app.route("/tickets/")
  .get(function(req, res) {
    controller_tickets_get.executa(function(result) {
      res.json(result);
    });
  });

// Encontrar um ticket
app.route("/tickets/:cod_checkin")
  .get(function(req, res) {
    controller_tickets_get_cod_checkin.executa(req, function(result) {
      res.json(result);
    });
  });

// Criação de tickets - IDA ou VOLTA
app.route("/tickets")
  .post(function(req, res) {
    controller_tickets_post.executa(req, function(result) {
      res.sendStatus(result);
    });
  });

/* Fim rotas */

app.listen(port, function() {
  console.log('Caribe no ar. Porta: ' + port);
});
