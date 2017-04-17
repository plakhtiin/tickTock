var db = require('../db');

function TimeService() {}

TimeService.prototype.startTime = function(user) {
    db.findUserDay(user.id, function(result) {
        if (result.length !== 0) {
            console.log("this user already started ", user);
        } else {
            db.startUserDay(user.id ,user.date);

        }
    });
};

TimeService.prototype.stopTime = function(user) {
    db.findUserDay(user.id, function(result) {
        if (result.length > 0) {
            db.endUserDay(result[0]._id);
        }
    });
};

module.exports = new TimeService();
