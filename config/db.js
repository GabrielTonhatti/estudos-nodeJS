if(process.env.NODE_ENV == 'production') {
    module.exports = {mongoURI: "mongodb+srv://estudos:heroku123@cluster0.4vsur.mongodb.net/blogapp-prod"}
} else {
    module.exports = {mongoURI: "mongodb://localhost/blogapp"}
}