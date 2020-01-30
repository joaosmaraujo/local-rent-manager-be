const dotenv = require('dotenv');
dotenv.config();

const config = {
    PORT: process.env.PORT,
    CONNECTION_URL: 'mongodb+srv://local-rent-admin:Rumo_ao_38@cluster0-zxxoa.mongodb.net/local-rent-db?retryWrites=true&w=majority',
    SECRET: 'secret12345'
};

module.exports = config;