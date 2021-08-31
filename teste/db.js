// Conexão com o banco de dados MariaDB
// Ordem é: banco de dados, usuário, senha, objeto JSON para conectar
const Sequelize = require('sequelize');
const sequelize = new Sequelize("postapp", "root", "gtc27061", {
    host: "localhost",
    dialect: "mariadb" // Nome do banco de dados que será conectado, tem que ter sido instalado com o npm
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}