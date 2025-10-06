const express = require('express');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2')
const bodyparser = require('body-parser');
//start the express.js
const accountsPath = "./public/txt/accountRegister.json";
const rateLimit = require('express-rate-limit');
const { body } = require('express-validator');
const app = express();
const PORT = 5228;
const dbInfo = require("../../vp2025config")
//set to publicly available
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//set viewengine
app.set("view engine", "ejs");

//create database connection
const connectionDatabase = mysql.createConnection({
  host: dbInfo.configData.host,
  user: dbInfo.configData.user,
  password: dbInfo.configData.passWord,
  database: dbInfo.configData.dataBase
});






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
    res.render("register", { form: { username: '', email: '' }, errors: {}, message: '', messageType: '' });
});

app.get("/database", (req, res) => {
  const sqlReq = "SELECT * FROM person";
  connectionDatabase.execute(sqlReq, (err, sqlres) => {
    if (err) {
      console.error("DB query error:", err);
      return res.render("database", { rows: [], error: "Database error" });
    }
    res.render("database", { rows: sqlres, error: null });
  });
});


const registerHandler = require("./public/scripts/register")(accountsPath);
app.post('/register', registerHandler);


app.listen(PORT);