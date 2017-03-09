/**
 * Created by nastya on 01.03.17.

 */
import socketIo = require('socket.io');
import db = require('./db');

db.connectToServer(function(err) {
    if (err) {
        console.log(err);
    } else {
        // var mailServise = require('./service/mailServise');
    }
});
// let manegeUserService = require('./service/manegeUserService');
import express = require('express');
import bodyParser = require('body-parser');
let app = express();
import server = require('http');
declare var process: any;
let port = process.env.PORT || 8888;

declare var __dirname;

// var io = socketIo.listen(server);
// require ('./sockets/socket')(io);
// let loginService = require('./service/loginService');


server.createServer(app);
let listener = app.listen(port, () => {
    console.log('Server listening at port '+ listener.address().port);
});

app.use(bodyParser.json())
    .get('/', function(req, res, next) {
        res.sendFile(__dirname + '/public/index.html');
    })
    .use(express.static(__dirname + '/public'));

//cfbcggbc