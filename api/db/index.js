/**
 * Created by nastya on 01.03.17.
 */
'use strict';
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var _db;
module.exports = {
    connectToServer: function (callback) {
        MongoClient.connect('mongodb://admin:root@ds111940.mlab.com:11940/ticktock', function (err, db) {
            _db = db;
            console.log('db connected');
            return callback(err);
        });
    },
	getUsers: function(userId, cb) {
		_db.collection("users").find({
		}, function(err, result) {
			if (err) {
				cb(err, null);
			} else {
				result.toArray(function(err, organisations) {
					cb(null, organisations);

				});
			}
		});
	},getUserOrganisation: function(userId, cb) {
        _db.collection("organizations").find({
            userId: userId.toString()
        }, function(err, result) {
            if (err) {
                cb(err, null);
            } else {
                result.toArray(function(err, organisations) {
                    cb(null, organisations);

                });
            }
        });
    },

    getOrganization: function(orgId, cb) {
        _db.collection("organizations").find({
            _id: new ObjectID(orgId)
        }, function(err, result) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, result);
            }
        });
    },

    getAdminUser: function(username, password, cb) {
        _db.collection("users").find({
            username: username,
            password: password
        }, function(err, result) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, result);
            }
        });
    },
    getAdminUsers: function(cb) {
        _db.collection("users").find(function(err, result) {
            if (err) {
                cb(err, null);
            } else {
                result.toArray(function(err, users) {
                    cb(null, users);
                });
            }
        });
    },
    getAdminUserById: function(userId, cb) {
        _db.collection("users").find({
            _id: new ObjectID(userId)
        }, function(err, result) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, result);
            }
        });
    },

    startUserDay: function(userId, date, cb) {
        _db.collection("schedule").insert({
            pointId: userId,
            startTime: new Date(date),
            endTime: new Date()
        }, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("create new user workday");
            }
        });
    },

    findUserDay: function(userId, cb) {
        var thisDay = new Date(new Date().setHours(6, 0, 0));
        _db.collection("schedule").find({
            pointId: userId,
            startTime: {
                $gte: thisDay

            }
        }, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                result.toArray(function(err, day) {
                    cb(day);
                });
            }
        });
    },

    endUserDay: function(dayId, cb) {
        _db.collection("schedule").update({
            _id: dayId
        }, {
            $set: {
                "endTime": new Date()
            }
        }, function(err, result) {
            if (err) {
                cb(err, err);
            } else {
                console.log("update user workday");
            }
        });
    },

    getOrganisationPoints: function(orgId, cb) {
        _db.collection("points").find({
            orgId: orgId
        }, function(err, result) {
            if (err) {
                cb(err, null);
            } else {
                result.toArray(function(err, points) {
                    cb(null, points);
                });
            }
        });
    },
    getPoint: function(pointId, cb) {
        _db.collection("points").find({
            _id: new ObjectID(pointId)
        }, function(err, result) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, result);
            }
        });
    },

    findPointDayByDay: function(pointId, date, cb) {
        pointId = pointId.toString();
        var startDay = new Date(new Date(date).setHours(1, 0, 0));
        var endDay = new Date(new Date(date).setHours(23, 0, 0));
        _db.collection("schedule").find({
            pointId: pointId,
            startTime: {
                $gte: startDay

            },
            endTime: {
                $lte: endDay
            }

        }, function(err, result) {
            if (err) {
                cb(err, null);
            } else {
                // result.toArray(function(err, schedule) {
                cb(null, result);
                // });
            }
        });
    },
    getDeltaSchedule: function(pointId, sDate, eDate, cb) {
        _db.collection("schedule").find({
            pointId: pointId,
            startTime: {
                $gte: new Date(sDate)

            },
            endTime: {
                $lte: new Date(eDate)
            }

        }, function(err, result) {
            if (err) {
                cb(err, null);
            } else {
                result.toArray(function(err, schedule) {

                    cb(null, schedule);
                });
            }
        });
    },
    getOrganisation: function(orgId, cb) {
        _db.collection("organizations").find({
            _id: new ObjectID(orgId)
        }, function(err, result) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, result);
            }
        });
    },

    updateOrganisation: function(organization, cb) {
        _db.collection("organization").update({
            _id: new ObjectID(organization._id)
        }, {
            $set: {
                "email": organization.email,
                "orgEndDay": organization.orgEndDay,
                "orgName": organization.orgName,
                "orgStartDay": organization.orgStartDay
            }
        }, function(err, result) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, "update Organisation");
            }
        });
    },

    getAllOrganisation: function(cb) {
        _db.collection("organization").find(function(err, result) {
            if (err) {
                cb(err, null);
            } else {
                result.toArray(function(err, organisationArr) {
                    cb(null, organisationArr);
                });
            }
        });
    },


    // getAdminUsers: function(cb) {
    //     _db.collection("administrations").find(function(err, result) {
    //         if (err) {
    //             cb(err, null);
    //         } else {
    //             result.toArray(function(err, admins) {
    //                 if (err) {
    //                     console.log(err);
    //                 } else {

    //                     cb(null, admins);
    //                 }

    //             });
    //         }
    //     });
    // },

    getOrganisationsPoints: function(orgId, cb) {
        _db.collection("points").find({
            orgId: orgId
        }, function(err, result) {
            if (err) {
                cb(err, null);
            } else {
                result.toArray(function(err, usersArr) {
                    cb(null, usersArr);
                });
            }
        });
    },


    findUserDayByDate: function(userId, startTime, endTime, cb) {
        var thisDay = new Date(new Date().setHours(6, 0, 0));
        _db.collection("usersDays").find({
            userId: userId.toString(),
            startDay: {
                $gte: startTime

            },
            endDay: {
                $lte: endTime
            }

        }, function(err, result) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, result)
                // result.toArray(function(err, day) {
                //     cb(day[0]);
                // });
            }
        });
    }
};