var texts = require('./strings.js');
var bd = require('../config/fct_mongo.js');
var config = require("../config/cfg_mongo.json");
var async = require('async');

/* Geracao codigo aleatorio */
module.exports.gerar_string_alfanumerica = function(tam) {
  var caracteres = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  var gerar_string_alfanumerica = "";
  for (var i = 0; i < tam; i++) {
    var valor_aleatorio = Math.floor(Math.random() * caracteres.length);
    gerar_string_alfanumerica += caracteres.substring(valor_aleatorio, valor_aleatorio + 1);
  }
  return gerar_string_alfanumerica.toUpperCase();
};

module.exports.calc_valores = function(origem, destino, qtd_passageiros) {
  var passageiros = parseInt(qtd_passageiros);
  origem = origem.toUpperCase();
  destino = destino.toUpperCase();

  switch (origem) {
    case 'RECIFE':
      switch (destino) {
        case 'MARAGOGI':
          if (passageiros == 1 || passageiros == 2) {
            return 190.00;
          } else if (passageiros == 3) {
            return 210.00;
          } else {
            return 230.00;
          }

        case 'SAO M DOS MILAGRES':
          if (passageiros == 1 || passageiros == 2) {
            return 330.00;
          } else if (passageiros == 3) {
            return 350.00;
          } else {
            return 380.00;
          }

        case 'PORTO DE GALINHAS':
          if (passageiros == 1 || passageiros == 2) {
            return 180.00;
          } else if (passageiros == 3) {
            return 200.00;
          } else {
            return 220.00;
          }

        case 'JAPARATINGA':
          if (passageiros == 1 || passageiros == 2) {
            return 230.00;
          } else if (passageiros == 3) {
            return 250.00;
          } else {
            return 280.00;
          }

        case 'MACEIO':
          if (passageiros == 1 || passageiros == 2) {
            return 360.00;
          } else if (passageiros == 3) {
            return 380.00;
          } else {
            return 400.00;
          }

      }
      break;

    case 'MACEIO':
      switch (destino) {
        case 'MARAGOGI':
          if (passageiros == 1 || passageiros == 2) {
            return 190.00;
          } else if (passageiros == 3) {
            return 210.00;
          } else {
            return 230.00;
          }

        case 'SAO M DOS MILAGRES':
          if (passageiros == 1 || passageiros == 2) {
            return 200.00;
          } else if (passageiros == 3) {
            return 220.00;
          } else {
            return 240.00;
          }

        case 'PORTO DE GALINHAS':
          if (passageiros == 1 || passageiros == 2) {
            return 330.00;
          } else if (passageiros == 3) {
            return 350.00;
          } else {
            return 370.00;
          }

        case 'JAPARATINGA':
          if (passageiros == 1 || passageiros == 2) {
            return 180.00;
          } else if (passageiros == 3) {
            return 200.00;
          } else {
            return 220.00;
          }

        case 'RECIFE':
          if (passageiros == 1 || passageiros == 2) {
            return 360.00;
          } else if (passageiros == 3) {
            return 380.00;
          } else {
            return 400.00;
          }

      }
      break;

    case 'MARAGOGI':
      switch (destino) {
        case 'RECIFE':
          if (passageiros == 1 || passageiros == 2) {
            return 190.00;
          } else if (passageiros == 3) {
            return 210.00;
          } else {
            return 230.00;
          }

        case 'SAO M DOS MILAGRES':
          if (passageiros == 1 || passageiros == 2) {
            return 160.00;
          } else if (passageiros == 3) {
            return 180.00;
          } else {
            return 200.00;
          }

        case 'PORTO DE GALINHAS':
          if (passageiros == 1 || passageiros == 2) {
            return 150.00;
          } else if (passageiros == 3) {
            return 170.00;
          } else {
            return 190.00;
          }

        case 'JAPARATINGA':
          if (passageiros == 1 || passageiros == 2) {
            return 50.00;
          } else if (passageiros == 3) {
            return 70.00;
          } else {
            return 90.00;
          }

        case 'MACEIO':
          if (passageiros == 1 || passageiros == 2) {
            return 190.00;
          } else if (passageiros == 3) {
            return 210.00;
          } else {
            return 230.00;
          }

      }
      break;

    case 'SAO M DOS MILAGRES':
      switch (destino) {
        case 'MARAGOGI':
          if (passageiros == 1 || passageiros == 2) {
            return 160.00;
          } else if (passageiros == 3) {
            return 180.00;
          } else {
            return 200.00;
          }

        case 'RECIFE':
          if (passageiros == 1 || passageiros == 2) {
            return 330.00;
          } else if (passageiros == 3) {
            return 350.00;
          } else {
            return 370.00;
          }

        case 'PORTO DE GALINHAS':
          if (passageiros == 1 || passageiros == 2) {
            return 230.00;
          } else if (passageiros == 3) {
            return 250.00;
          } else {
            return 270.00;
          }

        case 'JAPARATINGA':
          if (passageiros == 1 || passageiros == 2) {
            return 150.00;
          } else if (passageiros == 3) {
            return 170.00;
          } else {
            return 1.00;
          }

        case 'MACEIO':
          if (passageiros == 1 || passageiros == 2) {
            return 200.00;
          } else if (passageiros == 3) {
            return 220.00;
          } else {
            return 240.00;
          }

      }
      break;

    case 'PORTO DE GALINHAS':
      switch (destino) {
        case 'MARAGOGI':
          if (passageiros == 1 || passageiros == 2) {
            return 150.00;
          } else if (passageiros == 3) {
            return 170.00;
          } else {
            return 190.00;
          }

        case 'SAO M DOS MILAGRES':
          if (passageiros == 1 || passageiros == 2) {
            return 230.00;
          } else if (passageiros == 3) {
            return 250.00;
          } else {
            return 270.00;
          }

        case 'RECIFE':
          if (passageiros == 1 || passageiros == 2) {
            return 180.00;
          } else if (passageiros == 3) {
            return 200.00;
          } else {
            return 220.00;
          }

        case 'JAPARATINGA':
          if (passageiros == 1 || passageiros == 2) {
            return 180.00;
          } else if (passageiros == 3) {
            return 200.00;
          } else {
            return 220.00;
          }

        case 'MACEIO':
          if (passageiros == 1 || passageiros == 2) {
            return 330.00;
          } else if (passageiros == 3) {
            return 350.00;
          } else {
            return 370.00;
          }

      }
      break;

    case 'JAPARATINGA':
      switch (destino) {
        case 'MARAGOGI':
          if (passageiros == 1 || passageiros == 2) {
            return 50.00;
          } else if (passageiros == 3) {
            return 70.00;
          } else {
            return 90.00;
          }

        case 'SAO M DOS MILAGRES':
          if (passageiros == 1 || passageiros == 2) {
            return 150.00;
          } else if (passageiros == 3) {
            return 170.00;
          } else {
            return 190.00;
          }

        case 'PORTO DE GALINHAS':
          if (passageiros == 1 || passageiros == 2) {
            return 180.00;
          } else if (passageiros == 3) {
            return 200.00;
          } else {
            return 220.00;
          }

        case 'RECIFE':
          if (passageiros == 1 || passageiros == 2) {
            return 230.00;
          } else if (passageiros == 3) {
            return 250.00;
          } else {
            return 270.00;
          }

        case 'MACEIO':
          if (passageiros == 1 || passageiros == 2) {
            return 180.00;
          } else if (passageiros == 3) {
            return 200.00;
          } else {
            return 220.00;
          }

      }
      break;

  }

};

/* Calculo de horas*/
function timeInHours(str) {
  var sp = str.split(":");
  return sp[0] + sp[1] / 60;
}

function hoursToString(h) {
  var hours = Math.floor(h);
  var minutes = (h - hours) * 60;

  return hours + ":" + minutes;
}

function somaHora(hrA, hrB, zerarHora) {
  if (hrA.length != 5 || hrB.length != 5) return "00:00";

  var temp = 0,
    nova_h = 0,
    novo_m = 0;

  hora1 = hrA.substr(0, 2) * 1;
  hora2 = hrB.substr(0, 2) * 1;
  minu1 = hrA.substr(3, 2) * 1;
  minu2 = hrB.substr(3, 2) * 1;

  temp = minu1 + minu2;
  while (temp > 59) {
    nova_h++;
    temp = temp - 60;
  }
  novo_m = temp.toString().length == 2 ? temp : ("0" + temp);

  temp = hora1 + hora2 + nova_h;
  while (temp > 23 && zerarHora) {
    temp = temp - 24;
  }
  nova_h = temp.toString().length == 2 ? temp : ("0" + temp);

  return nova_h + ':' + novo_m;
}

function subtraiHora(hrA, hrB) {
  if (hrA.length != 5 || hrB.length != 5) return "00:00";

  temp = 0;
  nova_h = 0;
  novo_m = 0;

  hora1 = hrA.substr(0, 2) * 1;
  hora2 = hrB.substr(0, 2) * 1;
  minu1 = hrA.substr(3, 2) * 1;
  minu2 = hrB.substr(3, 2) * 1;

  temp = minu1 - minu2;
  while (temp < 0) {
    nova_h++;
    temp = temp + 60;
  }
  novo_m = temp.toString().length == 2 ? temp : ("0" + temp);

  temp = hora1 - hora2 - nova_h;
  while (temp < 0) {
    temp = temp + 24;
  }
  nova_h = temp.toString().length == 2 ? temp : ("0" + temp);

  return nova_h + ':' + novo_m;
}

module.exports.tempo_transfer = function(horaInicio, origem, destino) {
  var _total = 0;


  switch (origem) {
    case 'RECIFE':
      switch (destino) {
        case 'MARAGOGI':
          var _total = somaHora(horaInicio, '02:00', true);
          return _total;
          break;

        case 'SAO M DOS MILAGRES':
          var _total = somaHora(horaInicio, '02:00', true);
          return _total;
          break;

        case 'JAPARATINGA':
          var _total = somaHora(horaInicio, '02:00', true);
          return _total;
          break;

        default:
          var _total = somaHora(horaInicio, '02:00', true);
          return _total;
          break;

      }
      break;

    case 'MACEIO':
      switch (destino) {
        case 'MARAGOGI':
          var _total = somaHora(horaInicio, '02:00', true);
          return _total;
          break;

        case 'SAO M DOS MILAGRES':
          var _total = somaHora(horaInicio, '02:00', true);
          return _total;
          break;

        case 'JAPARATINGA':
          var _total = somaHora(horaInicio, '02:00', true);
          return _total;
          break;

        default:
          var _total = somaHora(horaInicio, '02:00', true);
          return _total;
          break;

      }
      break;

    case 'MARAGOGI':
      switch (destino) {
        case 'RECIFE':
          var _total = subtraiHora(horaInicio, '04:00');
          return _total;
          break;

        case 'MACEIO':
          var _total = somaHora(horaInicio, '04:00');
          return _total;
          break;

        case 'JAPARATINGA':
          var _total = somaHora(horaInicio, '02:00', true);
          return _total;
          break;

        default:
          var _total = somaHora(horaInicio, '02:00', true);
          return _total;
          break;

      }
      break;

  }
  return _total;
}

module.exports.trecho_cotacao = function(origem, destino) {
  //Definicao abreviacao trecho
  var trecho = '';

  if (origem == 'recife' || destino == 'recife') {
    trecho += 'rec'
  }

  if (origem == 'maragogi' || destino == 'maragogi') {
    trecho += 'mgi'
  }

  return trecho;
}

module.exports.calcula_valores = function(origem, destino, passageiros, callback) {

  bd.searchTransfers(config.db_collection_trechos, origem, destino, function(err, result) {
    if (err) {
      callback(err, 500);

    } else if (result) {

      if (passageiros == 3) {
        result += 20;

      } else if(passageiros == 4) {
        result += 40;
      }

      callback(null, result);

    } else {
      callback(null, 0); // TODO: tratar erro
    }

  });

};
