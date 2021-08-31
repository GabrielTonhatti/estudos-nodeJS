const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const admin = require('./routes/admin');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');

// Config
// Sessão
app.use(session({
    secret: "cursoDeNode",
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

// Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash('error_msg');
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
mongoose.connect("mongodb://localhost/blogapp")
    .then(()=> console.log("Conectado ao MongoDB..."))
    .catch(err => console.log("Erro ao se conectar: " + err));

// Public
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    console.log("Oi eu sou um MiddleWare");
    next();
});

// Rotas
app.get('/', (req, res) => {
    res.send('Rota Principal');
});

app.get('/posts',(req, res) => {
    res.send('Lista de Posts');
});

app.use('/admin', admin);

//Servidor
const server = app.listen(8081, () => {
    let port = server.address().port;

    console.log(`Servidor inicado em http://localhost:${port}`);
});