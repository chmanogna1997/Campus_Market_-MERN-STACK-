const express = require("express");
// const fileUpload = require('express-fileupload')
// const multer = require('multer');
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.Backend_PORT || 8080;
app.use(cors());
app.use(express.json());

// enables image Upload
app.use(express.static('../public'))

app.use(require("./routes/record"))
// get driver connection
const dbo = require("./db/dbconn");

app.listen(port, () =>{
    // connecting to db
    dbo.connectToServer(function(err){
        if(err){console.error(err)}
    });
    console.log(`server is running on ${port}`)
})
