const express = require('express');
//start the express.js
const app = express();
const PORT = 5128;

//set to publicly available
app.use(express.static("public"));
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





app.listen(PORT);