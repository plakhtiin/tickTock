/**
 * Created by nastya on 01.03.17.

 */
let socketIo = require('socket.io');
let db = require('./db/db');

db.connectToServer(function(err) {
    if (err) {
        console.log(err);
    } else {
        // var mailServise = require('./service/mailServise');
    }
});
// let manegeUserService = require('./service/manegeUserService');
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let server = require('http').createServer(app);
let port = 8888;// process.env.PORT || 8888;

// var io = socketIo.listen(server);
// require ('./sockets/socket')(io);
// let loginService = require('./service/loginService');
let listener = app.listen(port, () => {
    console.log('Server listening at port '+ listener.address().port);
});
//cfbcggbc