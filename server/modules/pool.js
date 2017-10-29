var pg = require('pg');
var Pool = require('pg').Pool;
var url = require('url');

// // original config below
// var config = {
//     host: 'localhost',
//     port: 5432,
//     database: 'speak-easy',
//     max: 20,
//     idleTimeoutMillis: 30000
// };

// DB login based on heroku attempt 1 below
if (process.env.HEROKU_DATABASE_URI) {
//     // Heroku gives a url, not a connection object
//     // https://github.com/brianc/node-pg-pool
    var params = url.parse(process.env.HEROKU_DATABASE_URI);
    var auth = params.auth.split(':');

    config = {
        user: process.env.HEROKU_DATABASE_USER,
        password: process.env.HEROKU_DATABASE_PASSWORD,
        host: process.env.HEROKU_DATABASE_HOST,
        port: 5432,
        database: process.env.HEROKU_DATABASE_NAME,
        ssl: true, // heroku requires ssl to be true
        max: 10, // max number of clients in the pool
        idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    };

} else {
    config = {
        host: 'localhost',
        port: 5432,
        database: 'speak-easy',
        max: 20,
        idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    };
}

var ourPool = new Pool(config);

module.exports = ourPool;