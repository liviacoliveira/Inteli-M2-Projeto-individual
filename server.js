// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./meu-projeto/routes'); 
const viewRoutes = require('./meu-projeto/routes/views.js');
const path = require('path');
const app = express();
const port = 3000;

// Configura EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'meu-projeto', 'views')); // ajuste se necessário

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'meu-projeto', 'public')));

// Usa TODAS as rotas do index.js
app.use('/api', routes);
app.use('/', viewRoutes);     // rotas de visualização EJS

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
