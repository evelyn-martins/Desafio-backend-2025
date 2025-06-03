CREATE TABLE produtos(
	id 				SERIAL PRIMARY KEY,
	nome 			VARCHAR(100) NOT NULL,
	preco 			NUMERIC(10, 2) NOT NULL,
	estoque 		INTEGER NOT NULL
);

CREATE TABLE clientes(
	id 				SERIAL PRIMARY KEY,
	nome 			VARCHAR(100) NOT NULL,
	telefone 		VARCHAR(100) NOT NULL
);

CREATE TABLE pedidos(
	id 				SERIAL PRIMARY KEY,
	cliente_id 		INTEGER REFERENCES clientes(id),
	valor_total 	NUMERIC(10, 2),
	data_criacao 	TIMESTAMP DEFAULT NOW()
);

CREATE TABLE pedido_produtos(
	id 				SERIAL PRIMARY KEY,
	pedido_id 		INTEGER REFERENCES pedidos(id),
	produto_id 		INTEGER REFERENCES produtos(id),
	quantidade 		INTEGER CHECK (quantidade > 0),
	CONSTRAINT pedido_produto_unico UNIQUE (pedido_id, produto_id)
);