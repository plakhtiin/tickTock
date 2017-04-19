var db = require('../db');
var jsonwebtoken = require('jsonwebtoken');

function loginService() {}

loginService.prototype.getUser = function(username, password, cb) {
    db.getAdminUser(username, password, function(err, result) {
        if (err) {
            cb(err, null);
        } else {
            if (result) {
                var adminInfo = result;
                adminInfo.id = result._id.toString();
                adminInfo.token = jsonwebtoken.sign({
                    username: username,
                    password: password
                }, "dasdasfsfs");

                cb(null, adminInfo);
            }

        }

    });
};

loginService.prototype.isValidToken = function(token, cb) {
    if (!token) {
        cb(false);
    }
    jsonwebtoken.verify(token, 'dasdasfsfs', function(err, decoded) {
        if (err) {
            cb(false);
        } else if (!decoded.username || !decoded.password) {
            cb(false);
        } else {
            db.getAdminUser(decoded.username, decoded.password, function(err, result) {
                if (err) {
                    cb(false);
                }
                if (result) {
                    cb(true);
                }
            });
        }
    });
};



module.exports = new loginService();
