var db = require('../db');
var async = require('async');

function ManageUserService() {}

ManageUserService.prototype.getUserData = function(userId, cb) {
    async.waterfall([
        function(callback) {
            db.getAdminUserById(userId, function(err, user) {
                if (err) {
                    callback(err, null);
                } else {

                    callback(null, user);
                }

            });
        }
    ], function(err, result) {
        cb(null, result);
    });
};

ManageUserService.prototype.updateUser = function(data, cb) {
    db.updateUser(data, function(err, result) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, result);
        }
    });
};
ManageUserService.prototype.createUser = function(data, cb) {
    db.createUser(data, function(err, result) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, result);
        }
    });
};
ManageUserService.prototype.getUsers = function(cb) {
    db.getUsers(function(err, result) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, result);
        }
    });
};
ManageUserService.prototype.removeUser = function(user, cb) {
    db.removeUser(user, function(err, result) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, result);
        }
    });
};

module.exports = new ManageUserService();
