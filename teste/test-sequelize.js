const Sequelize = require('sequelize');
// Ordem é: banco de dados, usuário, senha, objeto JSON para conectar
const sequelize = new Sequelize("postapp", "root", "*********", {
    host: "localhost",
    dialect: "mariadb" // Nome do banco de dados que será conectado, tem que ter sido instalado com o npm
});

// Teste de conexão
// sequelize.authenticate()
//     .then(function () {
//         console.log("Conectado com sucesso!");
//     })
//     .catch(function (err) {
//         console.log("Falha ao se conectar: " + err);
//     });

const Postagem = sequelize.define('postagens', {
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
});

// Postagem.sync({force: true});

// Postagem.create({
//     titulo: "UM TITULO QUALQUER",
//     conteudo: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia at consequuntur earum illo."
// });

const Usuario = sequelize.define('usuarios', {
    nome: {
        type: Sequelize.STRING
    },
    sobrenome: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    }
});

// Usuario.sync({force: true});

Usuario.create({
    nome: "Gabriel",
    sobrenome: "Tonhatti",
    idade: 20,
    email: "blabla@mail.com"
});