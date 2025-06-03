const db = require('../config/database');

const InscricaoController = {
 async inscreverUsuario(req, res) {
  const { id_usuario, id_evento } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO inscricoes (id_usuario, id_evento, presenca) VALUES ($1, $2, TRUE) RETURNING *',
      [id_usuario, id_evento]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao inscrever usuário no evento' });
  }
},


  async listarInscricoes(req, res) {
    try {
      const result = await db.query('SELECT * FROM inscricoes');
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao listar inscrições' });
    }
  },

  async listarInscricoesPorUsuario(req, res) {
    const { idUsuario } = req.params;
    try {
      const result = await db.query('SELECT * FROM inscricoes WHERE id_usuario = $1', [idUsuario]);
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao listar inscrições do usuário' });
    }
  },

  async listarInscricoesPorEvento(req, res) {
    const { idEvento } = req.params;
    try {
      const result = await db.query('SELECT * FROM inscricoes WHERE id_evento = $1', [idEvento]);
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao listar inscritos do evento' });
    }
  },

  async atualizarPresenca(req, res) {
    const { id } = req.params;
    const { presenca } = req.body;
    try {
      const result = await db.query(
        'UPDATE inscricoes SET presenca = $1 WHERE id = $2 RETURNING *',
        [presenca, id]
      );
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao atualizar presença' });
    }
  },

  async cancelarInscricao(req, res) {
    const { id } = req.params;
    try {
      await db.query('DELETE FROM inscricoes WHERE id = $1', [id]);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao cancelar inscrição' });
    }
  }
};

module.exports = InscricaoController;
