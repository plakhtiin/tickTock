var timeService = require('../service/timeService');
// var mailService = require('../service/mailService');

module.exports = function(io) {
    var socketsInSession = [];

    io.sockets.on('connection', function(socket) {

        socket.on('data', function(data) {
            // socket.userData = data;
            var userData = new Object();
            userData = {
                socket: socket,
                user: data
            };
            socketsInSession.push(userData);
            timeService.startTime(data);
            console.log('sockets', socket);
            console.log('connection data', data);
        });

        socket.on("disconnect", function(event) {
            for (var i = 0; i < socketsInSession.length; i++) {
                if (socketsInSession[i].socket.id == socket.id) {
                timeService.stopTime(socketsInSession[i].user);
                socketsInSession.splice(i, 1);
                }
            }
            console.log(socketsInSession);
        });       
    });


io.sendMessage = function(pointId, msg, cb) {
    for (var i = 0; i < socketsInSession.length; i++) {
        if(socketsInSession[i].user.id == pointId){
            io.to(socketsInSession[i].socket.id).emit('message', msg);
            // socketsInSession[i].socket.on("messageSuccess", function(msg) {
            //    console.log('data', socketsInSession[i].socket); 
            //     if (msg == null) {
            //         cb(null, null);
            //     } else {
            //         cb(null, msg);
            //         }
            // });
            // io.to(socketsInSession[i].socket.id).emit('message', msg, function () { 
            //     socket.on('messageSuccess',function (data) {
            //         if (data == null) {
            //             cb(null, null);
            //         } else {
            //             cb(null, data);
            //             }
            //      console.log(data); // data will be 'woot'
            //     });
            //   });
        }
    }
    
};
};