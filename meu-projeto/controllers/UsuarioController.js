const pool = require('../config/database');

// Função para criar um novo usuário
async function criarUsuario(req, res) {
  const { nome, email, senha } = req.body;

  try {
    // Verifica se já existe um usuário com esse email
    const emailExistente = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (emailExistente.rowCount > 0) {
      return res.status(400).json({ erro: 'Email já cadastrado' });
    }

    const result = await pool.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, senha]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ erro: 'Erro ao criar usuário' });
  }
}

// Função para listar todos os usuários
async function listarUsuarios(req, res) {
  try {
    const result = await pool.query('SELECT id, nome, email FROM usuarios ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ erro: 'Erro ao listar usuários' });
  }
}

// Função para buscar um usuário pelo id
async function buscarUsuarioPorId(req, res) {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT id, nome, email FROM usuarios WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ erro: 'Erro ao buscar usuário' });
  }
}

// Função para atualizar um usuário
async function atualizarUsuario(req, res) {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  try {
    // Verifica se usuário existe
    const usuarioExistente = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    if (usuarioExistente.rowCount === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    // Se email for atualizado, verifica duplicidade
    if (email) {
      const emailExistente = await pool.query('SELECT * FROM usuarios WHERE email = $1 AND id != $2', [email, id]);
      if (emailExistente.rowCount > 0) {
        return res.status(400).json({ erro: 'Email já cadastrado por outro usuário' });
      }
    }

    const updatedUser = await pool.query(
      `UPDATE usuarios SET
        nome = COALESCE($1, nome),
        email = COALESCE($2, email),
        senha = COALESCE($3, senha)
      WHERE id = $4
      RETURNING id, nome, email`,
      [nome, email, senha, id]
    );

    res.json(updatedUser.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ erro: 'Erro ao atualizar usuário' });
  }
}

// Função para deletar um usuário
async function deletarUsuario(req, res) {
  const { id } = req.params;

  try {
    const usuarioExistente = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    if (usuarioExistente.rowCount === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ erro: 'Erro ao deletar usuário' });
  }
}

module.exports = {
  criarUsuario,
  listarUsuarios,
  buscarUsuarioPorId,
  atualizarUsuario,
  deletarUsuario,
};
