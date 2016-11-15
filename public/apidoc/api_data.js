define({ "api": [
  {
    "type": "get",
    "url": "/cidades",
    "title": "Lista de cidades",
    "group": "Caribe_Tickets",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"_id\": \"581b530d13085c16489fd843\",\n     \"cidade\": {\n       \"nome\": \"Recife\",\n       \"abreviacao\": \"rec\"\n     }\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "Caribe_Tickets",
    "name": "GetCidades"
  },
  {
    "type": "get",
    "url": "/trechos",
    "title": "Lista de trechos",
    "group": "Caribe_Tickets",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Lista de todas os trechos cadastrados</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n   {\n       \"_id\": \"581b389c3a55c958c86a38af\",\n       \"trecho\": {\n         \"_id\": \"recmgi\",\n         \"valor\": \"190\"\n       }\n     }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "Caribe_Tickets",
    "name": "GetTrechos"
  }
] });
