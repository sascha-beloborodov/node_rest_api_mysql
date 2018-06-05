require('dotenv').config(); //instatiate environment variables
const path = require('path');

CONFIG = {}; //Make this global to use all over the application

CONFIG.app = process.env.APP; // prod, test, dev
CONFIG.port = process.env.PORT;

CONFIG.db_dialect = process.env.DB_DIALECT;
CONFIG.db_host = process.env.DB_HOST;
CONFIG.db_port = process.env.DB_PORT;
CONFIG.db_name = process.env.DB_NAME;
CONFIG.db_user = process.env.DB_USER;
CONFIG.db_password = process.env.DB_PASSWORD;

CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION;
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION;

CONFIG.base_path = path.join(__dirname, '/../');

// for seeeds
module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    }
};