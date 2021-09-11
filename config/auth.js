const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Mode de usário
require('../models/Usuario');
const Usuario = mongoose.model('usuarios');

module.exports = function (passport) {
    passport.use(new localStrategy({usernameField: 'email', passwordField: "senha"}, (email, senha, done) => {

        Usuario.findOne({email: email})
            .then(usuario => {
                if(!usuario) {
                    return done(null, false, {message: "Esta conta não existe!"});
                }

                bcrypt.compare(senha, usuario.senha, (erro, batem)=> {

                    if(batem) {
                        return done(null, usuario);
                    } else {
                        return done(null, false, {message: "Senha incorreta!"});
                    }
                })
            })
            .catch(err => {
                req.flash("error_msg", "Houve um erro interno!");
                res.redirect("/");
            });
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        Usuario.findById(id, (err, usuario) => {
           done(err, usuario);
        });
    })
}