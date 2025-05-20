// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./meu-projeto/routes'); // único import necessário

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Usa TODAS as rotas do index.js
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
