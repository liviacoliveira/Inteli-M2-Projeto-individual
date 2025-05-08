CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL
);

CREATE TABLE eventos (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  id_usuario INT,
  descricao TEXT,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

CREATE TABLE inscricoes (
  id SERIAL PRIMARY KEY,
  id_usuario INT,
  id_evento INT,
  data_inscricao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
  FOREIGN KEY (id_evento) REFERENCES eventos(id)
);
