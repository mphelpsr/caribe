var calendario = require('../processors/lista_eventos.js');

module.exports.executa = function(callback) {

    calendario.lista_todos(function(err, result) {
        if (err) {
            callback(result);
        }
        callback(result);
    });
};