/**
 * Created by nastya on 01.03.17.

 */
var socketIo = require('socket.io');
var db = require('./db/db');
db.connectToServer(function (err) {
    if (err) {
        console.log(err);
    }
    else {
    }
});
// let manegeUserService = require('./service/manegeUserService');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').createServer(app);
var port = 8888; // process.env.PORT || 8888;
// var io = socketIo.listen(server);
// require ('./sockets/socket')(io);
// let loginService = require('./service/loginService');
var listener = app.listen(port, function () {
    console.log('Server listening at port ' + listener.address().port);
});
//cfbcggbc 
//# sourceMappingURL=index.js.map