var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
var util = require('util');
var path = require('path');

/* Leitura de LOG */
module.exports.ler_log = function(type, callback) {
  switch (type) {
    case 'info':
      var logFile = path.resolve('./', 'filelog-info.log')
      break;

    case 'error':
      var logFile = path.resolve('./', 'filelog-error.log')
      break;

    default:
      var logFile = path.resolve('./', 'filelog-info.log')
      break;
  }

  var instream = fs.createReadStream(logFile);
  var outstream = new stream;
  var fileStream = readline.createInterface(instream, outstream);
  var lista = [];

  var totalLines = 0

  util.log('Começa a ler', logFile.split('/').pop())

  console.time('reading log file')

  fileStream.on('line', function(linhaDoArquivo) {
    if (!/([e])/i.test(linhaDoArquivo)) {
      return
    }

    console.log(linhaDoArquivo)
    lista.push('{' + linhaDoArquivo + '}');

    totalLines++;
  });

  fileStream.on('close', function() {
    util.log('lines: ', totalLines)
    console.log('- '.repeat(10))

    lista.push('lines: ', totalLines);
    lista.push('- '.repeat(10));
    callback(lista);

    console.timeEnd('reading log file')
  });

};
