const { response, json } = require("express");
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

// checking login credentials 
Router.route("/checkLogin/:email").get(function(req,res){
    console.log("in check login route", req.params.email)
    let myquery = {Email: req.params.email}
    console.log("my query is ", myquery);
    dbo.getDb("campus_market")
    .collection("User_details")
    .findOne(myquery, function(err,result){
        if(err) {throw err;}
        console.log(" the result is ")
        res.json(result)
    })
})

// reset password
Router.route("/resetPwd").post(function(req,res){
    console.log("in reset password post request", req.body)
    dbo.getDb("campus_market")
    .collection("User_details")
    .findOneAndUpdate({Email : req.body.Email}, {$set : {pwd : req.body.pwd} , $currentDate: { lastModified: true }}, function(err,result){
        console.log("the result in find and update is ", result.lastErrorObject.updatedExisting);
        if(err){ throw err}
        res.json({"output" : result.lastErrorObject.updatedExisting})
    })
})

// // adding new user
Router.route("/adduser").post(function(req,res){
    // console.log(" in post request ", req.body)
    let myquery = { Email: req.body.Email};
    // console.log("myquery is ", myquery);
    dbo.getDb("campus_market")
    .collection("User_details")
    .findOne(myquery,function(err,result){
        if (err) {throw err}
        // console.log("the result is ",result)
        if(result !== null){
            res.json({userExist : true})
        }else{
            // console.log("the req body is ", req.body)
            let myobj = {
                Email : req.body.Email,
                FName : req.body.Fname,
                LName : req.body.LName,
                university : req.body.university,
                pwd : req.body.pwd
            }
            // console.log(" my object is ",req.body, myobj)
            dbo.getDb("campus_market")
            .collection("User_details")
            .insertOne(myobj, function(err,out){
                if(err) throw err;
                res.json(out);
            })
        }
    })
})

// sell products by user

Router.route("/sellProducts").post(function(req,res){
    let myquery = { Email: req.body.Email};
    console.log("in add products for user section", (req.files) );
    console.log("**** ", req.body);
   
    res.send("hello")
    

})

module.exports = Router;

