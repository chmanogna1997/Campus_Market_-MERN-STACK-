const { response } = require("express");
const express = require("express");
// the router will be added as middleware and controls the request starting with path /
const Router = express.Router();

// this will connect to database
const dbo = require("../db/dbconn");

//This will help us to convert id ( params id ) from string to objectid
const ObjectId = require("mongodb").ObjectId;


// // lets get list of records
Router.route("/get").get(function(req,res) {
    dbo.getDb("campus_market")
    .collection("User_details")
    .find({})
    .toArray(function(err, out){
        if (err) throw err;
        res.json(out);
    });
});

// // adding new user
Router.route("/adduser").post(function(req,res){
    // console.log(" in post request ", req.body)
    let myobj = {
        Email : req.body.Email,
        FName : req.body.FName,
        LName : req.body.LName,
        university : req.body.university,
        pwd : req.body.pwd
    }
    console.log(" my object is ", myobj)
    dbo.getDb("campus_market")
    .collection("User_details")
    .insertOne(myobj, function(err,out){
        if(err) throw err;
        res.json(out);
    })
})

module.exports = Router;

