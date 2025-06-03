const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'sistema',
    password: 'postgres',
    port: 5432,
});

module.exports = pool;