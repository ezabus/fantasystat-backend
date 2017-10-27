const pg = require('pg');
const fs = require('fs-extra');
const path = require('path');
const connectionPool = require('./connection-pool');
const getCredentials = require('./credentials');

const selectTeamstatQuery = "SELECT * FROM teamstat WHERE teamid = $1 AND date = '2017-10-22';";
let dailyTeamstatQuery;

let pool;

async function loadScripts() {
    const dailyTeamstatQueryPath = path.join(__dirname, '..', '..', 'resources', 'sql', 'dailyteamstat.sql')
    dailyTeamstatQuery = await fs.readFile(dailyTeamstatQueryPath, "UTF-8");
}

async function loadCredentialsFromConfig() {
    const configPath = path.join(__dirname, '..', '..', 'resources', 'config', 'cred.txt');
    const credentials = (await fs.readFile(configPath, "UTF-8")).split(",");
    return {
        user: credentials[0],
        password: credentials[1]
    };
}

async function connect() {
    //const credentials = await getCredentials();
    await loadScripts();
    const credentials = await loadCredentialsFromConfig();
    pool = connectionPool(credentials.user, credentials.password);
}

async function query(text, args) {
    try {
        return await pool.query(text, args);
    } catch (err){
        console.error(err);
    }
}

function getTeamstat(teamId) {
    return query(dailyTeamstatQuery, [teamId]);
}

function end() {
    if(pool)
        pool.end();
}


module.exports = {
    connect: connect,
    query: query,
    getTeamstat: getTeamstat,
    end: end
};
