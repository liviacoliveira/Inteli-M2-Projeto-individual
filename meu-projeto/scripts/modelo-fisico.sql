CREATE TABLE usuarios ( -- cria uma tabela de usuários
  id SERIAL PRIMARY KEY, -- insere o id do usuário como uma chave primária e de incremento automático
  nome VARCHAR(100) NOT NULL, -- adiciona o campo do nome como um varchar (texto de no máximo 100 caracteres) não nulo
  email VARCHAR(100) NOT NULL UNIQUE, -- adiciona o campo do email como um varchar (texto de no máximo 100 caracteres) não nulo e único
  senha VARCHAR(255) NOT NULL -- adiciona o campo da senha como um varchar (texto de no máximo 255 caracteres) não nulo
);

CREATE TABLE eventos ( -- cria a tabela de eventos
  id SERIAL PRIMARY KEY, -- insere o id do evento como uma chave primária e de incremento automático
  titulo VARCHAR(150) NOT NULL, -- insere o campo do título do evento 
  id_usuario INT, -- insere o campo do id do usuário como um número inteiro
  descricao TEXT, -- insere o campo da descrição do evento como um texto
  hora_inicio TIME, -- insere o horário de início do evento
  hora_fim TIME, -- insere o horário de término do evento
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id) -- referencia o id do usuário como uma chave estrangeira fazendo alusão a tabela (usuarios)
);


CREATE TABLE inscricoes ( -- cria a tabela de inscrições
  id SERIAL PRIMARY KEY, -- insere o id da inscrição como uma chave primária e de incremento automático
  id_usuario INT, -- insere o campo do id do usuário como um número inteiro
  id_evento INT, -- insere o campo do id do evento como um número inteiro
  data_inscricao TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- define o campo da data de inscrição com a função que retorna a data e hora atual do sistema
  presenca BOOLEAN DEFAULT false, -- indica se o usuário esteve presente no evento
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id), -- referencia o id do usuário como uma chave estrangeira fazendo alusão a tabela (usuarios)
  FOREIGN KEY (id_evento) REFERENCES eventos(id) -- referencia o id do evento como uma chave estrangeira fazendo alusão a tabela (eventos)
);

CREATE TABLE categorias (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL UNIQUE
);

ALTER TABLE eventos ADD COLUMN id_categoria INT;
ALTER TABLE eventos ADD FOREIGN KEY (id_categoria) REFERENCES categorias(id);

CREATE TABLE comentarios (
  id SERIAL PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_evento INT NOT NULL,
  texto TEXT NOT NULL,
  data_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
  FOREIGN KEY (id_evento) REFERENCES eventos(id)
);
