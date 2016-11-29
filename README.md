# Caribe Tickets - Geração de tickets

Sistema de cotações de transfers utilizando Node.js, MongoDB e NodeMailer.

## Instalação e Configuração

A instalação é simples.

No diretório raiz da aplicação, apenas executar o comando de instalação do NPM. Ele baixará todas as dependências do projeto. Vale ressaltar que é necessário ter uma coleção (collection) de dados já configurada e preparar a *string* de conexão para ser inserida no arquivo de configuração do MongoDB.


```
#!nodejs

npm install
```

Todos as bibliotecas necessárias estão listadas no arquivo package.json da aplicação.


```
#!json

"dependencies": {
    "apidoc": "^0.16.1",
    "assert": "^1.4.1",
    "async": "^2.0.1",
    "body-parser": "^1.15.0",
    "cookie-parser": "^1.4.3",
    "errorhandler": "^1.4.3",
    "express": "^4.13.4",
    "express-session": "^1.13.0",
    "express-validator": "~2.20.3",
    "gapitoken": "^0.1.5",
    "google-auth-library": "^0.9.10",
    "googleapis": "^14.2.0",
    "method-override": "^2.3.5",
    "moment": "^2.12.0",
    "mongodb": "^2.2.10",
    "mongojs": "^2.4.0",
    "nodemailer": "^2.4.2"
  }
```