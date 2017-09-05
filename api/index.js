/**
 * Created by nastya on 01.03.17.
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var socketIo = require("socket.io");
var db = require("./db");
var express = require("express");
var bodyParser = require("body-parser");
var server = require("http");
var loginService = require("./service/loginService");
var manageUserService = require("./service/manegeUserService");
db.connectToServer(function (err) {
    if (err) {
        console.log(err);
    }
    else {
    }
});
// let manegeUserService = require('./service/manegeUserService');
var app = express();
var port = process.env.PORT || 8888;
var io = socketIo.listen(server);
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
    .use(express.static(__dirname + '/public'))
    .post("/api/login", function (req, res) {
    loginService.getUser(req.body.username, req.body.password, function (err, adninUser) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(adninUser);
        }
    });
})
    .post("/api/sendmessage/:pointId/:token", function (req, res) {
    loginService.isValidToken(req.params.token, function (isValid) {
        if (isValid) {
            io.sendMessage(req.params.pointId, req.body, function (err, msg) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(msg);
                }
            });
        }
        else {
            res.status(403).send('Error');
        }
    });
})
    .get("/api/user/data/:userId/:token", function (req, res) {
    loginService.isValidToken(req.params.token, function (isValid) {
        if (isValid) {
            manageUserService.getUserData(req.params.userId, function (err, usersDays) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(usersDays);
                }
            });
        }
        else {
            res.status(403).send('Error');
        }
    });
})
    .get("/api/point/:pointId/:token", function (req, res) {
    loginService.isValidToken(req.params.token, function (isValid) {
        if (isValid) {
            manageUserService.getPoint(req.params.pointId, function (err, point) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(point);
                }
            });
        }
        else {
            res.status(403).send('Error');
        }
    });
})
    .get("/api/organizations/:userId/:token", function (req, res) {
    loginService.isValidToken(req.params.token, function (isValid) {
        if (isValid) {
            manageUserService.getUserOrganisations(req.params.userId, function (err, organizations) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(organizations);
                }
            });
        }
        else {
            res.status(403).send('Error');
        }
    });
})
    .get("/api/organisation/points/:organisationId/:token", function (req, res) {
    loginService.isValidToken(req.params.token, function (isValid) {
        if (isValid) {
            manageUserService.getOrganisationPoints(req.params.organisationId, function (err, points) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(points);
                }
            });
        }
        else {
            res.status(403).send('Error');
        }
    });
})
    .get("/api/organization/:orgId/:token", function (req, res) {
    loginService.isValidToken(req.params.token, function (isValid) {
        if (isValid) {
            manageUserService.getOrganizationDb(req.params.orgId, function (err, organization) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(organization);
                }
            });
        }
        else {
            res.status(403).send('Error');
        }
    });
})
    .post("/api/schedule/delta/:token", function (req, res) {
    loginService.isValidToken(req.params.token, function (isValid) {
        if (isValid) {
            manageUserService.getDeltaSchedule(req.body, function (err, points) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(points);
                }
            });
        }
        else {
            res.status(403).send('Error');
        }
    });
})
    .post('/api/user/data/:token', function (req, res) {
    loginService.isValidToken(req.params.token, function (isValid) {
        if (isValid) {
            manageUserService.getAdminOrganisations(req.body, function (err, organisations) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(organisations);
                }
            });
        }
        else {
            res.status(403).send('Error');
        }
    });
})
    .post('/api/updatepoint/:pointId/:token', function (req, res) {
    loginService.isValidToken(req.params.token, function (isValid) {
        if (isValid) {
            manageUserService.updatePoint(req.params.pointId, req.body, function (err, point) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(point);
                }
            });
        }
        else {
            res.status(403).send('Error');
        }
    });
})
    .post('/api/updateuser/data/:userId/:token', function (req, res) {
    loginService.isValidToken(req.params.token, function (isValid) {
        if (isValid) {
            manageUserService.updateUser(req.params.userId, req.body, function (err, user) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(user);
                }
            });
        }
        else {
            res.status(403).send('Error');
        }
    });
});
//# sourceMappingURL=index.js.map