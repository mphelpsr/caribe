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
var controller_trechos_cidade_get = require('./controllers/controller_trechos--cidade_get.js');
var controller_trechos_post = require('./controllers/controller_trechos_post.js');
var controller_cidades_post = require('./controllers/controller_cidades_post.js');
var controller_cidades_get = require('./controllers/controller_cidades_get.js');
var controller_calendario_get = require('./controllers/controller_calendario_get.js');

/* Fim - Controladores */


var port = 21087;
var application_root = __dirname;
var app = express();

app.use(express.static("public"));
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
    .get(function(req, res) {
        res.json(res.status);
    });

/**
 * @api {get} /cidades Lista de cidades
 * @apiGroup eTickets
 *
 * @apiSuccess {String} status Lista de todas as cidades cadastradas
 * 
 * @apiSuccessExample {json} Sucesso
    HTTP/1.1 200 OK
    [
        {
            "_id": "581b530d13085c16489fd843",
            "cidade": {
                "nome": "Recife",
                "abreviacao": "rec"
            }
        }
    ]
 *
 */
app.route("/cidades/")
    .get(function(req, res) {
        controller_cidades_get.executa(function(result) {
            res.json(result);
        });
    });

/**
 * @api {get} /trechos Lista de trechos
 * @apiGroup eTickets
 *
 * @apiSuccess {String} status Lista de todos os trechos cadastrados
 * 
 * @apiSuccessExample {json} Sucesso
    HTTP/1.1 200 OK
    [
      {
          "_id": "581b389c3a55c958c86a38af",
          "trecho": {
            "_id": "recmgi",
            "valor": "190"
          }
        }
    ]
 *
 */
app.route("/trechos/")
    .get(function(req, res) {
        controller_trechos_get.executa(function(result) {
            res.json(result);
        });
    });

/**
 * @api {get} /trechos/:origem/:destino Informacoes do trecho
 * @apiGroup eTickets
 *
 * @apiSuccess {String} status Retorna as informacoes de um determinado trecho, de acordo com as cidades cadastradas
 * 
 * @apiSuccessExample {json} Sucesso
        HTTP/1.1 200 OK
        {
            "_id": "581b389c3a55c958c86a38af",
            "trecho": {
                "_id": "recmgi",
                "valor": "190"
            }
        }
 *
 */
app.route("/trechos/:origem/:destino")
    .get(function(req, res) {
        controller_trechos_cidade_get.executa(req, function(result) {
            res.json(result);
        });
    });

/**
 * @api {get} /trechos/:origem/:destino/:qtd_passageiros Calculo do trecho
 * @apiGroup eTickets
 *
 * @apiSuccess {String} status Retorna o valor de um determinado trecho, de acordo com a quantidade de passageiros informada
 * 
 * @apiSuccessExample {json} Sucesso
        HTTP/1.1 200 OK
        {
            190
        }
 *
 */
app.route("/trechos/:origem/:destino/:qtd_passageiros")
    .get(function(req, res) {
        controller_trechos_calculo_valor_get.executa(req, function(result) {
            res.json(result);
        });
    });

/**
 * @api {get} /tickets Lista de tickets
 * @apiGroup eTickets
 *
 * @apiSuccess {String} status Lista de todos os tickets cadastrados
 * 
 * @apiSuccessExample {json} Sucesso
    HTTP/1.1 200 OK
    [
      {
        "_id": "57fa6160d862cd1dbeded08f",
        "ticket": {
            "cod_checkin": "FWO8ULK1",
            "nome_cliente": "Fulano",
            "email_cliente": "fulano@gmail.com",
            "contratacao": "full",
            "data_check_ida": "13-10-2016",
            "origem_ida": "Maceio",
            "destino_ida": "Maragogi",
            "horario_origem_ida": "11:30",
            "horario_destino_ida": "13:30",
            "data_check_volta": "20-10-2016",
            "origem_volta": "Maragogi",
            "destino_volta": "Recife",
            "horario_origem_volta": "12:35",
            "horario_destino_volta": "08:35",
            "qtd_passageiros": "2",
            "data_solicitacao": "09-10-2016",
            "valor_ticket": 360,
            "status_ticket": false,
            "observacoes": "Nada a observar"
            }
      }
    ]
 *
 */
app.route("/tickets/")
    .get(function(req, res) {
        controller_tickets_get.executa(function(result) {
            res.json(result);
        });
    });

/**
 * @api {get} /tickets/:cod_checkin Encontra um ticket
 * @apiGroup eTickets
 *
 * @apiSuccess {String} status Pesquisa e lista um ticket se encontrado
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
      {
        "_id": "57fa6160d862cd1dbeded08f",
        "ticket": {
            "cod_checkin": "FWO8ULK1",
            "nome_cliente": "Fulano",
            "email_cliente": "fulano@gmail.com",
            "contratacao": "full",
            "data_check_ida": "13-10-2016",
            "origem_ida": "Maceio",
            "destino_ida": "Maragogi",
            "horario_origem_ida": "11:30",
            "horario_destino_ida": "13:30",
            "data_check_volta": "20-10-2016",
            "origem_volta": "Maragogi",
            "destino_volta": "Recife",
            "horario_origem_volta": "12:35",
            "horario_destino_volta": "08:35",
            "qtd_passageiros": "2",
            "data_solicitacao": "09-10-2016",
            "valor_ticket": 360,
            "status_ticket": false,
            "observacoes": "Nada a observar"
            }
      }
 *
 */
app.route("/tickets/:cod_checkin")
    .get(function(req, res) {
        controller_tickets_get_cod_checkin.executa(req, function(result) {
            res.json(result);
        });
    });

/**
 * @api {post} /tickets Criacao de ticket
 * @apiGroup eTickets
 *
 * @apiSuccess {String} status Cadastro de tickes
 * 
 * @apiSuccessExample {json} Sucesso
        HTTP/1.1 200 OK
        {
            "nome_cliente":"Teste",
            "email_cliente":"marcelo@caribenordestino.com.br",
            
            "contratacao":"ida",

            "data_check":"22-12-2016",
            "origem":"rec",
            "destino":"mgi",

            "qtd_passageiros":3,
            "observacoes":""
        }

 * 
 * @apiSuccessExample {json} Sucesso
        HTTP/1.1 200 OK
        {
            "nome_cliente":"Teste",
            "email_cliente":"marcelo@caribenordestino.com.br",
            
            "contratacao":"volta",
            
            "data_check_ida":"22-12-2016",
            "origem_ida":"mcz",
            "destino_ida":"smm",
            
            "data_check_volta":"22-12-2016",
            "origem_volta":"smm",
            "destino_volta":"mcz",
            
            "qtd_passageiros":3,
            "observacoes":""   
        }
        
 *
 */
app.route("/tickets")
    .post(function(req, res) {
        controller_tickets_post.executa(req, function(result) {
            res.sendStatus(result);
        });
    });

/**
 * @api {post} /infos Envio de e-mail
 * @apiGroup eTickets
 *
 * @apiSuccess {String} status Envia um e-mail para informacoes
 * 
 * @apiSuccessExample {json} Sucesso
        HTTP/1.1 200 OK
        {
            "nome_cliente":"Teste",
            "email_cliente":"marcelo@caribenordestino.com.br",
            "mensagem": "Lorem ipsun" 
        }
 *
 */
app.route("/infos/")
    .post(function(req, res) {
        controller_infos_post.executa(req, function(result) {
            res.json(result);
        });
    });

/**
 * @api {post} /trechos Criacao de trechos
 * @apiGroup eTickets
 *
 * @apiSuccess {String} status Cadastra um trecho de acordo com as cidades cadastradas
 * 
 * @apiSuccessExample {json} Sucesso
        HTTP/1.1 200 OK
        {
            "_id": "jparec",
            "valor": "230"
        }
 *
 */
app.route("/trechos/")
    .post(function(req, res) {
        controller_trechos_post.executa(req, function(result) {
            res.json(result);
        });
    });

/**
 * @api {post} /cidades Criacao de cidades
 * @apiGroup eTickets
 *
 * @apiSuccess {String} status Cadastra uma cidade
 * 
 * @apiSuccessExample {json} Sucesso
        HTTP/1.1 200 OK
        {
            "nome_cidade": "Sao M dos Milagres",
            "abreviacao": "smm"
        }
 *
 */
app.route("/cidades/")
    .post(function(req, res) {
        controller_cidades_post.executa(req, function(result) {
            res.json(result);
        });
    });

/**
 * @api {post} /calendario/:data_inicio/:data_fim Lista de eventos
 * @apiGroup eTickets
 *
 * @apiSuccess {String} status Lista os eventos da agenda
 * 
 * @apiSuccessExample {json} Sucesso
        HTTP/1.1 200 OK
        [
            {
                "kind": "calendar#event",
                "etag": "\"2945569021912000\"",
                "id": "n7fiitlpth16k67cs18bs6ucf8",
                "status": "confirmed",
                "htmlLink": "https://www.google.com/calendar/event?eid=bjdmaWl0bHB0aDE2azY3Y3MxOGJzNnVjZjggb3Judjk0ZTV1Y21sbXJ2YXM4dHZudmllY2NAZw",
                "created": "2016-08-26T13:45:12.000Z",
                "updated": "2016-09-02T02:48:30.956Z",
                "summary": "ORDEM DE SERVIÇO CARIBÉ NORDESTINO - CHEGADA ",
                "description": "Recife  aeroporto ",
                "location": "Adriano ",
                "creator": {
                "email": "joseivaldodeoliveira@gmail.com",
                "displayName": "Jose Ivaldo de Oliveira"
                },
                "organizer": {
                "email": "ornv94e5ucmlmrvas8tvnviecc@group.calendar.google.com",
                "displayName": "CARIBE NORDESTINO Viagens & Turismo",
                "self": true
                },
                "start": {
                "dateTime": "2016-09-01T06:00:00+01:00"
                },
                "end": {
                "dateTime": "2016-09-01T07:00:00+01:00"
                },
                "transparency": "transparent",
                "iCalUID": "n7fiitlpth16k67cs18bs6ucf8@google.com",
                "sequence": 1,
                "reminders": {
                "useDefault": true
                }
            }
        ]
 *
 */
app.route("/calendario/:data_inicio/:data_fim")
    .post(function(req, res) {
        controller_calendario_get.executa(req, res, function(result) {
            res.json(result);
        });
    });

/* Fim rotas */

app.listen(port, function() {
    console.log('Caribe no ar. Porta: ' + port);
});