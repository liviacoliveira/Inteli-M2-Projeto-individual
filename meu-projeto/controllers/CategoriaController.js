const db = require('../config/database');// módulo que gerencia a conexão com o banco

const CategoriaController = {
  async criarCategoria(req, res) {
    const { nome } = req.body;
    try {
      const result = await db.query('INSERT INTO categorias (nome) VALUES ($1) RETURNING *', [nome]);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao criar categoria', detalhe: error.message });
    }
  },

  async listarCategorias(req, res) {
    try {
      const result = await db.query('SELECT * FROM categorias');
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao listar categorias' });
    }
  },

  async atualizarCategoria(req, res) {
    const { id } = req.params;
    const { nome } = req.body;
    try {
      const result = await db.query('UPDATE categorias SET nome = $1 WHERE id = $2 RETURNING *', [nome, id]);
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao atualizar categoria' });
    }
  },

  async deletarCategoria(req, res) {
    const { id } = req.params;
    try {
      await db.query('DELETE FROM categorias WHERE id = $1', [id]);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao deletar categoria' });
    }
  }
};

module.exports = CategoriaController;