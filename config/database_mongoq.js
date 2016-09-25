var mongoq = require('mongoq');

module.exports.createCollection = function(collection, db, callback) {

    var COLLECTION = collection;
    var DB = db;


    var db = mongoq('mongodb://mongodb.caribenordestino.kinghost.net/caribenordesti01', {
      safe: false,
      strict: false,
      auto_reconnect: true,
      poolSize:2
    });

    callback(db.collection(COLLECTION));

    };
