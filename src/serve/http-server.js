const express         = require('express');
const static           = require('express-static');
const path            = require('path');
const helmet          = require('helmet');
const https           = require('https');
const morgan          = require('morgan');
const fs              = require('fs');
const jsonxml         = require('jsontoxml');
const log             = require('./logs.js')(module);
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


    app.get('/ting', function(req, res, next){
        res.send("The ting go skraaaa");
    });

    app.get('/xml', function (req, res, next) {
        res.send(jsonxml({mans: "not hot"}));
    });

    // app.use(helmet());

    // app.use(static(path.join(__dirname, '..', '..', 'static')));

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

    app.listen(9999, function(){
        log.info('Express server listening on port 9999');
    });
}

start();
