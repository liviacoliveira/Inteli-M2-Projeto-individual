const express = require('express');
const router = express.Router();
const db = require('../config/database'); // ajuste conforme sua estrutura

router.get('/', async (req, res) => {
  try {
    const [eventos, usuarios, inscricoes, categorias] = await Promise.all([
      db.query(`
        SELECT eventos.*, usuarios.nome AS nome_usuario, categorias.nome AS nome_categoria
        FROM eventos
        LEFT JOIN usuarios ON eventos.id_usuario = usuarios.id
        LEFT JOIN categorias ON eventos.id_categoria = categorias.id
      `),
      db.query('SELECT * FROM usuarios'),
      db.query(`
        SELECT inscricoes.*, 
               usuarios.nome AS nome_usuario, 
               eventos.titulo AS titulo_evento,
               to_char(inscricoes.data_inscricao, 'DD/MM/YYYY HH24:MI:SS') AS data_inscricao_formatada
        FROM inscricoes
        LEFT JOIN usuarios ON inscricoes.id_usuario = usuarios.id
        LEFT JOIN eventos ON inscricoes.id_evento = eventos.id
      `),
      db.query('SELECT * FROM categorias')
    ]);

    res.render('pages/index', { // ajuste 'pages' se seu index.ejs estiver em outra pasta
      eventos: eventos.rows,
      usuarios: usuarios.rows,
      inscricoes: inscricoes.rows,
      categorias: categorias.rows
    });
  } catch (error) {
    console.error('Erro ao carregar a página inicial:', error);
    res.status(500).send('Erro ao carregar a página inicial');
  }
});

module.exports = router;
