var calendario = require('../processors/lista_eventos.js');

module.exports.executa = function(req, res, callback) {

    calendario.lista_todos(req, res, function(err, result) {
        if (err) {
            callback(result);
        }
        callback(result);
    });
};