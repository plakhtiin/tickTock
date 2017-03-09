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
	}
};