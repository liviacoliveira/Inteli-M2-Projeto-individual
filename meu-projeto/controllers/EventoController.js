const pool = require('../config/database');

// Criar um novo evento
exports.criarEvento = async (req, res) => {
  const { titulo, id_usuario, descricao, hora_inicio, hora_fim, id_categoria } = req.body;

  const query = `
    INSERT INTO eventos (titulo, id_usuario, descricao, hora_inicio, hora_fim, id_categoria)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  try {
    const result = await pool.query(query, [titulo, id_usuario, descricao, hora_inicio, hora_fim, id_categoria]);
     res.redirect('/');

  } catch (err) {
  console.error('Erro real ao criar evento:', err); 
  res.status(500).json({ error: 'Erro ao criar evento' });
}
};

// Listar todos os eventos
exports.listarEventos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM eventos ORDER BY id');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Erro ao listar eventos:', err);
    res.status(500).json({ error: 'Erro ao listar eventos' });
  }
};

// Editar um evento
exports.editarEvento = async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, hora_inicio, hora_fim, id_categoria } = req.body;

  try {
    const query = `
      UPDATE eventos
      SET titulo = $1, descricao = $2, hora_inicio = $3, hora_fim = $4, id_categoria = $5
      WHERE id = $6
      RETURNING *;
    `;

    const result = await pool.query(query, [titulo, descricao, hora_inicio, hora_fim, id_categoria, id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Evento não encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao editar evento:', err);
    res.status(500).json({ error: 'Erro ao editar evento' });
  }
};

// Excluir um evento
exports.excluirEvento = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM eventos WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Evento não encontrado' });
    }

    res.status(204).send();
  } catch (err) {
    console.error('Erro ao excluir evento:', err);
    res.status(500).json({ error: 'Erro ao excluir evento' });
  }
};
