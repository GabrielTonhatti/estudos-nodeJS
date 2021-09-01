const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
console.log("Version: " + mongoose.version);
mongoose.connect('mongodb://localhost/aprendendo')
    .then(() => {
        console.log('MongoDB conectado...');
    })
    .catch(err => {
        console.log('Houve um erro ao se conectar ao mongoDB: ' + err);
    });

// Model - Usuários
// Definindo o Model
const UsuarioSchema = mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    sobrenome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    idade: {
        type: Number,
        require: true
    },
    pais: {
        type: String
    }
});

// Collection
mongoose.model('usuarios', UsuarioSchema);

const User = mongoose.model('usuarios');

new User({
    nome: "Jhon",
    sobrenome: "Doe",
    email: 'jhon@gmail.com',
    idade: 34,
    pais: 'EUA'
})
    .save()
    .then(() => console.log("Usuário criado com sucesso!"))
    .catch(err => console.log("Houve um erro ao registar o usuário: " + err));

