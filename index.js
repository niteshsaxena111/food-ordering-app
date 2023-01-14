const mysql = require ("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
app.use("/MOMOMIA",express.static("/MOMOMIA"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "food craving1"
});

// connect to the database
connection.connect(function(error){
    if (error) throw error
    else console.log("connected to the database successfully!")
});


app.get("/",function(req,res){
    res.sendFile(__dirname + "/login/index.html");
})

app.post("/",encoder, function(req,res){
    var email = req.body.email;
    var password = req.body.password;

    connection.query("select * from loginuser where email = ? and user_pass = ?",[email,password],function(error,results,fields){
        if (results.length > 0) {
            res.redirect("/index.html");
        } else {
            res.redirect("/");
        }
        res.end();
    })
})

// when login is success
app.get("/login/index.html",function(req,res){
    res.sendFile(__dirname + "/login/index.html")
})


// set app port 
app.listen(4000);