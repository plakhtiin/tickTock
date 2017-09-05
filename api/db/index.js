/**
 * Created by nastya on 01.03.17.
 */
'use strict';
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var moment = require('moment');

var _db;
module.exports = {
    connectToServer: function (callback) {
        MongoClient.connect('mongodb://admin:root@ds111940.mlab.com:11940/ticktock', function (err, db) {
            _db = db;
            console.log('db connected');
            return callback(err);
        });
    },
	getUsers: function(cb) {
		_db.collection("users").find({
		}, function(err, result) {
			if (err) {
				cb(err, null);
			} else {
				result.toArray(function(err, users) {
					cb(null, users);
				});
			}
		});
	},

    getAdminUser: function(username, password, cb) {
        _db.collection("users").findOne({
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
        _db.collection("users").findOne({
            _id: new ObjectID(userId)
        }, function(err, result) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, result);
            }
        });
    },

	createUser: function(data, cb) {
        _db.collection("users").insertOne({
	        username: data.username,
	        firstName: data.firstName,
	        lastName: data.lastName,
	        role: data.role,
	        password: data.password,
	        email: data.email
        }, function(err, result) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, result);
            }
        });
    },
	removeUser: function(data, cb) {
        _db.collection("users").remove({
	        _id: new ObjectID(data._id)
        },{
	        justOne: true
        }, function(err, result) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, result);
            }
        });
    },
	updateUser: function(data, cb) {
        _db.collection("users").update({
	        _id: new ObjectID(data._id)
        },{
	        $set: {
		        username: data.username,
		        firstName: data.firstName,
		        lastName: data.lastName,
		        role: data.role,
		        password: data.password,
		        email: data.email
	        }
        }, function(err, result) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, result);
            }
        });
    },

    startUserDay: function(userId, cb) {
        _db.collection("schedule").insert({
	        userId: userId,
            day: moment().format('DD-MM-YYYY'),
            startTime: moment().format('DD-MM-YYYY hh:mm:ss'),
            endTime: ''
        }, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("create new user workday");
            }
        });
    },

    findUserDay: function(userId, cb) {
        var thisDay = moment().format('DD-MM-YYYY');
        _db.collection("schedule").find({
            userId: userId,
            day: thisDay
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

    endUserDay: function(userId, cb) {
	    var thisDay = moment().format('DD-MM-YYYY');
	    _db.collection("schedule").update({
	        userId: userId,
	        day: thisDay,
	        endTime: ''
        }, {
            $set: {
                "endTime": moment().format('DD-MM-YYYY hh:mm:ss')
            }
        }, function(err, result) {
            if (err) {
                cb(err, err);
            } else {
                console.log("update user workday");
            }
        });
    },

    setToken: function(userId, token, cb) {
        _db.collection("tokens").insert({
            userId: userId.toString(),
            token: token,
            time: moment().add(1, 'day').format('hh:mm:ss DD/MM/YYYY')
        }, function(err, result) {
            if (err) {
                cb(err, null);
            } else {
                var obj = {
                    id: userId.toString(),
                    token: token,
                    time: moment().add(1, 'day').format('hh:mm:ss DD/MM/YYYY')
                };
                cb(null, obj);
            }
        });
    }
};