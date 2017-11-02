var pg = require('pg');
var Pool = require('pg').Pool;
var url = require('url');

if (process.env.HEROKU_DATABASE_URI) {
    var params = url.parse(process.env.HEROKU_DATABASE_URI);
    var auth = params.auth.split(':');

    config = {
        user: process.env.HEROKU_DATABASE_USER,
        password: process.env.HEROKU_DATABASE_PASSWORD,
        host: process.env.HEROKU_DATABASE_HOST,
        port: 5432,
        database: process.env.HEROKU_DATABASE_NAME,
        ssl: true,
        max: 10,
        idleTimeoutMillis: 30000,
    };

} else {
    config = {
        host: 'localhost',
        port: 5432,
        database: 'speak-easy',
        max: 20,
        idleTimeoutMillis: 30000,
    };
}

var ourPool = new Pool(config);

module.exports = ourPool;