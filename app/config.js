const dotenv = require('dotenv');
dotenv.config();

const config = {
    PORT: process.env.API_PORT,
    CONNECTION_URL: process.env.DB_CONNECTION_URL,
    SECRET: process.env.AUTH_SECRET
};

module.exports = config;