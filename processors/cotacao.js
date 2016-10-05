var bd = require('../config/db_mongo.js');
var texts = require('../util/strings.js');

module.exports.solicita_cotacao = function(ticket, callback){
  var html_cotacao = texts.cotacao(ticket);
  //Inicio - Cotacao simples
  if(ticket.data_check == ''){
    var html_cotacao_info = texts.cotacao_informativa(ticket);
    if (ticket.observacoes!='') {
      var _txt = 'Cliente: ' + ticket.nome_cliente + ' - E-mail: ' + ticket.email_cliente;
      _txt += '<p/>' + ticket.observacoes;
      email.send('info@caribenordestino.com.br', 'Observacao - ' + texts.sub_cotacao, '', _txt, cod_check);
    }
    email.send(ticket.email_cliente, texts.sub_cotacao, '', html_cotacao_info, 'INFORMATIVA-COD_CHECK:' + cod_check);
    res.sendStatus(200);
  //Fim - Cotacao simples
  //Inicio - Cotacao completa
  }else{
    //E-mail para consultores
    if (ticket.observacoes!='') {
      var _txt = 'Cliente: ' + ticket.nome_cliente + ' - E-mail: ' + ticket.email_cliente;
      _txt += '<p/>' + ticket.observacoes;
      email.send('info@caribenordestino.com.br', 'Observacao - ' + texts.sub_cotacao, '', _txt, cod_check);
    }
    email.send(ticket.email_cliente, texts.sub_cotacao, '', html_cotacao, cod_check);
    res.sendStatus(200);
  }
  //Fim - Cotacao completa

  bd.insertDocument(ticket, function(result){
    console.log("::: result: " + result);
  });

};
