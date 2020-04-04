# VUE Simple Admin Theme

Projeto criado com [Vue CLI](https://cli.vuejs.org/guide/) versão 4.2.3. O Objetivo desse projeto é servir como base de estudo e/ou exemplo de um app codificado com [Vue JS](https://vuejs.org).

Como backend, foi usado [Simple Backend Node](https://github.com/silasstoffel/simple-node-backend-1) codificado em [Node](https://github.com/nodejs/node).

O projeto tem funções básicas como:

- Autenticação
- Autorização
- Criar contra
- Alterar Conta

## Configuração

Copie `./public/app.settings.exemple.json` e renomeie para `./public/app.settings.json`, abra o arquivo `./public/app.settings.json` e configure endereço do backend:

`{"api_url": "http://localhost:3000"}`

Por fim, execute o `yarn` na raiz do projeto para baixar às dependências

## Executando o app

Para compilar para ambiente de dev ou produção use vue cli.

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
