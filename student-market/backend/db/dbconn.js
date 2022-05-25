const {MongoClient} = require("mongodb")
const uri = process.env.URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

var _db;

module.exports = {
    connectToServer: function(callback) {
        client.connect(function(err, db){
            if(db){
                _db = db.db("campus_market");
                console.log("happily connected to db")
            }
            return callback(err);
        });
    },
    getDb : function(){
        return _db;
    },
};