const express = require("express");

// the router will be added as middleware and controls the request starting with path /
const Router = express.Router();

// this will connect to database
const dbo = require("../db/dbconn");

// need this to convert string id to object id
const mongoose = require('mongoose');

// ***************************** Deleting User sell prodict : profile page ************************************

Router.route("/delete_user_sellprds/:id/:category/:email").get(function(req,res){
    let id_query = { _id: mongoose.Types.ObjectId( req.params.id) };
    let email_query = {Email : req.params.email}
    console.log("the email query is ", email_query);
    console.log("deleting user sell prds", req.params.id, req.params.category);
     dbo.getDb("campusmarket")
     .collection("User_details")
     .findOne(email_query)
     .then((result, reject) => {
         let userProducts = result.userProducts;
         console.log("the result is ", userProducts, mongoose.Types.ObjectId( req.params.id));
         userProducts = userProducts.filter(function(returnableObjects){ return returnableObjects.id.toString() !==  req.params.id; });
        //  console.log("after deleting user products are ", userProducts); 
         return userProducts;
     })
     .then((result1, reject) => {
         console.log("after delete the result is ", result1);
         return new Promise((resolve, reject) => {
            dbo.getDb("campusmarket")
            .collection("User_details")
            .findOneAndUpdate(email_query, { $set: { userProducts: result1 }, $currentDate: { lastModified: true } },  function(err, result){
            // console.log("the result after updating", result)
             if(!err) {  resolve(result) }
             else { reject(err) }
            })
        })
     })
     .then((result2) => {
             dbo.getDb("campusmarket")
             .collection(req.params.category.toLowerCase())
             .deleteMany(id_query, function(err,result) {
                 console.log("checking if deleted ", result);
                 if(result.deletedCount === 1  && result.acknowledged){
                     res.json(result)
                 }
                 else{
                     res.json(err)
                 }
             })     
     })
})
// ****************************** Profile : get users sell products , will be displayed in profile page *************************

Router.route("/user_sellprds/:email").get(function(req,res){
   // console.log("in user sellprds profile", req.params.email);
    dbo.getDb("campus_market")
        .collection("User_details")
        .findOne({Email : req.params.email})
        .then((result1, reject) => {
        //    console.log("the result1 in sellprds ", result1);
            if(!reject){return result1.userProducts}
            else{ return reject}
        })
        .then((result2,reject) => {
            return new Promise((resolve, reject) => {
                // console.log("the result2 in sellprds ", result2);
                var arry = [];
                for (var i = 0; i < result2.length; i++) {
                    //console.log("the id and category is ", result2[i].id, result2[i].category )
                    getproduct_details(result2[i].id, result2[i].category).then((result3, reject) => {
                        console.log("the result3 ...", result3)
                        arry.push(result3);
                        if (arry.length === result2.length) {
                            resolve(arry)
                        }
                    });
                }
            })
        })
        .then((result3, reject) => {
            //   console.log("the result3  array is ", result3);
             if (result3.length > 0) { res.json(result3); }
             else { res.json({ err: reject }) }
         })
         .catch(err => {
            res.json(err);
            })
})

//**************************************** profile : bookmarks on profile page ************************************
 

Router.route("/bookmarks_prds/:email").get(function (req, res) {
    //console.log("need to get bookmarks");
    dbo.getDb("campus_market")
        .collection("User_details")
        .findOne({ Email: req.params.email })
        .then((result1, reject) => {
            // console.log("the result is ", result1);
            if (result1) { return result1.userBookmarks; }
            else { return reject }
        })
        .then((result2, reject) => {
            // console.log("the result2 is ", result2)
            return new Promise((resolve, reject) => {
                var arry = [];
                for (var i = 0; i < result2.length; i++) {
                    //console.log("the id and category is ", result2[i].id, result2[i].category )
                    getproduct_details(result2[i].id, result2[i].category).then((result3, reject) => {
                        arry.push(result3);
                        if (arry.length === result2.length) {
                            resolve(arry)
                        }
                    });
                }
            })
        })
        .then((result3, reject) => {
           // console.log("the result3  array is ", result3);
            if (result3.length > 0) { res.json(result3); }
            else { res.json({ err: reject }) }
        })
        .catch(err => {
             //console.log("there is an error", err)
             })
})

//  ********************************************** get product details sending id and category   ******************************************************

function getproduct_details(id, category) {

    var collection = category.toLowerCase();
    var query = { _id: mongoose.Types.ObjectId(id) }

    return new Promise((resolve, reject) => {
        dbo.getDb("campus_market")
            .collection(collection)
            .find(query)
            .toArray()
            .then((result, error) => {
                if (!error) { resolve(result); }
                else { reject(err); }
            })
    })
}

// *********************************************** lets update bookmark details  ******************************************************


Router.route("/updateBookmarks").post(function (req, res) {
   // console.log("in update bookmarks post request", req.body)
    dbo.getDb("campus_market")
        .collection("User_details")
        .findOneAndUpdate({ Email: req.body.Email }, { $set: { userBookmarks: req.body.bookmarks }, $currentDate: { lastModified: true } }, function (result, err) {
            //console.log("the result in find and update is ", result);
            if (err) { throw err }
            res.json({ "output": result.lastErrorObject.updatedExisting })
        })
}) 

//  ********************************************************************* getting sell product details *******************************************

Router.route("/sellProducts").post(function (req, res) {
    let myObj = {
        Email: req.body.Email,
        university: req.body.university,
        sellPrdName: req.body.sellPrdName,
        sellPrdDescrpt: req.body.sellPrdDescrpt,
        sellPrdPrice: req.body.SellPrdPrice,
        sellPrdCategory: req.body.sellPrdCategory,
        imageFile: req.body.imageFile,
        insertionDate: new Date()
    }

    var collection = (req.body.sellPrdCategory).toLowerCase();

    dbo.getDb("campus-market")
        .collection(collection)
        .insertOne(myObj, function (err, out) {
            if (err) {
                res.json(err)
            } else {
                //console.log("the out in sell product details", JSON.stringify(out.insertedId));
                if (JSON.stringify(out.insertedId) != null) {
                    dbo.getDb("campus-market")
                        .collection("User_details")
                        .findOneAndUpdate(
                            { Email: req.body.Email },
                            { $push: { userProducts: { "id": out.insertedId, "category": req.body.sellPrdCategory } } },
                            function (err, out) {
                                if (err) { res.json(err) }
                                else {
                                    //console.log("the output is ..", out)
                                    var updated = out.lastErrorObject.updatedExisting;
                                    //console.log("the updated is ", updated)
                                    res.json(updated)
                                }
                            }
                        )
                }
            }
        })

});

// *************************************************************** get request : to get the products : to display *******************************************

Router.route("/product/:category/:university").get(function (req, res) {
    //console.log("in products", req.params.category , req.params.university)
    var collection = (req.params.category).toLowerCase()
    var university = (req.params.university).toLowerCase()
    let query = {}
    //console.log("the university params is ", university, (university != null))
    if (university != 'null') {
        //console.log("the university parameters are not null")
        query = { university: university }
    }
    else {
        //console.log("the university parameters are null")
        query = {}
    }
    //console.log("the query is ", query);
    //console.log("the collection", collection)
    dbo.getDb("campus_market")
        .collection(collection)
        .find(query)
        .toArray(function (err, out) {
            if (err) throw err;
            //console.log("the output is", out);
            if (out.length === 0) {
                res.json("NoProducts");
            } else { res.json(out); }

        });
})

// *************************************  lets get list of records *******************************************
Router.route("/get").get(function (req, res) {
    dbo.getDb("campus_market")
        .collection("User_details")
        .find({})
        .toArray(function (err, out) {
            if (err) throw err;
            res.json(out);
        });
});

// ************************************ checking login credentials ********************************************* 
Router.route("/checkLogin/:email").get(function (req, res) {
    //console.log("in check login route", req.params.email)
    let myquery = { Email: req.params.email }
    // console.log("my query is ", myquery);
    dbo.getDb("campus_market")
        .collection("User_details")
        .findOne(myquery, function (err, result) {
            if (err) { throw err; }
            // console.log(" the result is ", result)
            res.json(result)
        })
})

// ******************************************** reset password *************************************************
Router.route("/resetPwd").post(function (req, res) {
    //console.log("in reset password post request", req.body)
    dbo.getDb("campus_market")
        .collection("User_details")
        .findOneAndUpdate({ Email: req.body.Email }, { $set: { pwd: req.body.pwd }, $currentDate: { lastModified: true } }, function (err, result) {
            // console.log("the result in find and update is ", result.lastErrorObject.updatedExisting);
            if (err) { throw err }
            res.json({ "output": result.lastErrorObject.updatedExisting })
        })
})

// //  ************************************** adding new user ******************************************************
Router.route("/adduser").post(function (req, res) {
    //console.log("in adding the user");
    // console.log(" in post request ", req.body)
    let myquery = { Email: req.body.Email };
    // console.log("myquery is ", myquery);
    dbo.getDb("campus_market")
        .collection("User_details")
        .findOne(myquery, function (err, result) {
            if (err) { throw err }
            // console.log("the result is ",result)
            if (result !== null) {
                res.json({ userExist: true })
            } else {
                // console.log("the req body is ", req.body)
                let myobj = {
                    Email: req.body.Email,
                    FName: req.body.Fname,
                    LName: req.body.LName,
                    university: req.body.university,
                    pwd: req.body.pwd,
                    userProducts: req.body.userProducts,
                    userBookmarks: req.body.userBookmarks,
                    insertionDate: new Date()

                }
                // console.log(" my object is ",req.body, myobj)
                dbo.getDb("campus_market")
                    .collection("User_details")
                    .insertOne(myobj, function (err, out) {
                        if (err) throw err;
                        res.json(out);
                    })
            }
        })
})




module.exports = Router;

