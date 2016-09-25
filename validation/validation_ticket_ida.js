module.exports.ok = function(data, req, res, callback) {

    if (req.headers.version == 'mock') {
        //console.log('::::: Utilizando mock :::::');
        req.body = require('../mocks/ticket_ida.json')
    } else {
        //console.log(':::::::::: Sem mock ::::::::::');
        req.body = data;
    }

    req.assert("nome_cliente", "Nome obrigatorio.").notEmpty();
    req.assert("email_cliente", "Email nao informado.").notEmpty();
    req.assert("origem", "Origem nao informado.").notEmpty();
    req.assert("destino", "Destino nao informado.").notEmpty();
    req.assert("qtd_passageiros", "Quantidade de passageiros nao informado.").notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        console.log("LOG VALIDACAO: " + JSON.stringify(errors) + " Ticket: " + JSON.stringify(req.body));
        callback(errors, null);
        //Inicio sucesso
    } else {
        callback(null, true);
    }

};
