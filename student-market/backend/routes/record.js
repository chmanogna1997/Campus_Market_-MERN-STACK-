const express = require("express");

// the router will be added as middleware and controls the request starting with path /
const Router = express.Router();

// this will connect to database
const dbo = require("../db/dbconn");

//****************************************************************************
// get user profile
Router.route("/bookmarks/:email").get(function(req,res){
//    let myquery = {Email: req.params.email}
  console.log("in bookmarks tio get bookmarks")

})

// ************************************************************************
// lets update bookmark details

Router.route("/updateBookmarks").post(function(req,res){
    console.log("in update bookmarks post request", req.body)
    dbo.getDb("campus_market")
    .collection("User_details")
    .findOneAndUpdate({Email : req.body.Email}, {$set : {userBookmarks : req.body.bookmarks} , $currentDate: { lastModified: true }}, function(err,result){
        //console.log("the result in find and update is ", result);
        if(err){ throw err}
        res.json({"output" : result.lastErrorObject.updatedExisting})
    })
})
//  *********************************************************************
//getting sell product details
Router.route("/sellProducts").post(function(req,res){
     let myObj = {
         Email : req.body.Email,
         university : req.body.university,
         sellPrdName : req.body.sellPrdName,
         sellPrdDescrpt : req.body.sellPrdDescrpt,
         sellPrdPrice : req.body.SellPrdPrice,
        sellPrdCategory : req.body.sellPrdCategory,
        imageFile : req.body.imageFile,
        insertionDate : new Date()
     }

     var collection = (req.body.sellPrdCategory).toLowerCase();

     dbo.getDb("campus-market")
     .collection(collection)
     .insertOne(myObj, function(err,out){
         if(err){
             res.json(err)
         }else{
            //console.log("the out in sell product details", JSON.stringify(out.insertedId));
            if(JSON.stringify(out.insertedId) != null){
                dbo.getDb("campus-market")
                .collection("User_details")
                .findOneAndUpdate(
                    {Email : req.body.Email},
                    {$push : {userProducts : JSON.stringify(out.insertedId)}},
                    function(err, out){
                        if(err){res.json(err)}
                        else{
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

// **************************************************************************
//  get request : to get the products
Router.route("/product/:category/:university").get(function(req,res){
    //console.log("in products", req.params.category , req.params.university)
    var collection = (req.params.category).toLowerCase()
    var university = (req.params.university).toLowerCase()
    let query = {}
    //console.log("the university params is ", university, (university != null))
    if(university != 'null'){
        //console.log("the university parameters are not null")
          query = {university : university}
        }
          else{ 
              //console.log("the university parameters are null")
              query = {} }
    //console.log("the query is ", query);
    //console.log("the collection", collection)
    dbo.getDb("campus_market")
    .collection(collection)
    .find(query)
    .toArray(function(err, out){
        if (err) throw err;
         //console.log("the output is", out);
         if(out.length === 0){
             res.json("NoProducts");
         }else{ res.json(out);}
       
    });
})



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
    //console.log("in check login route", req.params.email)
    let myquery = {Email: req.params.email}
   // console.log("my query is ", myquery);
    dbo.getDb("campus_market")
    .collection("User_details")
    .findOne(myquery, function(err,result){
        if(err) {throw err;}
       // console.log(" the result is ", result)
        res.json(result)
    })
})

// reset password
Router.route("/resetPwd").post(function(req,res){
    //console.log("in reset password post request", req.body)
    dbo.getDb("campus_market")
    .collection("User_details")
    .findOneAndUpdate({Email : req.body.Email}, {$set : {pwd : req.body.pwd} , $currentDate: { lastModified: true }}, function(err,result){
       // console.log("the result in find and update is ", result.lastErrorObject.updatedExisting);
        if(err){ throw err}
        res.json({"output" : result.lastErrorObject.updatedExisting})
    })
})

// // adding new user
Router.route("/adduser").post(function(req,res){
    //console.log("in adding the user");
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
                pwd : req.body.pwd,
                userProducts : req.body.userProducts,
                userBookmarks : req.body.userBookmarks,
                insertionDate : new Date()

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




module.exports = Router;

