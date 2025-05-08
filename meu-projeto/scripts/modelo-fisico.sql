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
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id) -- referencia o id do usuário como uma chave estrangeira fazendo alusão a tabela (usuarios)
);

CREATE TABLE inscricoes ( -- cria a tabela de inscrições
  id SERIAL PRIMARY KEY, -- insere o id da inscrição como uma chave primária e de incremento automático
  id_usuario INT, -- insere o campo do id do usuário como um número inteiro
  id_evento INT, -- insere o campo do id do evento como um número inteiro
  data_inscricao TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- define o campo da data de inscrição com a função que retorna a data e hora atual do sistema
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id), -- referencia o id do usuário como uma chave estrangeira fazendo alusão a tabela (usuarios)
  FOREIGN KEY (id_evento) REFERENCES eventos(id) -- referencia o id do evento como uma chave estrangeira fazendo alusão a tabela (eventos)
);
