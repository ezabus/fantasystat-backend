const express         = require('express');
const path            = require('path');
const log             = require('./logs.js')(module);
const morgan          = require('morgan');
const db              = require('../dal/db');
const app = express();

async function start() {
    await db.connect();

    app.use(morgan('dev'));

    app.get('/api/dailystat', async function (req, res) {
        const teamstat = await db.getTeamstat(req.query.teamId);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(teamstat.rows[0]))
    });

    app.get('/ErrorExample', function(req, res, next){
        next(new Error('Random error!'));
    });

    app.listen(9999, function(){
        log.info('Express server listening on port 9999');
    });

    app.use(function(req, res, next){
        res.status(404);
        log.debug('Not found URL: %s',req.url);
        res.send({ error: 'Not found' });
        return;
    });

    app.use(function(err, req, res, next){
        res.status(err.status || 500);
        log.error('Internal error(%d): %s',res.statusCode,err.message);
        res.send({ error: err.message });
        return;
    });
}

start();
