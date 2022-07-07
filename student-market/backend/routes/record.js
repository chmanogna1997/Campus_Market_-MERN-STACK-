const { response, json } = require("express");
const express = require("express");

// import {Buffer} from 'buffer';
const {Buffer} = require("buffer")
// the router will be added as middleware and controls the request starting with path /
const Router = express.Router();

// this will connect to database
const dbo = require("../db/dbconn");

//This will help us to convert id ( params id ) from string to objectid
const ObjectId = require("mongodb").ObjectId;

// need this to read the image file
const fs = require('fs');
//  *********************************************************************
const multer = require('multer');

// give destination where image is getting uploaded
const storage = multer.diskStorage({
    // where should we store the image
destination:(req,file,callback)=> { callback(null,'uploads') },
// name of the image file
filename: (req,file,callback)=>{callback(null,file.originalname)}
})

// now need to configuring the storage : telling use this storage
//  const upload = multer({storage:storage}); ===> this is used to store/upload single image

// upload sing le file ::
const uupload = multer({storage:storage});
// to upload multiple images
const upload = multer({storage:storage}).array('files',5);

// ******************************************************************************
// sell products by user
// make sure that image variable name we are giving inside single ( should match the variable name) must match
// Router.post("/sellProducts", upload.single('prdimage') , function(req,res){

Router.post('/sellProducts',function(req,res){ upload(req,res,function(err){
        if(err){ throw err }
         var image_data_array = new ArrayBuffer(req.files.length);

         for(var i=0; i<req.files.length; i++){
            var image_data = fs.readFileSync('uploads/' + req.files[i].filename);
            console.log("the image before is  data is ", image_data);
            console.log("the typeof image data is ", typeof(image_data))
            image_data_array[i] = image_data
            console.log("the image data after is ", image_data_array[i] )
         }
        let myobj = {
            Email : req.body.Email,
            university : req.body.university,
            sellPrdName : req.body.sellPrdName,
            sellPrdDescrpt : req.body.sellPrdDescrpt,
            sellPrdPrice : req.body.SellPrdPrice,
            sellPrdCategory : req.body.sellPrdCategory,
            imageData : image_data_array
        }
        var collection = (req.body.sellPrdCategory).toLowerCase();
        // console.log("the collection is ************* ", collection);
        dbo.getDb("campus_market")
        .collection(collection)
        .insertOne(myobj,function(err,out){
            // if(err) throw err;
            // console.log("the output of inserting product is ", out)
            // checking if the record is inserted to its collection : adding its id to user products
            JSON.stringify(out.insertedId)
            if(JSON.stringify(out.insertedId) != null){
                dbo.getDb("campus_market")
                .collection("User_details")
                .findOneAndUpdate({Email : req.body.Email}, {$push : { userProducts : JSON.stringify(out.insertedId)}}, function(err,result){
                    if(err){ throw err}
                    // console.log("the result is ", result)
                    res.json({"output" : result})
                })
            }
            else(
                res.json({"err" : "error while updtaing"})
            )

        })
    })
});

// need to upload multiple images ( array of images) :: works only for single file
Router.post("/ssellProducts", uupload.single('sellPrdImages') , function(req,res){
    const image_data = fs.readFileSync('uploads/'+ req.file.filename);
    // console.log(image_data);
    console.log("in sell products", req.file)
    console.log("the body is ", req.body);
    let myobj = {
        Email : req.body.Email,
        university : req.body.university,
        sellPrdName : req.body.sellPrdName,
        sellPrdDescrpt : req.body.sellPrdDescrpt,
        sellPrdPrice : req.body.SellPrdPrice,
        sellPrdCategory : req.body.sellPrdCategory,
        imageData : image_data
    }
    dbo.getDb("campus_market")
    .collection("books")
    .insertOne(myobj, function(err,out){
        if(err) throw err;
        console.log("the output is ", JSON.stringify(out.insertedId));
        res.json(out);
    })
})

//  get request : to get the products
Router.route("/product/:category/:university").get(function(req,res){
    console.log("books :: ", req.params.category , req.params.university)
    var collection = (req.params.category).toLowerCase()
    console.log("the collection", collection)
    dbo.getDb("campus_market")
    .collection(collection)
    .find({})
    .toArray(function(err, out){
        if (err) throw err;
        // console.log("the output is", out);
        res.json(out);
    });
    // res.send("boom hello hello");
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
    console.log("in adding the user");
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

