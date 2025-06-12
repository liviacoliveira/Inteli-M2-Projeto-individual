# Ponderada de Programação - Projeto Individual - M2

Este projeto é referente a ponderada do módulo 2 de programação do professor Cristiano Benites referente a banco de dados relacional e sua modelagem.

## Sistema escolhido

Este projeto é uma plataforma de eventos online, desenvolvida com Node.js e Express.js, estruturada no padrão MVC.
Seu objetivo é facilitar a divulgação, organização e participação em eventos, sejam eles presenciais ou virtuais.

A plataforma permite que usuários se cadastrem, visualizem a lista de eventos disponíveis e se inscrevam naqueles de seu interesse.

Esta aplicação é a base inicial da plataforma e será expandida nas próximas etapas com funcionalidades como autenticação, banco de dados integrado e interface mais elaborada.

## Requisitos

- Node.js (versão 22.15.0)

Estrutura de pastas e arquivos
-----------------------

````
readme.md
node_modules
.gitignore             # Arquivo para ignorar arquivos no Git
.env           
jest.config.js         # Arquivo de configuração do Jest
package-lock.json      # Gerenciador de dependências do Node.js
package.json           # Gerenciador de dependências do Node.js
readme.md              # Documentação do projeto (Markdown)
server.js              # Arquivo principal que inicializa o servidor
rest.http              # Teste de endpoints 
meu-projeto/
│
├── documentos              
│   └── wad.md
├── config/                # Arquivos de configuração (ex: conexão com banco)
│   └── database.js
├── controllers/           # Lógica de controle das requisições
│   └── CategoriaController.js
│   └── ComentarioController.js
│   └── EventoController.js
│   └── InscricaoController.js
│   └── UsuarioController.js
├── models/                # Definição de modelos de dados (estrutura do banco)
│   └── UserModel.js
├── routes/                # Definição das rotas do sistema
│   └── index.js
│   └── views.js
├── services/              # Serviços auxiliares do sistema
│   └── userService.js
├── assets/                # Arquivos públicos como imagens e fontes
│   └── favicon.ico
│   └── modelo-banco.png
├── scripts/               # Arquivos de JavaScript públicos
│   └── modelo-fisico.sql
├── views/
│   └── components/
│   └── layout/
│       └── main.ejs
│   └── pages/
│       └── form-evento.ejs
│       └── index.ejs
├── public/
│   └── css/
│       └── style.css
````

## Como executar o projeto localmente

1. **Clonar o repositório:**

   ````
   git clone https://github.com/liviacoliveira/Inteli-M2-Projeto-individual.git
   cd Inteli-M2-Projeto-individual
   ````

2. **Instalar as dependências:**

````
 npm install express dotenv pg
 ````

3. **Inicie o servidor:**

````
 node server.js 
 ````
