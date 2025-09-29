const express = require('express');
const fs = require('fs');
const bodyparser = require('body-parser');
//start the express.js
const app = express();
const PORT = 5128;

//set to publicly available
app.use(express.static("public"));

app.use(express.urlencoded({extended: false}));

//set viewengine
app.set("view engine", "ejs");

app.get("/", (req, res)=>{
    res.render("index");    
});
app.get("/resurgence", (req, res)=>{
    res.render("resurgence");
});
app.get("/voidTrader", (req, res)=>{
    res.render("voidTrader");
});
app.get("/register", (req, res)=>{
    res.render("register");
});

app.post("/register",(req, res)=>{
    console.log(req.body);
    fs.open("public/txt/accountRegister.json", "a", (err, file)=> {
        if(err){
            throw err
        }
        else {
            fs.appendFile("public/txt/accountRegister.json", req.body.email + "\n", (err)=>{
                if (err) {
                    throw (err);
                }
                else {
                    console.log("done ig");
                    res.render("/");
                }
            });
        }

    });
});



app.listen(PORT);