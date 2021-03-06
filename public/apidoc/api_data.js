define({ "api": [
  {
    "type": "get",
    "url": "/cidades",
    "title": "Lista de cidades",
    "group": "eTickets",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Lista de todas as cidades cadastradas</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n[\n    {\n        \"_id\": \"581b530d13085c16489fd843\",\n        \"cidade\": {\n            \"nome\": \"Recife\",\n            \"abreviacao\": \"rec\"\n        }\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "eTickets",
    "name": "GetCidades"
  },
  {
    "type": "get",
    "url": "/tickets",
    "title": "Lista de tickets",
    "group": "eTickets",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Lista de todos os tickets cadastrados</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"_id\": \"57fa6160d862cd1dbeded08f\",\n    \"ticket\": {\n        \"cod_checkin\": \"FWO8ULK1\",\n        \"nome_cliente\": \"Fulano\",\n        \"email_cliente\": \"fulano@gmail.com\",\n        \"contratacao\": \"full\",\n        \"data_check_ida\": \"13-10-2016\",\n        \"origem_ida\": \"Maceio\",\n        \"destino_ida\": \"Maragogi\",\n        \"horario_origem_ida\": \"11:30\",\n        \"horario_destino_ida\": \"13:30\",\n        \"data_check_volta\": \"20-10-2016\",\n        \"origem_volta\": \"Maragogi\",\n        \"destino_volta\": \"Recife\",\n        \"horario_origem_volta\": \"12:35\",\n        \"horario_destino_volta\": \"08:35\",\n        \"qtd_passageiros\": \"2\",\n        \"data_solicitacao\": \"09-10-2016\",\n        \"valor_ticket\": 360,\n        \"status_ticket\": false,\n        \"observacoes\": \"Nada a observar\"\n        }\n  }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "eTickets",
    "name": "GetTickets"
  },
  {
    "type": "get",
    "url": "/tickets/:cod_checkin",
    "title": "Encontra um ticket",
    "group": "eTickets",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Pesquisa e lista um ticket se encontrado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n   {\n     \"_id\": \"57fa6160d862cd1dbeded08f\",\n     \"ticket\": {\n         \"cod_checkin\": \"FWO8ULK1\",\n         \"nome_cliente\": \"Fulano\",\n         \"email_cliente\": \"fulano@gmail.com\",\n         \"contratacao\": \"full\",\n         \"data_check_ida\": \"13-10-2016\",\n         \"origem_ida\": \"Maceio\",\n         \"destino_ida\": \"Maragogi\",\n         \"horario_origem_ida\": \"11:30\",\n         \"horario_destino_ida\": \"13:30\",\n         \"data_check_volta\": \"20-10-2016\",\n         \"origem_volta\": \"Maragogi\",\n         \"destino_volta\": \"Recife\",\n         \"horario_origem_volta\": \"12:35\",\n         \"horario_destino_volta\": \"08:35\",\n         \"qtd_passageiros\": \"2\",\n         \"data_solicitacao\": \"09-10-2016\",\n         \"valor_ticket\": 360,\n         \"status_ticket\": false,\n         \"observacoes\": \"Nada a observar\"\n         }\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "eTickets",
    "name": "GetTicketsCod_checkin"
  },
  {
    "type": "get",
    "url": "/trechos",
    "title": "Lista de trechos",
    "group": "eTickets",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Lista de todos os trechos cadastrados</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n[\n  {\n      \"_id\": \"581b389c3a55c958c86a38af\",\n      \"trecho\": {\n        \"_id\": \"recmgi\",\n        \"valor\": \"190\"\n      }\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "eTickets",
    "name": "GetTrechos"
  },
  {
    "type": "get",
    "url": "/trechos/:origem/:destino",
    "title": "Informacoes do trecho",
    "group": "eTickets",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Retorna as informacoes de um determinado trecho, de acordo com as cidades cadastradas</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"581b389c3a55c958c86a38af\",\n    \"trecho\": {\n        \"_id\": \"recmgi\",\n        \"valor\": \"190\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "eTickets",
    "name": "GetTrechosOrigemDestino"
  },
  {
    "type": "get",
    "url": "/trechos/:origem/:destino/:qtd_passageiros",
    "title": "Calculo do trecho",
    "group": "eTickets",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Retorna o valor de um determinado trecho, de acordo com a quantidade de passageiros informada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n    190\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "eTickets",
    "name": "GetTrechosOrigemDestinoQtd_passageiros"
  },
  {
    "type": "post",
    "url": "/calendario/:data_inicio/:data_fim",
    "title": "Lista de eventos",
    "group": "eTickets",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Cadastra uma cidade</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n[\n    {\n        \"kind\": \"calendar#event\",\n        \"etag\": \"\\\"2945569021912000\\\"\",\n        \"id\": \"n7fiitlpth16k67cs18bs6ucf8\",\n        \"status\": \"confirmed\",\n        \"htmlLink\": \"https://www.google.com/calendar/event?eid=bjdmaWl0bHB0aDE2azY3Y3MxOGJzNnVjZjggb3Judjk0ZTV1Y21sbXJ2YXM4dHZudmllY2NAZw\",\n        \"created\": \"2016-08-26T13:45:12.000Z\",\n        \"updated\": \"2016-09-02T02:48:30.956Z\",\n        \"summary\": \"ORDEM DE SERVIÇO CARIBÉ NORDESTINO - CHEGADA \",\n        \"description\": \"Recife  aeroporto \",\n        \"location\": \"Adriano \",\n        \"creator\": {\n        \"email\": \"joseivaldodeoliveira@gmail.com\",\n        \"displayName\": \"Jose Ivaldo de Oliveira\"\n        },\n        \"organizer\": {\n        \"email\": \"ornv94e5ucmlmrvas8tvnviecc@group.calendar.google.com\",\n        \"displayName\": \"CARIBE NORDESTINO Viagens & Turismo\",\n        \"self\": true\n        },\n        \"start\": {\n        \"dateTime\": \"2016-09-01T06:00:00+01:00\"\n        },\n        \"end\": {\n        \"dateTime\": \"2016-09-01T07:00:00+01:00\"\n        },\n        \"transparency\": \"transparent\",\n        \"iCalUID\": \"n7fiitlpth16k67cs18bs6ucf8@google.com\",\n        \"sequence\": 1,\n        \"reminders\": {\n        \"useDefault\": true\n        }\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "eTickets",
    "name": "PostCalendarioData_inicioData_fim"
  },
  {
    "type": "post",
    "url": "/cidades",
    "title": "Criacao de cidades",
    "group": "eTickets",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Cadastra uma cidade</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n    \"nome_cidade\": \"Sao M dos Milagres\",\n    \"abreviacao\": \"smm\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "eTickets",
    "name": "PostCidades"
  },
  {
    "type": "post",
    "url": "/infos",
    "title": "Envio de e-mail",
    "group": "eTickets",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Envia um e-mail para informacoes</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n    \"nome_cliente\":\"Teste\",\n    \"email_cliente\":\"marcelo@caribenordestino.com.br\",\n    \"mensagem\": \"Lorem ipsun\" \n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "eTickets",
    "name": "PostInfos"
  },
  {
    "type": "post",
    "url": "/tickets",
    "title": "Criacao de ticket",
    "group": "eTickets",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Cadastro de tickes</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n    \"nome_cliente\":\"Teste\",\n    \"email_cliente\":\"marcelo@caribenordestino.com.br\",\n    \n    \"contratacao\":\"ida\",\n\n    \"data_check\":\"22-12-2016\",\n    \"origem\":\"rec\",\n    \"destino\":\"mgi\",\n\n    \"qtd_passageiros\":3,\n    \"observacoes\":\"\"\n}",
          "type": "json"
        },
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n    \"nome_cliente\":\"Teste\",\n    \"email_cliente\":\"marcelo@caribenordestino.com.br\",\n    \n    \"contratacao\":\"volta\",\n    \n    \"data_check_ida\":\"22-12-2016\",\n    \"origem_ida\":\"mcz\",\n    \"destino_ida\":\"smm\",\n    \n    \"data_check_volta\":\"22-12-2016\",\n    \"origem_volta\":\"smm\",\n    \"destino_volta\":\"mcz\",\n    \n    \"qtd_passageiros\":3,\n    \"observacoes\":\"\"   \n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "eTickets",
    "name": "PostTickets"
  },
  {
    "type": "post",
    "url": "/trechos",
    "title": "Criacao de trechos",
    "group": "eTickets",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Cadastra um trecho de acordo com as cidades cadastradas</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"jparec\",\n    \"valor\": \"230\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "eTickets",
    "name": "PostTrechos"
  }
] });
