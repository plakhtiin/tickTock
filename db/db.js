/**
 * Created by nastya on 01.03.17.
 */
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var _db;
module.exports = {
    connectToServer: function (callback) {
        MongoClient.connect('mongodb://admin:root@ds111940.mlab.com:11940/ticktock', function (err, db) {
            _db = db;
            
            return callback(err);
        });
    }
};