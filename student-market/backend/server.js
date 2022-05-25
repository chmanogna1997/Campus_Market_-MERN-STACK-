const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.Backend_PORT || 1100;
app.use(cors());
app.use(express.json());

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
