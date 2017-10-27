const pg = require('pg');

function run(dbUser, dbPassword) {
    if(!dbUser || !dbPassword) {
        console.error("Wrong user or password");
        return;
    }
    const config = {
        user: dbUser, //env var: PGUSER
        database: 'nhl', //env var: PGDATABASE
        password: dbPassword, //env var: PGPASSWORD
        host: '82.202.236.11', // Server hosting the postgres database
        port: 5432, //env var: PGPORT
        max: 50, // max number of clients in the pool
        idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    };

    return new pg.Pool(config);
}

module.exports = run;
