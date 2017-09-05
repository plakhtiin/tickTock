var db = require('../db');

function TimeService() {}

TimeService.prototype.startTime = function(id, cb) {
    db.findUserDay(id, function(error, result) {
        if (error) {
            console.log("this user already started ", id);
        } else {
            db.startUserDay(id, function(err, res){
	            if(err){
		            cb(err);
                }else if(res){
	                cb(res)
	            }
            });

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
