if(process.env.NODE_ENV == 'production') {
    module.exports = { mongoURI: process.env.URL_DATABASE }
} else {
    module.exports = {mongoURI: "mongodb://localhost/blogapp"}
}