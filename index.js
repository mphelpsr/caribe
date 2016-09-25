var express = require('express'),
    load = require('express-load'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    methodOverride = require('method-override'),
    expressValidator = require('express-validator');

port = 8080;

var app = express();
app.use(cookieParser('caribe_tickets'));
app.use(expressSession({
    secret: 'caribenordestino',
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


load('config')
    .then('routes')
    .into(app);

app.listen(port, function() {
    console.log('Caribe no ar. Porta: ' + port);
});
