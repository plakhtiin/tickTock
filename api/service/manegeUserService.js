var db = require('../db');
var async = require('async');

function ManegeUserService() {}

ManegeUserService.prototype.getUserData = function(userId, cb) {
    async.waterfall([
        function(callback) {
            db.getAdminUserById(userId, function(err, user) {
                if (err) {
                    callback(err, null);
                } else {

                    callback(null, user);
                }

            });
        },
        function(user, callback) {
            db.getUserOrganisation(userId, function(err, organisations) {
                if (err) {
                    callback(err, null);
                } else {
                    user.organisations = organisations;
                    callback(null, user);

                }
            });
        }
    ], function(err, result) {
        cb(null, result);
    });
};

ManegeUserService.prototype.getUserOrganisations = function(userId, cb) {
    db.getUserOrganisation(userId, function(err, organisations) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, organisations);
        }
    });
};

ManegeUserService.prototype.getOrganizationDb = function(userId, cb) {
    db.getOrganization(userId, function(err, result) {
        if (err) {
            cb(err, null);
        } else {

            cb(null, result);
        }
    });
};


ManegeUserService.prototype.getOrganisationPoints = function(organisationId, cb) {
    db.getOrganisationPoints(organisationId, function(err, result) {
        if (err) {
            cb(err, null);
        } else {

            cb(null, result);
        }
    });
};

ManegeUserService.prototype.updatePoint = function(pointId, data, cb) {
    db.updatePoint(pointId, data, function(err, result) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, result);
        }
    });
};

ManegeUserService.prototype.updateUser = function(userId, data, cb) {
    db.updateUser(userId, data, function(err, result) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, result);
        }
    });
};

ManegeUserService.prototype.getPoint = function(pointId, cb) {
    db.getPoint(pointId, function(err, point) {
        if (err) {
            cb(err)
        } else {
            cb(null, point)
        }
    })
};

ManegeUserService.prototype.getDeltaSchedule = function(data, cb) {
    var self = this

    data.dateStart = new Date(data.dateStart).setHours(1, 0, 0)
    data.dateEnd = new Date(data.dateEnd).setHours(23, 0, 0)
    async.waterfall([
            function(callback) {
                db.getPoint(data.pointId, function(err, point) {
                    if (err) {
                        callback(err)
                    } else {
                        callback(null, point)
                    }
                })
            },
            function(point, callback) {
                db.getDeltaSchedule(data.pointId, data.dateStart, data.dateEnd, function(err, result) {
                    if (err) {
                        callback(err, null);
                    } else {
                        point.schedule = result
                        callback(null, point);
                    }
                })

            }
        ],
        function(err, result) {
            // for(var i = 0; i < result.weekTime.length; i++){
                // jsStartTime = result.weekTime[i].start.split(":");
                // jsEndTime = result.weekTime[i].end.split(":");

                // if (jsEndTime[1] == undefined || "00") {
                //     jsEndTime[1] = 0;
                // }

                // if (jsStartTime[1] == undefined || "00") {
                //     jsStartTime[1] = 0;

                // }
                for (var j = 0; j < result.schedule.length; j++) {
                    var startIndexDay = result.schedule[j].startTime.getDay();
                    var endIndexDay = result.schedule[j].endTime.getDay();
                    jsStartTime = result.weekTime[startIndexDay].start.split(":");
                    jsEndTime = result.weekTime[endIndexDay].end.split(":");
                    if (jsEndTime[1] == undefined || "00") {
                        jsEndTime[1] = 0;
                    }
                    if (jsStartTime[1] == undefined || "00") {
                        jsStartTime[1] = 0;
                    }
                    if (result.schedule[j].startTime > new Date(new Date(result.schedule[j].startTime).setHours(jsStartTime[0], jsStartTime[1], 0))) {
                        result.schedule[j].late = true;
                    }
                    if (result.schedule[j].endTime < new Date(new Date(result.schedule[j].endTime).setHours(jsEndTime[0], jsEndTime[1], 0))) {
                        result.schedule[j].goneBefore = true;

                    }
                }
                cb(null, result)
            // }
        });
};


ManegeUserService.prototype.getPointScedule = function(orgId, date, cb) {
    var self = this;
    // date  = new Date("Wed Feb 17 2016 08:18:15 GMT+0200 (EET)");    
    // var startTime = new Date(new Date(date).setHours(1, 0, 0));
    // var endTime = new Date(new Date(date).setHours(23, 0, 0));
    var pointsArr = [];
    async.waterfall([
            function(callback) {
                db.getOrganisationsPoints(orgId, function(err, points) {
                    if (err) {
                        callback(err);
                    } else {
                        pointsArr = points;
                        callback(null, points);
                    }
                });
            },
            function(points, callback) {
                var asyncArrey = [];
                var count = 0;
                for (var i = 0; i < points.length; i++) {
                    asyncArrey.push(function(asyncCallback) {
                        db.findPointDayByDay(points[count]._id, date, function(err, shcedules) {
                            if (err) {
                                asyncCallback(err, null);
                            } else {
                                asyncCallback(null, shcedules);
                            }
                        });
                        count++;
                    });
                }
                async.parallel(asyncArrey,
                    function(err, results) {
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, results);
                        }
                    });
            }
        ],
        function(err, result) {
            if (err) {
                cb(err, null);
            } else {
                for (var i = 0; i < pointsArr.length; i++) {
                    pointsArr[i].selectedWorkDay = null;
                    for (var j = 0; j < result.length; j++) {
                        if (result[j]) {
                            if (pointsArr[i]._id == result[j].pointId) {
                                pointsArr[i].selectedWorkDay = result[j];
                            }
                        }
                    }
                }
                self.disciplineAnalysis(orgId, pointsArr, function(points) {
                    cb(null, points);
                });
            }
        });
};


ManegeUserService.prototype.disciplineAnalysis = function(orgId, points, cb) {
            // for(var i = 0; i < points.weekTime.length; i++){

    for (var i = 0; i < points.length; i++) {
        // for (var j = 0; j < points[i].weekTime.length; j++) {
            var day = new Date().getDay();
            if(day == 0){
                day = 6;
            }
           jsStartTime =  points[i].weekTime[day-1].start.split(":");
           jsEndTime =  points[i].weekTime[day-1].end.split(":");

           if (jsEndTime[1] == undefined || "00") {
                jsEndTime[1] = 0;
            }

            if (jsStartTime[1] == undefined || "00") {
                jsStartTime[1] = 0;

            }

            if (points[i].selectedWorkDay) {
                if (points[i].selectedWorkDay.startTime > new Date(new Date(points[i].selectedWorkDay.startTime).setHours(jsStartTime[0], jsStartTime[1], 0))) {
                    points[i].selectedWorkDay.late = true;
                }
                if (points[i].selectedWorkDay.endTime < new Date(new Date(points[i].selectedWorkDay.endTime).setHours(jsEndTime[0], jsEndTime[1], 0))) {
                    points[i].selectedWorkDay.goneBefore = true;

                }
            }
        // };
        // for (var j = 0; j < result.schedule.length; j++) {
        //     var startIndexDay = result.schedule[j].startTime.getDay();
        //     var endIndexDay = result.schedule[j].endTime.getDay();
        //     jsStartTime = result.weekTime[startIndexDay].start.split(":");
        //     jsEndTime = result.weekTime[endIndexDay].end.split(":");
        //     if (jsEndTime[1] == undefined || "00") {
        //         jsEndTime[1] = 0;
        //     }
        //     if (jsStartTime[1] == undefined || "00") {
        //         jsStartTime[1] = 0;
        //     }
        //     if (result.schedule[j].startTime > new Date(new Date(result.schedule[j].startTime).setHours(jsStartTime[0], jsStartTime[1], 0))) {
        //         result.schedule[j].late = true;
        //     }
        //     if (result.schedule[j].endTime < new Date(new Date(result.schedule[j].endTime).setHours(jsEndTime[0], jsEndTime[1], 0))) {
        //         result.schedule[j].goneBefore = true;

        //     }
        // }



        
    }

    cb(points);


};
module.exports = new ManegeUserService();
