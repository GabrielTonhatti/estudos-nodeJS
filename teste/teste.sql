USE
    sistemaDeCadastro;

CREATE TABLE usuarios
(
    nome  VARCHAR(50),
    email VARCHAR(100),
    idade INT
);

INSERT INTO usuarios(nome, email, idade)
VALUES ("Maria Clara", "maria@teste22.com", 8);

SELECT *
FROM usuarios
WHERE idade = 8;

SELECT *
FROM usuarios
WHERE nome = "Lucas";

SELECT *
FROM usuarios
WHERE idade >= 18;

DELETE
FROM usuarios
WHERE nome = "Gabriel Tonhatti";

DELETE
FROM usuarios
WHERE nome = "Victor Lima";

DELETE
FROM usuarios
WHERE nome = "Maria Clara";

UPDATE usuarios
SET nome = "Nome de Teste"
WHERE nome = "Lucas";

SELECT *
FROM usuarios;