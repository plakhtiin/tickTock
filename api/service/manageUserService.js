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

ManageUserService.prototype.updateUser = function(userId, data, cb) {
    db.updateUser(userId, data, function(err, result) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, result);
        }
    });
};

module.exports = new ManageUserService();
