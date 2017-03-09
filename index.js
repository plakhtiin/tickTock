"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db = require("./db");
db.connectToServer(function (err) {
    if (err) {
        console.log(err);
    }
    else {
        // var mailServise = require('./service/mailServise');
    }
});
// let manegeUserService = require('./service/manegeUserService');
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var server = require("http");
var port = process.env.PORT || 8888;
// var io = socketIo.listen(server);
// require ('./sockets/socket')(io);
// let loginService = require('./service/loginService');
server.createServer(app);
var listener = app.listen(port, function () {
    console.log('Server listening at port ' + listener.address().port);
});
app.use(bodyParser.json())
    .get('/', function (req, res, next) {
    res.sendFile(__dirname + '/public/index.html');
})
    .use(express.static(__dirname + '/public'));
//cfbcggbc 
//# sourceMappingURL=index.js.map