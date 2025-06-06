const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Página inicial (lista de tudo)
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

    res.render('pages/index', {
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

// Página do formulário para novo evento
router.get('/eventos/novo', async (req, res) => {
  try {
    const [usuarios, categorias] = await Promise.all([
      db.query('SELECT * FROM usuarios'),
      db.query('SELECT * FROM categorias')
    ]);

    res.render('pages/form-evento', {
      usuarios: usuarios.rows,
      categorias: categorias.rows
    });
  } catch (error) {
    console.error('Erro ao carregar o formulário de evento:', error);
    res.status(500).send('Erro ao carregar o formulário');
  }
});

module.exports = router;
