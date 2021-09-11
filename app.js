const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const admin = require('./routes/admin');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
require("./models/Categoria");
const Postagem = mongoose.model("postagens");
require("./models/Postagem");
const Categoria = mongoose.model("categorias");
const usuarios = require('./routes/usuario');
const passport = require('passport');
require('./config/auth')(passport);
const db = require('./config/db');

// Config
// Sessão
app.use(session({
    secret: "cursoDeNode",
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    next();
});

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Template Engine - Handlebars
app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    helpers: {
        formatDate: (date) => {
            return moment(date).format('DD/MM/YYYY');
        }
    },
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set('view engine', 'handlebars');

// Mongoose
mongoose.connect(db.mongoURI)
    .then(()=> console.log("Conectado ao MongoDB..."))
    .catch(err => console.log("Erro ao se conectar: " + err));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.get('/', (req, res) => {
    Postagem.find()
        .populate("categoria")
        .sort(({data: "desc"}))
        .then(postagens => {
            res.render("index", {postagens: postagens});
        })
        .catch(err =>{
            req.flash("error_msg", "Houve um erro interno!");
            res.redirect("/404");
        });
});

app.get('/postagem/:slug', (req, res) => {
   Postagem.findOne({slug: req.params.slug})
       .then(postagem => {
           if(postagem) {
                res.render("postagem/index", {postagem: postagem});
           }else {
                req.flash("error_msg", "Esta postagem não existe!");
                res.redirect("/");
           }
       })
       .catch(err => {
           req.flash("error_msg", "Houve um erro interno!");
           res.redirect("/");
       });
});

app.get('/categorias',(req, res) => {
    Categoria.find()
        .then(categorias => {
            res.render('categorias/index', {categorias: categorias});
        })
        .catch(err => {
            req.flash("error_msg", "Houve um erro interno ao listar as categorias!");
            res.redirect("/");
        })
});

app.get('/categorias/:slug', (req, res) => {
    Categoria.findOne({slug: req.params.slug})
        .then(categoria => {
            if(categoria) {
                Postagem.find({categoria: categoria._id})
                    .then(postagens => {
                        res.render("categorias/postagens", {postagens: postagens, categoria: categoria}) ;
                    })
                    .catch(err => {
                        req.flash("erro_msg", "Houve um erro ao listar os posts!")
                        res.redirect("/");
                    })
            } else {
                req.flash("error_msg", "Essa categoria não existe!");
                res.redirect("/");
            }
        })
        .catch(err => {
            req.flash("error_msg", "Houve um erro interno ao carregar a página dessa categoria");
            res.redirect("/");
        });
});

app.get("/404", (req, res) => {
    res.send("Erro 404");
});

app.use('/admin', admin);
app.use('/usuarios', usuarios);

//Servidor
const PORT = process.env.PORT || 8089
const server = app.listen(PORT, () => {
    let port = server.address().port;

    console.log(`Servidor inicado em http://localhost:${port}`);
});