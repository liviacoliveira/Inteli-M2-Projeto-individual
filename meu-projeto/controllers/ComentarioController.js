const db = require('../config/database');

const ComentarioController = {
  async criarComentario(req, res) {
    const { id_usuario, id_evento, texto } = req.body;
    try {
      const result = await db.query(
        'INSERT INTO comentarios (id_usuario, id_evento, texto) VALUES ($1, $2, $3) RETURNING *',
        [id_usuario, id_evento, texto]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao criar comentário' });
    }
  },

  async listarComentarios(req, res) {
    try {
      const result = await db.query('SELECT * FROM comentarios');
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao listar comentários' });
    }
  },

  async listarPorEvento(req, res) {
    const { idEvento } = req.params;
    try {
      const result = await db.query(
        'SELECT * FROM comentarios WHERE id_evento = $1 ORDER BY data_comentario DESC',
        [idEvento]
      );
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao listar comentários por evento' });
    }
  },

  async deletarComentario(req, res) {
    const { id } = req.params;
    try {
      await db.query('DELETE FROM comentarios WHERE id = $1', [id]);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao deletar comentário' });
    }
  }
};

module.exports = ComentarioController;
