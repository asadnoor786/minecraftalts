const express = require("express");
const app = express();
const port = process.env.PORT || 80;
const fs = require("fs");
const mongoose = require("mongoose");
const path = require("path");
const mailer = require("nodemailer");
var emailsender = mailer.createTransport({
    host : 'smtp.gmail.com',
    port : 587,
    secure : false,
    requireTLS: true,
    auth :{
        user : "educationalmirchi@gmail.com",
        pass : "Shaguftanaz@123"
    }
});
const bodyParser = require("body-parser");
app.listen(port, () => {
    console.log("Server Started!");
});
mongoose.connect('mongodb+srv://asadnoor:shaguftanaz@cluster0.araou.mongodb.net/minecraftalts?retryWrites=true&w=majority', {useNewUrlParser : true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, "error"));
db.once('open', ()=>{
    console.log("Connected!");
});
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
var signupStruc = new mongoose.Schema({
    name : String,
    email : String,
    password : String
});
var accStruc = mongoose.Schema({
    email : String,
    pass : String
});
var reportStruc = mongoose.Schema({
    name : String,
    email : String,
    topic : String,
    problem : String
});
var signup = mongoose.model("Signups", signupStruc);
var acc = mongoose.model("accounts", accStruc);
var problems = mongoose.model("Problems", reportStruc);
app.get("/", (req, res) => {
    res.sendFile(__dirname+"/public/index.html");
});
app.get("/login", (req, res) => {
    res.sendFile(__dirname+"/public/login.html");
});
app.get("/signUp", (req, res) => {
    res.sendFile(__dirname+"/public/register.html");
});
app.get("/resetPassword", (req, res) => {
    res.sendFile(__dirname+"/public/forgot-password.html");
});

var arr = new Array();
app.get("/dashboard", (req, res) => {
    
    var totalAcc=0;
    acc.find({}, (err, user) => {
        if(err) {
            res.end("something went wrong");
            console.log("nah");
        }
        else {
              totalAcc = user.length;
              res.end(`
              <!DOCTYPE html>
              <html lang="en">
              <head>
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet">
                  <link rel="stylesheet" href="CSS/dashboard.css">
                  <script src="JS/dashboard.js"></script>
                  <meta charset="UTF-8">
                  <meta http-equiv="X-UA-Compatible" content="IE=edge">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>{Welcome User}</title>
              </head>
              <body onload="loadBody()" id="bodyy">
                  <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js" defer data-deferred="1"></script>
                  <div id="particles-js" class="particles1"></div>
                  <div id="header">
                      <button id="btn1" onclick="menuOpen()"></button>
                      <button id="btn2" onclick="menuOpen()"></button>
                      <button id="btn3" onclick="menuOpen()"></button>
                      <img src="" id="ico">
                      <ul id="ul">
                      <a href="/dashboard"><li>Dashboard</li></a>
                      <a href="/freeGenerator"><li>Generators</li></a>
                      <a href="/aboutUs"><li>About Us</li></a>
                      <a href="/reportProblem"><li>Report Problem</li></a>
                      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><li>Youtube</li></a>
                      </ul>
                  </div>
                  <div id="menu">
                      <ul id="ul1">
                      <a href="/dashboard"><li>Dashboard</li></a>
                      <a href="/freeGenerator"><li>Generators</li></a>
                      <a href="/aboutUs"><li>About Us</li></a>
                      <a href="/reportProblem"><li>Report Problem</li></a>
                      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><li>Youtube</li></a>
                      </ul>
                  </div>
                  <div id="generated-today">
                      <span id="today-num">0</span>
                      <span id="total-text">Total Alts Generated Today</span>
                      <meter id="meter1"></meter>
                  </div>
                  <div id="total-generated">
                      <span id="total-num">0</span>
                      <span id="total-text">Total Alts Generated</span>
                      <meter id="meter2"></meter>
                  </div>
                  <div id="total-left">
                      <span id="pre-total-num">0</span>
                      <span id="total-text">Total Alts Left</span>
                      <meter id="meter3"></meter>
                  </div>
                      <div id="close" onclick="closeMenu()"></div>
                      <div id="refill-message">
                          <span id="refill-text">Notifications</span>
                          <iframe id="refill-container">
                          </iframe>
                       </div>
                      <div id="welcome-message">
                         <span id="logout-text">Want To Leave This Place?</span>
                         <button id="logout-btn" onclick="deleteHistory()">Logout</button>
                      </div>
                      <div id="advertisement"><center><big><big>Advertisement</big></big></center></div>
                      <script>
           localStorage.setItem("total-left", ${totalAcc});
        </script>
              </body>
              </html>
    `);
        }
    })
    
})

app.post("/signUp", (req, res) => {
    var data = req.body;
    var email = data.email;
    signup.find({email : email}, (err, user) => {
        if(user.length>0) {
            var dat = new Date();
            res.end(`
            <!doctype html>
<html class="no-js" lang="">

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Minecraft Alts</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Favicon -->
    <link rel="shortcut icon" type="image/x-icon" href="img/favicon.png">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/bootstrap-rtl.min.css">
    <!-- Fontawesome CSS -->
    <link rel="stylesheet" href="css/fontawesome-all.min.css">
    <!-- Flaticon CSS -->
    <link rel="stylesheet" href="font/flaticon.css">
    <!-- Google Web Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">
    <!-- Custom CSS -->
    <style>
    html {
height: 100%;
}
body {
font-size: 16px;
font-family: 'Roboto', sans-serif;
font-weight: 400;
height: 100%;
line-height: 1.7;
vertical-align: baseline;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-rendering: optimizeLegibility;
color: #646464;
background-color: #fff;
}
p {
margin: 0 0 20px 0;
color: #646464;
}
h1,
h2,
h3,
h4,
h5,
h6 {
font-weight: 400;
font-family: 'Roboto', sans-serif;
margin: 0 0 20px 0;
color: #111;
}
h1,
h2 {
line-height: 1.2;
}
h3,
h4,
h5,
h6 {
line-height: 1.4;
}
h1 {
font-size: 36px;
}
@media only screen and (max-width: 1199px) {
h1 {
font-size: 34px;
}
}
@media only screen and (max-width: 991px) {
h1 {
font-size: 32px;
}
}
@media only screen and (max-width: 767px) {
h1 {
font-size: 30px;
}
}
h2 {
font-size: 28px;
}
@media only screen and (max-width: 1199px) {
h2 {
font-size: 26px;
}
}
@media only screen and (max-width: 991px) {
h2 {
font-size: 24px;
}
}
@media only screen and (max-width: 767px) {
h2 {
font-size: 22px;
}
}
h3 {
font-size: 22px;
}
@media only screen and (max-width: 991px) {
h3 {
font-size: 20px;
}
}
@media only screen and (max-width: 767px) {
h3 {
font-size: 18px;
}
}
h4 {
font-size: 20px;
}
@media only screen and (max-width: 991px) {
h4 {
font-size: 18px;
}
}
@media only screen and (max-width: 767px) {
h4 {
font-size: 16px;
}
}
h5 {
font-size: 18px;
}
@media only screen and (max-width: 991px) {
h5 {
font-size: 16px;
}
}
/*=======================================================================
Default Style
=========================================================================*/
a {
text-decoration: none;
}
a:active,
a:hover,
a:focus {
text-decoration: none;
}
a:active,
a:hover,
a:focus {
outline: 0 none;
}
img {
max-width: 100%;
height: auto;
}
ul {
list-style: outside none none;
margin: 0;
padding: 0;
}
.fxt-content-between {
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
-webkit-box-pack: justify;
-ms-flex-pack: justify;
justify-content: space-between;
-ms-flex-wrap: wrap;
flex-wrap: wrap;
}
@media only screen and (max-width: 767px) {
.fxt-none-767 {
display: none !important;
}
}
@media only screen and (max-width: 991px) {
.fxt-none-991 {
display: none !important;
}
}
/*========================================================================
Template Animation
=========================================================================*/
.fxt-template-animation {
position: relative;
z-index: 1;
width: 100%;
opacity: 0;
overflow: hidden;
-webkit-transition: all 0.3s ease-in-out;
-o-transition: all 0.3s ease-in-out;
transition: all 0.3s ease-in-out;
}
.fxt-template-animation .fxt-transformY-50 {
opacity: 0;
-webkit-transform: translateY(50px);
-ms-transform: translateY(50px);
transform: translateY(50px);
}
.loaded.fxt-template-animation {
opacity: 1;
}
.loaded.fxt-template-animation .fxt-transformY-50 {
-webkit-transform: translateY(0);
-ms-transform: translateY(0);
transform: translateY(0);
opacity: 1;
-webkit-transition: all 1s ease-in-out;
-o-transition: all 1s ease-in-out;
transition: all 1s ease-in-out;
}
.loaded.fxt-template-animation .fxt-transition-delay-1 {
-webkit-transition-delay: 0.1s;
-o-transition-delay: 0.1s;
transition-delay: 0.1s;
}
.loaded.fxt-template-animation .fxt-transition-delay-2 {
-webkit-transition-delay: 0.2s;
-o-transition-delay: 0.2s;
transition-delay: 0.2s;
}
.loaded.fxt-template-animation .fxt-transition-delay-3 {
-webkit-transition-delay: 0.3s;
-o-transition-delay: 0.3s;
transition-delay: 0.3s;
}
.loaded.fxt-template-animation .fxt-transition-delay-4 {
-webkit-transition-delay: 0.4s;
-o-transition-delay: 0.4s;
transition-delay: 0.4s;
}
.loaded.fxt-template-animation .fxt-transition-delay-5 {
-webkit-transition-delay: 0.5s;
-o-transition-delay: 0.5s;
transition-delay: 0.5s;
}
.loaded.fxt-template-animation .fxt-transition-delay-6 {
-webkit-transition-delay: 0.6s;
-o-transition-delay: 0.6s;
transition-delay: 0.6s;
}
.loaded.fxt-template-animation .fxt-transition-delay-7 {
-webkit-transition-delay: 0.7s;
-o-transition-delay: 0.7s;
transition-delay: 0.7s;
}
.loaded.fxt-template-animation .fxt-transition-delay-8 {
-webkit-transition-delay: 0.8s;
-o-transition-delay: 0.8s;
transition-delay: 0.8s;
}
.loaded.fxt-template-animation .fxt-transition-delay-9 {
-webkit-transition-delay: 0.9s;
-o-transition-delay: 0.9s;
transition-delay: 0.9s;
}
.loaded.fxt-template-animation .fxt-transition-delay-10 {
-webkit-transition-delay: 1s;
-o-transition-delay: 1s;
transition-delay: 1s;
}
.loaded.fxt-template-animation .fxt-transition-delay-11 {
-webkit-transition-delay: 1.1s;
-o-transition-delay: 1.1s;
transition-delay: 1.1s;
}
.loaded.fxt-template-animation .fxt-transition-delay-12 {
-webkit-transition-delay: 1.2s;
-o-transition-delay: 1.2s;
transition-delay: 1.2s;
}
.loaded.fxt-template-animation .fxt-transition-delay-13 {
-webkit-transition-delay: 1.3s;
-o-transition-delay: 1.3s;
transition-delay: 1.3s;
}
.loaded.fxt-template-animation .fxt-transition-delay-14 {
-webkit-transition-delay: 1.4s;
-o-transition-delay: 1.4s;
transition-delay: 1.4s;
}
.loaded.fxt-template-animation .fxt-transition-delay-15 {
-webkit-transition-delay: 1.5s;
-o-transition-delay: 1.5s;
transition-delay: 1.5s;
}
.loaded.fxt-template-animation .fxt-transition-delay-16 {
-webkit-transition-delay: 1.6s;
-o-transition-delay: 1.6s;
transition-delay: 1.6s;
}
.loaded.fxt-template-animation .fxt-transition-delay-17 {
-webkit-transition-delay: 1.7s;
-o-transition-delay: 1.7s;
transition-delay: 1.7s;
}
.loaded.fxt-template-animation .fxt-transition-delay-18 {
-webkit-transition-delay: 1.8s;
-o-transition-delay: 1.8s;
transition-delay: 1.8s;
}
.loaded.fxt-template-animation .fxt-transition-delay-19 {
-webkit-transition-delay: 1.9s;
-o-transition-delay: 1.9s;
transition-delay: 1.9s;
}
.loaded.fxt-template-animation .fxt-transition-delay-20 {
-webkit-transition-delay: 2s;
-o-transition-delay: 2s;
transition-delay: 2s;
}

/*========================================================================
Login/Register Layout
=========================================================================*/
.fxt-template-layout18 {
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
-webkit-box-pack: center;
-ms-flex-pack: center;
justify-content: center;
width: 100%;
background-repeat: no-repeat;
background-position: center;
background-size: cover;
position: relative;
min-height: 100vh;
z-index: 1;
padding: 15px;
}
.fxt-template-layout18:before {
content: "";
height: 100%;
width: 100%;
background-color: rgba(0, 0, 0, 0.1);
left: 0;
top: 0;
position: absolute;
z-index: -1;
}
.fxt-template-layout18 .fxt-checkbox-area {
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
-webkit-box-pack: justify;
-ms-flex-pack: justify;
justify-content: space-between;
margin-bottom: 30px;
-ms-flex-wrap: wrap;
flex-wrap: wrap;
}
.fxt-template-layout18 .fxt-content {
max-width: 600px;
width: 100%;
background-color: rgba(0, 0, 0, 0.8);
padding: 80px 80px 60px;
}
@media only screen and (max-width: 767px) {
.fxt-template-layout18 .fxt-content {
padding: 70px 60px 50px;
}
}
@media only screen and (max-width: 575px) {
.fxt-template-layout18 .fxt-content {
padding: 60px 40px 40px;
}
}
@media only screen and (max-width: 479px) {
.fxt-template-layout18 .fxt-content {
padding: 50px 20px 30px;
}
}
.fxt-template-layout18 .fxt-header {
text-align: center;
margin-bottom: 50px;
}
.fxt-template-layout18 .fxt-logo {
display: block;
margin-bottom: 100px;
margin-left: auto;
margin-right: auto;
max-width: 40vw;
}
@media only screen and (max-width: 991px) {
.fxt-template-layout18 .fxt-logo {
margin-bottom: 80px;
}
}
@media only screen and (max-width: 767px) {
.fxt-template-layout18 .fxt-logo {
margin-bottom: 60px;
}
}
@media only screen and (max-width: 575px) {
.fxt-template-layout18 .fxt-logo {
margin-bottom: 40px;
}
}
.fxt-template-layout18 .fxt-form p {
font-size: 20px;
color: #fff;
}
@media only screen and (max-width: 767px) {
.fxt-template-layout18 .fxt-form p {
text-align: center;
}
}
.fxt-template-layout18 .fxt-form .form-group {
position: relative;
z-index: 1;
}
.fxt-template-layout18 .fxt-form .form-group .field-icon {
position: absolute;
z-index: 1;
left: 19px;
bottom: 18px;
font-size: 14px;
color: #bebebe;
}
.fxt-template-layout18 .fxt-form .form-group .field-icon:before {
padding: 17px 10px;
}
.fxt-template-layout18 .fxt-form .form-control {
min-height: 50px;
-webkit-box-shadow: none;
box-shadow: none;
border: 1px solid rgba(255, 255, 255, 0.3);
padding: 10px 15px;
background-color: transparent;
color: #fff;
}
.fxt-template-layout18 .fxt-form input::-webkit-input-placeholder {
color: #bebebe;
font-size: 18px;
font-weight: 300;
}
.fxt-template-layout18 .fxt-form input::-moz-placeholder {
color: #bebebe;
font-size: 18px;
font-weight: 300;
}
.fxt-template-layout18 .fxt-form input:-moz-placeholder {
color: #bebebe;
font-size: 18px;
font-weight: 300;
}
.fxt-template-layout18 .fxt-form input:-ms-input-placeholder {
color: #bebebe;
font-size: 18px;
font-weight: 300;
}
.fxt-template-layout18 .fxt-btn-fill {
font-family: 'Roboto', sans-serif;
cursor: pointer;
display: inline-block;
font-size: 17px;
font-weight: 500;
-webkit-box-shadow: none;
box-shadow: none;
outline: none;
border: 0;
color: #fff;
border-radius: 3px;
background-color: #1fbe66;
padding: 10px 36px;
margin-bottom: 10px;
width: 100%;
-webkit-transition: all 0.3s ease-in-out;
-o-transition: all 0.3s ease-in-out;
transition: all 0.3s ease-in-out;
}
.fxt-template-layout18 .fxt-btn-fill:hover {
background-color: #17a156;
border-color: #17a156;
}
.fxt-template-layout18 .fxt-btn-fill:focus {
outline: none;
}
.fxt-template-layout18 .switcher-text {
color: #d4d4d4;
text-decoration: underline;
font-size: 15px;
margin-bottom: 5px;
display: block;
-webkit-transition: all 0.3s ease-in-out;
-o-transition: all 0.3s ease-in-out;
transition: all 0.3s ease-in-out;
}
.fxt-template-layout18 .switcher-text:hover {
color: #ffffff;
}
.fxt-template-layout18 .switcher-text2 {
color: #d4d4d4;
text-decoration: underline;
font-size: 15px;
display: inline-block;
-webkit-transition: all 0.3s ease-in-out;
-o-transition: all 0.3s ease-in-out;
transition: all 0.3s ease-in-out;
}
.fxt-template-layout18 .switcher-text2.inline-text {
margin-right: 3px;
}
.fxt-template-layout18 .switcher-text2:hover {
color: #ffffff;
}
.fxt-template-layout18 .fxt-style-line {
overflow: hidden;
text-align: center;
}
.fxt-template-layout18 .fxt-style-line h3 {
text-align: center;
font-weight: 300;
margin-bottom: 30px;
font-size: 20px;
color: #a4a4a4;
display: inline-block;
position: relative;
padding: 0 25px;
z-index: 1;
}
.fxt-template-layout18 .fxt-style-line h3:before {
display: inline-block;
content: "";
height: 1px;
width: 100%;
background-color: #a4a4a4;
left: 100%;
top: 50%;
-webkit-transform: translateY(-50%);
-ms-transform: translateY(-50%);
transform: translateY(-50%);
position: absolute;
z-index: 1;
}
.fxt-template-layout18 .fxt-style-line h3:after {
display: inline-block;
content: "";
height: 1px;
width: 100%;
background-color: #a4a4a4;
right: 100%;
top: 50%;
-webkit-transform: translateY(-50%);
-ms-transform: translateY(-50%);
transform: translateY(-50%);
position: absolute;
z-index: 1;
}
.fxt-template-layout18 ul.fxt-socials {
display: -ms-flexbox;
display: -webkit-box;
display: flex;
-ms-flex-wrap: wrap;
flex-wrap: wrap;
-webkit-box-pack: center;
-ms-flex-pack: center;
justify-content: center;
margin-right: -5px;
margin-left: -5px;
margin-bottom: 20px;
}
.fxt-template-layout18 ul.fxt-socials li {
max-width: 100%;
-webkit-box-flex: 0;
-ms-flex: 0 0 33.33333%;
flex: 0 0 33.33333%;
padding-left: 5px;
padding-right: 5px;
margin-bottom: 10px;
}
@media only screen and (max-width: 575px) {
.fxt-template-layout18 ul.fxt-socials li {
-webkit-box-flex: 0;
-ms-flex: 0 0 50%;
flex: 0 0 50%;
}
}
@media only screen and (max-width: 350px) {
.fxt-template-layout18 ul.fxt-socials li {
-webkit-box-flex: 0;
-ms-flex: 0 0 100%;
flex: 0 0 100%;
}
}
.fxt-template-layout18 ul.fxt-socials li a {
border-radius: 2px;
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
-webkit-box-pack: flex-start;
-ms-flex-pack: flex-start;
justify-content: flex-start;
font-size: 14px;
height: 45px;
color: #ffffff;
-webkit-transition: all 0.3s ease-in-out;
-o-transition: all 0.3s ease-in-out;
transition: all 0.3s ease-in-out;
}
.fxt-template-layout18 ul.fxt-socials li a i {
border-radius: 2px 0 0 2px;
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
-webkit-box-pack: center;
-ms-flex-pack: center;
justify-content: center;
width: 45px;
height: 45px;
}
.fxt-template-layout18 ul.fxt-socials li a span {
height: 100%;
width: 100%;
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
-webkit-box-pack: center;
-ms-flex-pack: center;
justify-content: center;
-webkit-box-flex: 1;
-ms-flex: 1;
flex: 1;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-facebook a {
background-color: #3b5998;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-facebook a i {
background-color: #4867aa;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-facebook a:hover {
background-color: #5676bb;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-twitter a {
background-color: #00acee;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-twitter a i {
background-color: #33ccff;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-twitter a:hover {
background-color: #3dc5f3;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-google a {
background-color: #CC3333;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-google a i {
background-color: #db4437;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-google a:hover {
background-color: #e75042;
}
.fxt-template-layout18 .checkbox {
padding-right: 5px;
margin-left: 30px;
margin-bottom: 5px;
}
.fxt-template-layout18 .checkbox label {
padding-right: 20px;
color: #b9b9b9;
margin-bottom: 0;
font-size: 15px;
position: relative;
}
.fxt-template-layout18 .checkbox label:before {
content: "";
position: absolute;
width: 16px;
height: 16px;
top: 4px;
right: 0;
margin-right: -5px;
border: 1px solid;
border-color: #dcdcdc;
border-radius: 2px;
background-color: transparent;
-webkit-transition: border 0.15s ease-in-out, color 0.15s ease-in-out;
-o-transition: border 0.15s ease-in-out, color 0.15s ease-in-out;
transition: border 0.15s ease-in-out, color 0.15s ease-in-out;
}
.fxt-template-layout18 .checkbox label:after {
position: absolute;
margin-right: -20px;
padding-right: 3px;
font-size: 10px;
color: #555555;
}
.fxt-template-layout18 .checkbox input[type="checkbox"] {
display: none;
}
.fxt-template-layout18 .checkbox input[type="checkbox"]:checked + label::after {
font-family: 'Font Awesome 5 Free';
content: "\f00c";
font-weight: 900;
color: #ffffff;
right: 15px;
top: 4px;
}
.fxt-template-layout18 .checkbox input[type="checkbox"]:checked + label::before {
background-color: #1fbe66;
border-color: #1fbe66;
}
.fxt-template-layout18 .fxt-footer {
text-align: center;
}
.fxt-template-layout18 .fxt-footer p {
color: #b6b6b6;
}
</style>
</head>

<body>
    <section class="fxt-template-animation fxt-template-layout18" data-bg-image="img/figure/bg1.png">
        <div class="fxt-content">
            <div class="fxt-header">
                <a href="login.html" class="fxt-logo"><img src="img/logo.gif" alt="Logo" width="100" height="100"></a>
            </div>
            <div class="fxt-form">
                <p>Register for create account</p>
                <form method="POST">
                    <div class="form-group">
                        <div class="fxt-transformY-50 fxt-transition-delay-1">
                            <input type="text" id="name" class="form-control" name="name" placeholder="Name"
                                required="required">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="fxt-transformY-50 fxt-transition-delay-1">
                            <input type="email" id="email" class="form-control" name="email" placeholder="Email"
                                required="required">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="fxt-transformY-50 fxt-transition-delay-2">
                            <input id="password" type="password" class="form-control" name="password"
                                placeholder="********" required="required">
                            <i toggle="#password" class="fa fa-fw fa-eye toggle-password field-icon"></i>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="fxt-transformY-50 fxt-transition-delay-3">
                            <div class="fxt-checkbox-area">
                                <div class="checkbox">
                                    <input id="checkbox1" type="checkbox">
                                    <label for="checkbox1">Keep me logged in</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="fxt-transformY-50 fxt-transition-delay-4">
                            <button type="submit" class="fxt-btn-fill">Register</button>
                        </div>
                    </div>
                </form>
            </div>
            <!-- <div class="fxt-style-line">
                <div class="fxt-transformY-50 fxt-transition-delay-5">
                    <h3>Or Login With</h3>
                </div>
            </div>
            <ul class="fxt-socials">
                <li class="fxt-google">
                    <div class="fxt-transformY-50 fxt-transition-delay-6">
                        <a href="#" title="google"><i class="fab fa-google-plus-g"></i><span>Google +</span></a>
                    </div>
                </li>
                <li class="fxt-twitter">
                    <div class="fxt-transformY-50 fxt-transition-delay-7">
                        <a href="#" title="twitter"><i class="fab fa-twitter"></i><span>Twitter</span></a>
                    </div>
                </li>
                <li class="fxt-facebook">
                    <div class="fxt-transformY-50 fxt-transition-delay-8">
                        <a href="#" title="Facebook"><i class="fab fa-facebook-f"></i><span>Facebook</span></a>
                    </div>
                </li>
            </ul> -->
            <div class="fxt-footer">
                <div class="fxt-transformY-50 fxt-transition-delay-9">
                    <p><a href="/login" class="switcher-text2 inline-text">Log in</a> ?Have an account</p>
                </div>
            </div>
        </div>
    </section>
    <!-- jquery-->
    <script src="js/jquery-3.5.0.min.js"></script>
    <!-- Popper js -->
    <script src="js/popper.min.js"></script>
    <!-- Bootstrap js -->
    <script src="js/bootstrap.min.js"></script>
    <!-- Imagesloaded js -->
    <script src="js/imagesloaded.pkgd.min.js"></script>
    <!-- Validator js -->
    <script src="js/validator.min.js"></script>
    <!-- Custom Js -->
    <script src="js/main.js"></script>
<script>alert("User Already Registered With The Provided Email, Please Try Any Other Email");</script>
</body>
</html>
            `);
        }
        else {
            data = new signup(data);
             data.save();
             res.end(`
             <!doctype html>
<html class="no-js" lang="">

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Minecraft Alts</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Favicon -->
    <link rel="shortcut icon" type="image/x-icon" href="img/favicon.png">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/bootstrap-rtl.min.css">
    <!-- Fontawesome CSS -->
    <link rel="stylesheet" href="css/fontawesome-all.min.css">
    <!-- Flaticon CSS -->
    <link rel="stylesheet" href="font/flaticon.css">
    <!-- Google Web Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">
    <!-- Custom CSS -->
    <style>
    html {
height: 100%;
}
body {
font-size: 16px;
font-family: 'Roboto', sans-serif;
font-weight: 400;
height: 100%;
line-height: 1.7;
vertical-align: baseline;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-rendering: optimizeLegibility;
color: #646464;
background-color: #fff;
}
p {
margin: 0 0 20px 0;
color: #646464;
}
h1,
h2,
h3,
h4,
h5,
h6 {
font-weight: 400;
font-family: 'Roboto', sans-serif;
margin: 0 0 20px 0;
color: #111;
}
h1,
h2 {
line-height: 1.2;
}
h3,
h4,
h5,
h6 {
line-height: 1.4;
}
h1 {
font-size: 36px;
}
@media only screen and (max-width: 1199px) {
h1 {
font-size: 34px;
}
}
@media only screen and (max-width: 991px) {
h1 {
font-size: 32px;
}
}
@media only screen and (max-width: 767px) {
h1 {
font-size: 30px;
}
}
h2 {
font-size: 28px;
}
@media only screen and (max-width: 1199px) {
h2 {
font-size: 26px;
}
}
@media only screen and (max-width: 991px) {
h2 {
font-size: 24px;
}
}
@media only screen and (max-width: 767px) {
h2 {
font-size: 22px;
}
}
h3 {
font-size: 22px;
}
@media only screen and (max-width: 991px) {
h3 {
font-size: 20px;
}
}
@media only screen and (max-width: 767px) {
h3 {
font-size: 18px;
}
}
h4 {
font-size: 20px;
}
@media only screen and (max-width: 991px) {
h4 {
font-size: 18px;
}
}
@media only screen and (max-width: 767px) {
h4 {
font-size: 16px;
}
}
h5 {
font-size: 18px;
}
@media only screen and (max-width: 991px) {
h5 {
font-size: 16px;
}
}
/*=======================================================================
Default Style
=========================================================================*/
a {
text-decoration: none;
}
a:active,
a:hover,
a:focus {
text-decoration: none;
}
a:active,
a:hover,
a:focus {
outline: 0 none;
}
img {
max-width: 100%;
height: auto;
}
ul {
list-style: outside none none;
margin: 0;
padding: 0;
}
.fxt-content-between {
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
-webkit-box-pack: justify;
-ms-flex-pack: justify;
justify-content: space-between;
-ms-flex-wrap: wrap;
flex-wrap: wrap;
}
@media only screen and (max-width: 767px) {
.fxt-none-767 {
display: none !important;
}
}
@media only screen and (max-width: 991px) {
.fxt-none-991 {
display: none !important;
}
}
/*========================================================================
Template Animation
=========================================================================*/
.fxt-template-animation {
position: relative;
z-index: 1;
width: 100%;
opacity: 0;
overflow: hidden;
-webkit-transition: all 0.3s ease-in-out;
-o-transition: all 0.3s ease-in-out;
transition: all 0.3s ease-in-out;
}
.fxt-template-animation .fxt-transformY-50 {
opacity: 0;
-webkit-transform: translateY(50px);
-ms-transform: translateY(50px);
transform: translateY(50px);
}
.loaded.fxt-template-animation {
opacity: 1;
}
.loaded.fxt-template-animation .fxt-transformY-50 {
-webkit-transform: translateY(0);
-ms-transform: translateY(0);
transform: translateY(0);
opacity: 1;
-webkit-transition: all 1s ease-in-out;
-o-transition: all 1s ease-in-out;
transition: all 1s ease-in-out;
}
.loaded.fxt-template-animation .fxt-transition-delay-1 {
-webkit-transition-delay: 0.1s;
-o-transition-delay: 0.1s;
transition-delay: 0.1s;
}
.loaded.fxt-template-animation .fxt-transition-delay-2 {
-webkit-transition-delay: 0.2s;
-o-transition-delay: 0.2s;
transition-delay: 0.2s;
}
.loaded.fxt-template-animation .fxt-transition-delay-3 {
-webkit-transition-delay: 0.3s;
-o-transition-delay: 0.3s;
transition-delay: 0.3s;
}
.loaded.fxt-template-animation .fxt-transition-delay-4 {
-webkit-transition-delay: 0.4s;
-o-transition-delay: 0.4s;
transition-delay: 0.4s;
}
.loaded.fxt-template-animation .fxt-transition-delay-5 {
-webkit-transition-delay: 0.5s;
-o-transition-delay: 0.5s;
transition-delay: 0.5s;
}
.loaded.fxt-template-animation .fxt-transition-delay-6 {
-webkit-transition-delay: 0.6s;
-o-transition-delay: 0.6s;
transition-delay: 0.6s;
}
.loaded.fxt-template-animation .fxt-transition-delay-7 {
-webkit-transition-delay: 0.7s;
-o-transition-delay: 0.7s;
transition-delay: 0.7s;
}
.loaded.fxt-template-animation .fxt-transition-delay-8 {
-webkit-transition-delay: 0.8s;
-o-transition-delay: 0.8s;
transition-delay: 0.8s;
}
.loaded.fxt-template-animation .fxt-transition-delay-9 {
-webkit-transition-delay: 0.9s;
-o-transition-delay: 0.9s;
transition-delay: 0.9s;
}
.loaded.fxt-template-animation .fxt-transition-delay-10 {
-webkit-transition-delay: 1s;
-o-transition-delay: 1s;
transition-delay: 1s;
}
.loaded.fxt-template-animation .fxt-transition-delay-11 {
-webkit-transition-delay: 1.1s;
-o-transition-delay: 1.1s;
transition-delay: 1.1s;
}
.loaded.fxt-template-animation .fxt-transition-delay-12 {
-webkit-transition-delay: 1.2s;
-o-transition-delay: 1.2s;
transition-delay: 1.2s;
}
.loaded.fxt-template-animation .fxt-transition-delay-13 {
-webkit-transition-delay: 1.3s;
-o-transition-delay: 1.3s;
transition-delay: 1.3s;
}
.loaded.fxt-template-animation .fxt-transition-delay-14 {
-webkit-transition-delay: 1.4s;
-o-transition-delay: 1.4s;
transition-delay: 1.4s;
}
.loaded.fxt-template-animation .fxt-transition-delay-15 {
-webkit-transition-delay: 1.5s;
-o-transition-delay: 1.5s;
transition-delay: 1.5s;
}
.loaded.fxt-template-animation .fxt-transition-delay-16 {
-webkit-transition-delay: 1.6s;
-o-transition-delay: 1.6s;
transition-delay: 1.6s;
}
.loaded.fxt-template-animation .fxt-transition-delay-17 {
-webkit-transition-delay: 1.7s;
-o-transition-delay: 1.7s;
transition-delay: 1.7s;
}
.loaded.fxt-template-animation .fxt-transition-delay-18 {
-webkit-transition-delay: 1.8s;
-o-transition-delay: 1.8s;
transition-delay: 1.8s;
}
.loaded.fxt-template-animation .fxt-transition-delay-19 {
-webkit-transition-delay: 1.9s;
-o-transition-delay: 1.9s;
transition-delay: 1.9s;
}
.loaded.fxt-template-animation .fxt-transition-delay-20 {
-webkit-transition-delay: 2s;
-o-transition-delay: 2s;
transition-delay: 2s;
}

/*========================================================================
Login/Register Layout
=========================================================================*/
.fxt-template-layout18 {
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
-webkit-box-pack: center;
-ms-flex-pack: center;
justify-content: center;
width: 100%;
background-repeat: no-repeat;
background-position: center;
background-size: cover;
position: relative;
min-height: 100vh;
z-index: 1;
padding: 15px;
}
.fxt-template-layout18:before {
content: "";
height: 100%;
width: 100%;
background-color: rgba(0, 0, 0, 0.1);
left: 0;
top: 0;
position: absolute;
z-index: -1;
}
.fxt-template-layout18 .fxt-checkbox-area {
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
-webkit-box-pack: justify;
-ms-flex-pack: justify;
justify-content: space-between;
margin-bottom: 30px;
-ms-flex-wrap: wrap;
flex-wrap: wrap;
}
.fxt-template-layout18 .fxt-content {
max-width: 600px;
width: 100%;
background-color: rgba(0, 0, 0, 0.8);
padding: 80px 80px 60px;
}
@media only screen and (max-width: 767px) {
.fxt-template-layout18 .fxt-content {
padding: 70px 60px 50px;
}
}
@media only screen and (max-width: 575px) {
.fxt-template-layout18 .fxt-content {
padding: 60px 40px 40px;
}
}
@media only screen and (max-width: 479px) {
.fxt-template-layout18 .fxt-content {
padding: 50px 20px 30px;
}
}
.fxt-template-layout18 .fxt-header {
text-align: center;
margin-bottom: 50px;
}
.fxt-template-layout18 .fxt-logo {
display: block;
margin-bottom: 100px;
margin-left: auto;
margin-right: auto;
max-width: 40vw;
}
@media only screen and (max-width: 991px) {
.fxt-template-layout18 .fxt-logo {
margin-bottom: 80px;
}
}
@media only screen and (max-width: 767px) {
.fxt-template-layout18 .fxt-logo {
margin-bottom: 60px;
}
}
@media only screen and (max-width: 575px) {
.fxt-template-layout18 .fxt-logo {
margin-bottom: 40px;
}
}
.fxt-template-layout18 .fxt-form p {
font-size: 20px;
color: #fff;
}
@media only screen and (max-width: 767px) {
.fxt-template-layout18 .fxt-form p {
text-align: center;
}
}
.fxt-template-layout18 .fxt-form .form-group {
position: relative;
z-index: 1;
}
.fxt-template-layout18 .fxt-form .form-group .field-icon {
position: absolute;
z-index: 1;
left: 19px;
bottom: 18px;
font-size: 14px;
color: #bebebe;
}
.fxt-template-layout18 .fxt-form .form-group .field-icon:before {
padding: 17px 10px;
}
.fxt-template-layout18 .fxt-form .form-control {
min-height: 50px;
-webkit-box-shadow: none;
box-shadow: none;
border: 1px solid rgba(255, 255, 255, 0.3);
padding: 10px 15px;
background-color: transparent;
color: #fff;
}
.fxt-template-layout18 .fxt-form input::-webkit-input-placeholder {
color: #bebebe;
font-size: 18px;
font-weight: 300;
}
.fxt-template-layout18 .fxt-form input::-moz-placeholder {
color: #bebebe;
font-size: 18px;
font-weight: 300;
}
.fxt-template-layout18 .fxt-form input:-moz-placeholder {
color: #bebebe;
font-size: 18px;
font-weight: 300;
}
.fxt-template-layout18 .fxt-form input:-ms-input-placeholder {
color: #bebebe;
font-size: 18px;
font-weight: 300;
}
.fxt-template-layout18 .fxt-btn-fill {
font-family: 'Roboto', sans-serif;
cursor: pointer;
display: inline-block;
font-size: 17px;
font-weight: 500;
-webkit-box-shadow: none;
box-shadow: none;
outline: none;
border: 0;
color: #fff;
border-radius: 3px;
background-color: #1fbe66;
padding: 10px 36px;
margin-bottom: 10px;
width: 100%;
-webkit-transition: all 0.3s ease-in-out;
-o-transition: all 0.3s ease-in-out;
transition: all 0.3s ease-in-out;
}
.fxt-template-layout18 .fxt-btn-fill:hover {
background-color: #17a156;
border-color: #17a156;
}
.fxt-template-layout18 .fxt-btn-fill:focus {
outline: none;
}
.fxt-template-layout18 .switcher-text {
color: #d4d4d4;
text-decoration: underline;
font-size: 15px;
margin-bottom: 5px;
display: block;
-webkit-transition: all 0.3s ease-in-out;
-o-transition: all 0.3s ease-in-out;
transition: all 0.3s ease-in-out;
}
.fxt-template-layout18 .switcher-text:hover {
color: #ffffff;
}
.fxt-template-layout18 .switcher-text2 {
color: #d4d4d4;
text-decoration: underline;
font-size: 15px;
display: inline-block;
-webkit-transition: all 0.3s ease-in-out;
-o-transition: all 0.3s ease-in-out;
transition: all 0.3s ease-in-out;
}
.fxt-template-layout18 .switcher-text2.inline-text {
margin-right: 3px;
}
.fxt-template-layout18 .switcher-text2:hover {
color: #ffffff;
}
.fxt-template-layout18 .fxt-style-line {
overflow: hidden;
text-align: center;
}
.fxt-template-layout18 .fxt-style-line h3 {
text-align: center;
font-weight: 300;
margin-bottom: 30px;
font-size: 20px;
color: #a4a4a4;
display: inline-block;
position: relative;
padding: 0 25px;
z-index: 1;
}
.fxt-template-layout18 .fxt-style-line h3:before {
display: inline-block;
content: "";
height: 1px;
width: 100%;
background-color: #a4a4a4;
left: 100%;
top: 50%;
-webkit-transform: translateY(-50%);
-ms-transform: translateY(-50%);
transform: translateY(-50%);
position: absolute;
z-index: 1;
}
.fxt-template-layout18 .fxt-style-line h3:after {
display: inline-block;
content: "";
height: 1px;
width: 100%;
background-color: #a4a4a4;
right: 100%;
top: 50%;
-webkit-transform: translateY(-50%);
-ms-transform: translateY(-50%);
transform: translateY(-50%);
position: absolute;
z-index: 1;
}
.fxt-template-layout18 ul.fxt-socials {
display: -ms-flexbox;
display: -webkit-box;
display: flex;
-ms-flex-wrap: wrap;
flex-wrap: wrap;
-webkit-box-pack: center;
-ms-flex-pack: center;
justify-content: center;
margin-right: -5px;
margin-left: -5px;
margin-bottom: 20px;
}
.fxt-template-layout18 ul.fxt-socials li {
max-width: 100%;
-webkit-box-flex: 0;
-ms-flex: 0 0 33.33333%;
flex: 0 0 33.33333%;
padding-left: 5px;
padding-right: 5px;
margin-bottom: 10px;
}
@media only screen and (max-width: 575px) {
.fxt-template-layout18 ul.fxt-socials li {
-webkit-box-flex: 0;
-ms-flex: 0 0 50%;
flex: 0 0 50%;
}
}
@media only screen and (max-width: 350px) {
.fxt-template-layout18 ul.fxt-socials li {
-webkit-box-flex: 0;
-ms-flex: 0 0 100%;
flex: 0 0 100%;
}
}
.fxt-template-layout18 ul.fxt-socials li a {
border-radius: 2px;
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
-webkit-box-pack: flex-start;
-ms-flex-pack: flex-start;
justify-content: flex-start;
font-size: 14px;
height: 45px;
color: #ffffff;
-webkit-transition: all 0.3s ease-in-out;
-o-transition: all 0.3s ease-in-out;
transition: all 0.3s ease-in-out;
}
.fxt-template-layout18 ul.fxt-socials li a i {
border-radius: 2px 0 0 2px;
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
-webkit-box-pack: center;
-ms-flex-pack: center;
justify-content: center;
width: 45px;
height: 45px;
}
.fxt-template-layout18 ul.fxt-socials li a span {
height: 100%;
width: 100%;
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
-webkit-box-pack: center;
-ms-flex-pack: center;
justify-content: center;
-webkit-box-flex: 1;
-ms-flex: 1;
flex: 1;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-facebook a {
background-color: #3b5998;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-facebook a i {
background-color: #4867aa;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-facebook a:hover {
background-color: #5676bb;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-twitter a {
background-color: #00acee;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-twitter a i {
background-color: #33ccff;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-twitter a:hover {
background-color: #3dc5f3;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-google a {
background-color: #CC3333;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-google a i {
background-color: #db4437;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-google a:hover {
background-color: #e75042;
}
.fxt-template-layout18 .checkbox {
padding-right: 5px;
margin-left: 30px;
margin-bottom: 5px;
}
.fxt-template-layout18 .checkbox label {
padding-right: 20px;
color: #b9b9b9;
margin-bottom: 0;
font-size: 15px;
position: relative;
}
.fxt-template-layout18 .checkbox label:before {
content: "";
position: absolute;
width: 16px;
height: 16px;
top: 4px;
right: 0;
margin-right: -5px;
border: 1px solid;
border-color: #dcdcdc;
border-radius: 2px;
background-color: transparent;
-webkit-transition: border 0.15s ease-in-out, color 0.15s ease-in-out;
-o-transition: border 0.15s ease-in-out, color 0.15s ease-in-out;
transition: border 0.15s ease-in-out, color 0.15s ease-in-out;
}
.fxt-template-layout18 .checkbox label:after {
position: absolute;
margin-right: -20px;
padding-right: 3px;
font-size: 10px;
color: #555555;
}
.fxt-template-layout18 .checkbox input[type="checkbox"] {
display: none;
}
.fxt-template-layout18 .checkbox input[type="checkbox"]:checked + label::after {
font-family: 'Font Awesome 5 Free';
content: "\f00c";
font-weight: 900;
color: #ffffff;
right: 15px;
top: 4px;
}
.fxt-template-layout18 .checkbox input[type="checkbox"]:checked + label::before {
background-color: #1fbe66;
border-color: #1fbe66;
}
.fxt-template-layout18 .fxt-footer {
text-align: center;
}
.fxt-template-layout18 .fxt-footer p {
color: #b6b6b6;
}
</style>
</head>

<body>
    <section class="fxt-template-animation fxt-template-layout18" data-bg-image="img/figure/bg1.png">
        <div class="fxt-content">
            <div class="fxt-header">
                <a href="login.html" class="fxt-logo"><img src="img/logo.gif" alt="Logo" width="100" height="100"></a>
            </div>
            <div class="fxt-form">
                <p>Register for create account</p>
                <form method="POST">
                    <div class="form-group">
                        <div class="fxt-transformY-50 fxt-transition-delay-1">
                            <input type="text" id="name" class="form-control" name="name" placeholder="Name"
                                required="required">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="fxt-transformY-50 fxt-transition-delay-1">
                            <input type="email" id="email" class="form-control" name="email" placeholder="Email"
                                required="required">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="fxt-transformY-50 fxt-transition-delay-2">
                            <input id="password" type="password" class="form-control" name="password"
                                placeholder="********" required="required">
                            <i toggle="#password" class="fa fa-fw fa-eye toggle-password field-icon"></i>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="fxt-transformY-50 fxt-transition-delay-3">
                            <div class="fxt-checkbox-area">
                                <div class="checkbox">
                                    <input id="checkbox1" type="checkbox">
                                    <label for="checkbox1">Keep me logged in</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="fxt-transformY-50 fxt-transition-delay-4">
                            <button type="submit" class="fxt-btn-fill">Register</button>
                        </div>
                    </div>
                </form>
            </div>
            <!-- <div class="fxt-style-line">
                <div class="fxt-transformY-50 fxt-transition-delay-5">
                    <h3>Or Login With</h3>
                </div>
            </div>
            <ul class="fxt-socials">
                <li class="fxt-google">
                    <div class="fxt-transformY-50 fxt-transition-delay-6">
                        <a href="#" title="google"><i class="fab fa-google-plus-g"></i><span>Google +</span></a>
                    </div>
                </li>
                <li class="fxt-twitter">
                    <div class="fxt-transformY-50 fxt-transition-delay-7">
                        <a href="#" title="twitter"><i class="fab fa-twitter"></i><span>Twitter</span></a>
                    </div>
                </li>
                <li class="fxt-facebook">
                    <div class="fxt-transformY-50 fxt-transition-delay-8">
                        <a href="#" title="Facebook"><i class="fab fa-facebook-f"></i><span>Facebook</span></a>
                    </div>
                </li>
            </ul> -->
            <div class="fxt-footer">
                <div class="fxt-transformY-50 fxt-transition-delay-9">
                    <p><a href="/login" class="switcher-text2 inline-text">Log in</a> ?Have an account</p>
                </div>
            </div>
        </div>
    </section>
    <!-- jquery-->
    <script src="js/jquery-3.5.0.min.js"></script>
    <!-- Popper js -->
    <script src="js/popper.min.js"></script>
    <!-- Bootstrap js -->
    <script src="js/bootstrap.min.js"></script>
    <!-- Imagesloaded js -->
    <script src="js/imagesloaded.pkgd.min.js"></script>
    <!-- Validator js -->
    <script src="js/validator.min.js"></script>
    <!-- Custom Js -->
    <script src="js/main.js"></script>
<script>alert("Successfully registered, redirecting you");
window.location.href= "/login";
</script>
</body>
</html>
             `);
        }
    });
    
});

app.post("/login", (req, res) => {
    var email = req.body.email;
    var pass = req.body.password;
    signup.find({email : email, password : pass}, (err, user) => {
        if(user.length>0) {
            var date = new Date();
            res.end(
                `
                <!doctype html>
<html class="no-js" lang="">

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Minecraft Alts Gen</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Favicon -->
    <link rel="shortcut icon" type="image/x-icon" href="img/favicon.png">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/bootstrap-rtl.min.css">
    <!-- Fontawesome CSS -->
    <link rel="stylesheet" href="css/fontawesome-all.min.css">
    <!-- Flaticon CSS -->
    <link rel="stylesheet" href="font/flaticon.css">
    <!-- Google Web Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">
    <!-- Custom CSS -->
   <link rel="stylesheet" href="CSS/forgot.css">
</head>

<body>
    <section class="fxt-template-animation fxt-template-layout18" data-bg-image="img/figure/bg.jpg">
        <div class="fxt-content">
            <div class="fxt-header">
                <a href="login.html" class="fxt-logo"><img src="img/logo.gif" alt="Logo" width="100" height="100"></a>
            </div>
            <div class="fxt-form">
                <p>Login into your account</p>
                <form method="POST">
                    <div class="form-group">
                        <div class="fxt-transformY-50 fxt-transition-delay-1">
                            <input type="email" id="email" class="form-control" name="email" placeholder="Email"
                                required="required">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="fxt-transformY-50 fxt-transition-delay-2">
                            <input id="password" type="password" class="form-control" name="password"
                                placeholder="********" required="required">
                            <i toggle="#password" class="fa fa-fw fa-eye toggle-password field-icon"></i>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="fxt-transformY-50 fxt-transition-delay-3">
                            <div class="fxt-checkbox-area">
                                <div class="checkbox">
                                    <input id="checkbox1" type="checkbox">
                                    <label for="checkbox1">Keep me logged in</label>
                                </div>
                                <a href="forgot-password.html" class="switcher-text">Forgot Password</a>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="fxt-transformY-50 fxt-transition-delay-4">
                            <button type="submit" class="fxt-btn-fill">Log in</button>
                        </div>
                    </div>
                </form>
            </div>
            <!-- <div class="fxt-style-line">
                <div class="fxt-transformY-50 fxt-transition-delay-5">
                    <h3>Or Login With</h3>
                </div>
            </div>
            <ul class="fxt-socials">
                <li class="fxt-google">
                    <div class="fxt-transformY-50 fxt-transition-delay-6">
                        <a href="#" title="google"><i class="fab fa-google-plus-g"></i><span>Google +</span></a>
                    </div>
                </li>
                <li class="fxt-twitter">
                    <div class="fxt-transformY-50 fxt-transition-delay-7">
                        <a href="#" title="twitter"><i class="fab fa-twitter"></i><span>Twitter</span></a>
                    </div>
                </li>
                <li class="fxt-facebook">
                    <div class="fxt-transformY-50 fxt-transition-delay-8">
                        <a href="#" title="Facebook"><i class="fab fa-facebook-f"></i><span>Facebook</span></a>
                    </div>
                </li>
            </ul> --><br>
            <div class="fxt-footer">
                <div class="fxt-transformY-50 fxt-transition-delay-9">
                    <p><a href="/signUp" class="switcher-text2 inline-text">Register</a> ?Don't have an account
                    </p>
                </div>
            </div>
        </div>
    </section>


    <!-- jquery-->
    <script src="js/jquery-3.5.0.min.js"></script>
    <!-- Popper js -->
    <script src="js/popper.min.js"></script>
    <!-- Bootstrap js -->
    <script src="js/bootstrap.min.js"></script>
    <!-- Imagesloaded js -->
    <script src="js/imagesloaded.pkgd.min.js"></script>
    <!-- Validator js -->
    <script src="js/validator.min.js"></script>
    <!-- Custom Js -->
    <script src="js/main.js"></script>
<script>
alert("successfully Logged In, Redirecting You");

localStorage.setItem("Auth", JSON.stringify({
    name : "${user[0]['name']}",
    email : "${email}",
    lastLogin : "${date.getDate()}"
}));
window.location.href="/dashboard";
</script>
</body>
</html>
                `
            )
        }
        else { 
            res.end(`
            <!doctype html>
<html class="no-js" lang="">

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Minecraft Alts Gen</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Favicon -->
    <link rel="shortcut icon" type="image/x-icon" href="img/favicon.png">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/bootstrap-rtl.min.css">
    <!-- Fontawesome CSS -->
    <link rel="stylesheet" href="css/fontawesome-all.min.css">
    <!-- Flaticon CSS -->
    <link rel="stylesheet" href="font/flaticon.css">
    <!-- Google Web Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">
    <!-- Custom CSS -->
    <style>
    html {
height: 100%;
}
body {
font-size: 16px;
font-family: 'Roboto', sans-serif;
font-weight: 400;
height: 100%;
line-height: 1.7;
vertical-align: baseline;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-rendering: optimizeLegibility;
color: #646464;
background-color: #fff;
}
p {
margin: 0 0 20px 0;
color: #646464;
}
h1,
h2,
h3,
h4,
h5,
h6 {
font-weight: 400;
font-family: 'Roboto', sans-serif;
margin: 0 0 20px 0;
color: #111;
}
h1,
h2 {
line-height: 1.2;
}
h3,
h4,
h5,
h6 {
line-height: 1.4;
}
h1 {
font-size: 36px;
}
@media only screen and (max-width: 1199px) {
h1 {
font-size: 34px;
}
}
@media only screen and (max-width: 991px) {
h1 {
font-size: 32px;
}
}
@media only screen and (max-width: 767px) {
h1 {
font-size: 30px;
}
}
h2 {
font-size: 28px;
}
@media only screen and (max-width: 1199px) {
h2 {
font-size: 26px;
}
}
@media only screen and (max-width: 991px) {
h2 {
font-size: 24px;
}
}
@media only screen and (max-width: 767px) {
h2 {
font-size: 22px;
}
}
h3 {
font-size: 22px;
}
@media only screen and (max-width: 991px) {
h3 {
font-size: 20px;
}
}
@media only screen and (max-width: 767px) {
h3 {
font-size: 18px;
}
}
h4 {
font-size: 20px;
}
@media only screen and (max-width: 991px) {
h4 {
font-size: 18px;
}
}
@media only screen and (max-width: 767px) {
h4 {
font-size: 16px;
}
}
h5 {
font-size: 18px;
}
@media only screen and (max-width: 991px) {
h5 {
font-size: 16px;
}
}
/*=======================================================================
Default Style
=========================================================================*/
a {
text-decoration: none;
}
a:active,
a:hover,
a:focus {
text-decoration: none;
}
a:active,
a:hover,
a:focus {
outline: 0 none;
}
img {
max-width: 100%;
height: auto;
}
ul {
list-style: outside none none;
margin: 0;
padding: 0;
}
.fxt-content-between {
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
-webkit-box-pack: justify;
-ms-flex-pack: justify;
justify-content: space-between;
-ms-flex-wrap: wrap;
flex-wrap: wrap;
}
@media only screen and (max-width: 767px) {
.fxt-none-767 {
display: none !important;
}
}
@media only screen and (max-width: 991px) {
.fxt-none-991 {
display: none !important;
}
}
/*========================================================================
Template Animation
=========================================================================*/
.fxt-template-animation {
position: relative;
z-index: 1;
width: 100%;
opacity: 0;
overflow: hidden;
-webkit-transition: all 0.3s ease-in-out;
-o-transition: all 0.3s ease-in-out;
transition: all 0.3s ease-in-out;
}
.fxt-template-animation .fxt-transformY-50 {
opacity: 0;
-webkit-transform: translateY(50px);
-ms-transform: translateY(50px);
transform: translateY(50px);
}
.loaded.fxt-template-animation {
opacity: 1;
}
.loaded.fxt-template-animation .fxt-transformY-50 {
-webkit-transform: translateY(0);
-ms-transform: translateY(0);
transform: translateY(0);
opacity: 1;
-webkit-transition: all 1s ease-in-out;
-o-transition: all 1s ease-in-out;
transition: all 1s ease-in-out;
}
.loaded.fxt-template-animation .fxt-transition-delay-1 {
-webkit-transition-delay: 0.1s;
-o-transition-delay: 0.1s;
transition-delay: 0.1s;
}
.loaded.fxt-template-animation .fxt-transition-delay-2 {
-webkit-transition-delay: 0.2s;
-o-transition-delay: 0.2s;
transition-delay: 0.2s;
}
.loaded.fxt-template-animation .fxt-transition-delay-3 {
-webkit-transition-delay: 0.3s;
-o-transition-delay: 0.3s;
transition-delay: 0.3s;
}
.loaded.fxt-template-animation .fxt-transition-delay-4 {
-webkit-transition-delay: 0.4s;
-o-transition-delay: 0.4s;
transition-delay: 0.4s;
}
.loaded.fxt-template-animation .fxt-transition-delay-5 {
-webkit-transition-delay: 0.5s;
-o-transition-delay: 0.5s;
transition-delay: 0.5s;
}
.loaded.fxt-template-animation .fxt-transition-delay-6 {
-webkit-transition-delay: 0.6s;
-o-transition-delay: 0.6s;
transition-delay: 0.6s;
}
.loaded.fxt-template-animation .fxt-transition-delay-7 {
-webkit-transition-delay: 0.7s;
-o-transition-delay: 0.7s;
transition-delay: 0.7s;
}
.loaded.fxt-template-animation .fxt-transition-delay-8 {
-webkit-transition-delay: 0.8s;
-o-transition-delay: 0.8s;
transition-delay: 0.8s;
}
.loaded.fxt-template-animation .fxt-transition-delay-9 {
-webkit-transition-delay: 0.9s;
-o-transition-delay: 0.9s;
transition-delay: 0.9s;
}
.loaded.fxt-template-animation .fxt-transition-delay-10 {
-webkit-transition-delay: 1s;
-o-transition-delay: 1s;
transition-delay: 1s;
}
.loaded.fxt-template-animation .fxt-transition-delay-11 {
-webkit-transition-delay: 1.1s;
-o-transition-delay: 1.1s;
transition-delay: 1.1s;
}
.loaded.fxt-template-animation .fxt-transition-delay-12 {
-webkit-transition-delay: 1.2s;
-o-transition-delay: 1.2s;
transition-delay: 1.2s;
}
.loaded.fxt-template-animation .fxt-transition-delay-13 {
-webkit-transition-delay: 1.3s;
-o-transition-delay: 1.3s;
transition-delay: 1.3s;
}
.loaded.fxt-template-animation .fxt-transition-delay-14 {
-webkit-transition-delay: 1.4s;
-o-transition-delay: 1.4s;
transition-delay: 1.4s;
}
.loaded.fxt-template-animation .fxt-transition-delay-15 {
-webkit-transition-delay: 1.5s;
-o-transition-delay: 1.5s;
transition-delay: 1.5s;
}
.loaded.fxt-template-animation .fxt-transition-delay-16 {
-webkit-transition-delay: 1.6s;
-o-transition-delay: 1.6s;
transition-delay: 1.6s;
}
.loaded.fxt-template-animation .fxt-transition-delay-17 {
-webkit-transition-delay: 1.7s;
-o-transition-delay: 1.7s;
transition-delay: 1.7s;
}
.loaded.fxt-template-animation .fxt-transition-delay-18 {
-webkit-transition-delay: 1.8s;
-o-transition-delay: 1.8s;
transition-delay: 1.8s;
}
.loaded.fxt-template-animation .fxt-transition-delay-19 {
-webkit-transition-delay: 1.9s;
-o-transition-delay: 1.9s;
transition-delay: 1.9s;
}
.loaded.fxt-template-animation .fxt-transition-delay-20 {
-webkit-transition-delay: 2s;
-o-transition-delay: 2s;
transition-delay: 2s;
}

/*========================================================================
Login/Register Layout
=========================================================================*/
.fxt-template-layout18 {
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
-webkit-box-pack: center;
-ms-flex-pack: center;
justify-content: center;
width: 100%;
background-repeat: no-repeat;
background-position: center;
background-size: cover;
position: relative;
min-height: 100vh;
z-index: 1;
padding: 15px;
}
.fxt-template-layout18:before {
content: "";
height: 100%;
width: 100%;
background-color: rgba(0, 0, 0, 0.1);
left: 0;
top: 0;
position: absolute;
z-index: -1;
}
.fxt-template-layout18 .fxt-checkbox-area {
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
-webkit-box-pack: justify;
-ms-flex-pack: justify;
justify-content: space-between;
margin-bottom: 30px;
-ms-flex-wrap: wrap;
flex-wrap: wrap;
}
.fxt-template-layout18 .fxt-content {
max-width: 600px;
width: 100%;
background-color: rgba(0, 0, 0, 0.8);
padding: 80px 80px 60px;
}
@media only screen and (max-width: 767px) {
.fxt-template-layout18 .fxt-content {
padding: 70px 60px 50px;
}
}
@media only screen and (max-width: 575px) {
.fxt-template-layout18 .fxt-content {
padding: 60px 40px 40px;
}
}
@media only screen and (max-width: 479px) {
.fxt-template-layout18 .fxt-content {
padding: 50px 20px 30px;
}
}
.fxt-template-layout18 .fxt-header {
text-align: center;
margin-bottom: 50px;
}
.fxt-template-layout18 .fxt-logo {
display: block;
margin-bottom: 100px;
margin-left: auto;
margin-right: auto;
max-width: 40vw;
}
@media only screen and (max-width: 991px) {
.fxt-template-layout18 .fxt-logo {
margin-bottom: 80px;
}
}
@media only screen and (max-width: 767px) {
.fxt-template-layout18 .fxt-logo {
margin-bottom: 60px;
}
}
@media only screen and (max-width: 575px) {
.fxt-template-layout18 .fxt-logo {
margin-bottom: 40px;
}
}
.fxt-template-layout18 .fxt-form p {
font-size: 20px;
color: #fff;
}
@media only screen and (max-width: 767px) {
.fxt-template-layout18 .fxt-form p {
text-align: center;
}
}
.fxt-template-layout18 .fxt-form .form-group {
position: relative;
z-index: 1;
}
.fxt-template-layout18 .fxt-form .form-group .field-icon {
position: absolute;
z-index: 1;
left: 19px;
bottom: 18px;
font-size: 14px;
color: #bebebe;
}
.fxt-template-layout18 .fxt-form .form-group .field-icon:before {
padding: 17px 10px;
}
.fxt-template-layout18 .fxt-form .form-control {
min-height: 50px;
-webkit-box-shadow: none;
box-shadow: none;
border: 1px solid rgba(255, 255, 255, 0.3);
padding: 10px 15px;
background-color: transparent;
color: #fff;
}
.fxt-template-layout18 .fxt-form input::-webkit-input-placeholder {
color: #bebebe;
font-size: 18px;
font-weight: 300;
}
.fxt-template-layout18 .fxt-form input::-moz-placeholder {
color: #bebebe;
font-size: 18px;
font-weight: 300;
}
.fxt-template-layout18 .fxt-form input:-moz-placeholder {
color: #bebebe;
font-size: 18px;
font-weight: 300;
}
.fxt-template-layout18 .fxt-form input:-ms-input-placeholder {
color: #bebebe;
font-size: 18px;
font-weight: 300;
}
.fxt-template-layout18 .fxt-btn-fill {
font-family: 'Roboto', sans-serif;
cursor: pointer;
display: inline-block;
font-size: 17px;
font-weight: 500;
-webkit-box-shadow: none;
box-shadow: none;
outline: none;
border: 0;
color: #fff;
border-radius: 3px;
background-color: #1fbe66;
padding: 10px 36px;
margin-bottom: 10px;
width: 100%;
-webkit-transition: all 0.3s ease-in-out;
-o-transition: all 0.3s ease-in-out;
transition: all 0.3s ease-in-out;
}
.fxt-template-layout18 .fxt-btn-fill:hover {
background-color: #17a156;
border-color: #17a156;
}
.fxt-template-layout18 .fxt-btn-fill:focus {
outline: none;
}
.fxt-template-layout18 .switcher-text {
color: #d4d4d4;
text-decoration: underline;
font-size: 15px;
margin-bottom: 5px;
display: block;
-webkit-transition: all 0.3s ease-in-out;
-o-transition: all 0.3s ease-in-out;
transition: all 0.3s ease-in-out;
}
.fxt-template-layout18 .switcher-text:hover {
color: #ffffff;
}
.fxt-template-layout18 .switcher-text2 {
color: #d4d4d4;
text-decoration: underline;
font-size: 15px;
display: inline-block;
-webkit-transition: all 0.3s ease-in-out;
-o-transition: all 0.3s ease-in-out;
transition: all 0.3s ease-in-out;
}
.fxt-template-layout18 .switcher-text2.inline-text {
margin-right: 3px;
}
.fxt-template-layout18 .switcher-text2:hover {
color: #ffffff;
}
.fxt-template-layout18 .fxt-style-line {
overflow: hidden;
text-align: center;
}
.fxt-template-layout18 .fxt-style-line h3 {
text-align: center;
font-weight: 300;
margin-bottom: 30px;
font-size: 20px;
color: #a4a4a4;
display: inline-block;
position: relative;
padding: 0 25px;
z-index: 1;
}
.fxt-template-layout18 .fxt-style-line h3:before {
display: inline-block;
content: "";
height: 1px;
width: 100%;
background-color: #a4a4a4;
left: 100%;
top: 50%;
-webkit-transform: translateY(-50%);
-ms-transform: translateY(-50%);
transform: translateY(-50%);
position: absolute;
z-index: 1;
}
.fxt-template-layout18 .fxt-style-line h3:after {
display: inline-block;
content: "";
height: 1px;
width: 100%;
background-color: #a4a4a4;
right: 100%;
top: 50%;
-webkit-transform: translateY(-50%);
-ms-transform: translateY(-50%);
transform: translateY(-50%);
position: absolute;
z-index: 1;
}
.fxt-template-layout18 ul.fxt-socials {
display: -ms-flexbox;
display: -webkit-box;
display: flex;
-ms-flex-wrap: wrap;
flex-wrap: wrap;
-webkit-box-pack: center;
-ms-flex-pack: center;
justify-content: center;
margin-right: -5px;
margin-left: -5px;
margin-bottom: 20px;
}
.fxt-template-layout18 ul.fxt-socials li {
max-width: 100%;
-webkit-box-flex: 0;
-ms-flex: 0 0 33.33333%;
flex: 0 0 33.33333%;
padding-left: 5px;
padding-right: 5px;
margin-bottom: 10px;
}
@media only screen and (max-width: 575px) {
.fxt-template-layout18 ul.fxt-socials li {
-webkit-box-flex: 0;
-ms-flex: 0 0 50%;
flex: 0 0 50%;
}
}
@media only screen and (max-width: 350px) {
.fxt-template-layout18 ul.fxt-socials li {
-webkit-box-flex: 0;
-ms-flex: 0 0 100%;
flex: 0 0 100%;
}
}
.fxt-template-layout18 ul.fxt-socials li a {
border-radius: 2px;
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
-webkit-box-pack: flex-start;
-ms-flex-pack: flex-start;
justify-content: flex-start;
font-size: 14px;
height: 45px;
color: #ffffff;
-webkit-transition: all 0.3s ease-in-out;
-o-transition: all 0.3s ease-in-out;
transition: all 0.3s ease-in-out;
}
.fxt-template-layout18 ul.fxt-socials li a i {
border-radius: 2px 0 0 2px;
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
-webkit-box-pack: center;
-ms-flex-pack: center;
justify-content: center;
width: 45px;
height: 45px;
}
.fxt-template-layout18 ul.fxt-socials li a span {
height: 100%;
width: 100%;
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
-webkit-box-pack: center;
-ms-flex-pack: center;
justify-content: center;
-webkit-box-flex: 1;
-ms-flex: 1;
flex: 1;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-facebook a {
background-color: #3b5998;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-facebook a i {
background-color: #4867aa;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-facebook a:hover {
background-color: #5676bb;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-twitter a {
background-color: #00acee;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-twitter a i {
background-color: #33ccff;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-twitter a:hover {
background-color: #3dc5f3;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-google a {
background-color: #CC3333;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-google a i {
background-color: #db4437;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-google a:hover {
background-color: #e75042;
}
.fxt-template-layout18 .checkbox {
padding-right: 5px;
margin-left: 30px;
margin-bottom: 5px;
}
.fxt-template-layout18 .checkbox label {
padding-right: 20px;
color: #b9b9b9;
margin-bottom: 0;
font-size: 15px;
position: relative;
}
.fxt-template-layout18 .checkbox label:before {
content: "";
position: absolute;
width: 16px;
height: 16px;
top: 4px;
right: 0;
margin-right: -5px;
border: 1px solid;
border-color: #dcdcdc;
border-radius: 2px;
background-color: transparent;
-webkit-transition: border 0.15s ease-in-out, color 0.15s ease-in-out;
-o-transition: border 0.15s ease-in-out, color 0.15s ease-in-out;
transition: border 0.15s ease-in-out, color 0.15s ease-in-out;
}
.fxt-template-layout18 .checkbox label:after {
position: absolute;
margin-right: -20px;
padding-right: 3px;
font-size: 10px;
color: #555555;
}
.fxt-template-layout18 .checkbox input[type="checkbox"] {
display: none;
}
.fxt-template-layout18 .checkbox input[type="checkbox"]:checked + label::after {
font-family: 'Font Awesome 5 Free';
content: "\f00c";
font-weight: 900;
color: #ffffff;
right: 15px;
top: 4px;
}
.fxt-template-layout18 .checkbox input[type="checkbox"]:checked + label::before {
background-color: #1fbe66;
border-color: #1fbe66;
}
.fxt-template-layout18 .fxt-footer {
text-align: center;
}
.fxt-template-layout18 .fxt-footer p {
color: #b6b6b6;
}
</style>
</head>

<body>
    <section class="fxt-template-animation fxt-template-layout18" data-bg-image="img/figure/bg.jpg">
        <div class="fxt-content">
            <div class="fxt-header">
                <a href="login.html" class="fxt-logo"><img src="img/logo.gif" alt="Logo" width="100" height="100"></a>
            </div>
            <div class="fxt-form">
                <p>Login into your account</p>
                <form method="POST">
                    <div class="form-group">
                        <div class="fxt-transformY-50 fxt-transition-delay-1">
                            <input type="email" id="email" class="form-control" name="email" placeholder="Email"
                                required="required">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="fxt-transformY-50 fxt-transition-delay-2">
                            <input id="password" type="password" class="form-control" name="password"
                                placeholder="********" required="required">
                            <i toggle="#password" class="fa fa-fw fa-eye toggle-password field-icon"></i>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="fxt-transformY-50 fxt-transition-delay-3">
                            <div class="fxt-checkbox-area">
                                <div class="checkbox">
                                    <input id="checkbox1" type="checkbox">
                                    <label for="checkbox1">Keep me logged in</label>
                                </div>
                                <a href="/resetPassword" class="switcher-text">Forgot Password</a>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="fxt-transformY-50 fxt-transition-delay-4">
                            <button type="submit" class="fxt-btn-fill">Log in</button>
                        </div>
                    </div>
                </form>
            </div>
            <!-- <div class="fxt-style-line">
                <div class="fxt-transformY-50 fxt-transition-delay-5">
                    <h3>Or Login With</h3>
                </div>
            </div>
            <ul class="fxt-socials">
                <li class="fxt-google">
                    <div class="fxt-transformY-50 fxt-transition-delay-6">
                        <a href="#" title="google"><i class="fab fa-google-plus-g"></i><span>Google +</span></a>
                    </div>
                </li>
                <li class="fxt-twitter">
                    <div class="fxt-transformY-50 fxt-transition-delay-7">
                        <a href="#" title="twitter"><i class="fab fa-twitter"></i><span>Twitter</span></a>
                    </div>
                </li>
                <li class="fxt-facebook">
                    <div class="fxt-transformY-50 fxt-transition-delay-8">
                        <a href="#" title="Facebook"><i class="fab fa-facebook-f"></i><span>Facebook</span></a>
                    </div>
                </li>
            </ul> --><br>
            <div class="fxt-footer">
                <div class="fxt-transformY-50 fxt-transition-delay-9">
                    <p><a href="/signUp" class="switcher-text2 inline-text">Register</a> ?Don't have an account
                    </p>
                </div>
            </div>
        </div>
    </section>


    <!-- jquery-->
    <script src="js/jquery-3.5.0.min.js"></script>
    <!-- Popper js -->
    <script src="js/popper.min.js"></script>
    <!-- Bootstrap js -->
    <script src="js/bootstrap.min.js"></script>
    <!-- Imagesloaded js -->
    <script src="js/imagesloaded.pkgd.min.js"></script>
    <!-- Validator js -->
    <script src="js/validator.min.js"></script>
    <!-- Custom Js -->
    <script src="js/main.js"></script>
<script>
alert("Invalid Login Details!");
</script>
</body>
</html>
            `);
        }
    })
});

app.get("/reportProblem", (req, res) => {
    res.sendFile(__dirname+"/public/report-problem.html");
});
app.post("/reportProblem", (req, res) => {
    var data = new problems(req.body);
    console.log(req.body);
    data.save();
    res.end(`
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Report Problem</title>
    <!-- Bootstrap CDN -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
      crossorigin="anonymous"
    />
    <!-- FontAwesome Icon cdn -->
    <link
      rel="stylesheet"
      href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
      integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
      crossorigin="anonymous"
    />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <!-- Custom CSS -->
    <link rel="stylesheet" href="CSS/report-problem.css" />
  </head>
  <body>
    <!-- Navbar start here -->
    <nav class="navbar navbar-expand-lg navbar-dark shadow">
      <div class="container">
        <a class="navbar-brand fs-3 fw-bold" href="#">Report A Problem</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav ms-auto text-center">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/dashboard"
                >Dashbaord</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/freeGenerator">Generators</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/aboutUs">About Us</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/login">Login/Sign Up</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- Navbar end here -->
    <main
      id="generate-field"
      class="container d-flex justify-content-center mt-5"
    >
      <form method="post" class="generator row justify-content-between w-100 rounded-3 p-3">
        <div class="col-md-7">
          <div class="title">
            <h4 class="fw-bold text-light text-center">
              Any Problem?, We'll ,Fix It.
            </h4>
          </div>
          <div class="input-container p-3">
            <i class="fas fa-user ico me-2" aria-hidden="true"></i>
            <input
              class="input-field"
              maxlength="100"
              size="40"
              autocomplete="off"
              placeholder="Your Name"
              type="text"
              placeholder="Username"
              id="input1"
              name="name"
              required
            />
          </div>
          <div class="input-container p-3">
            <i class="fas fa-envelope ico ico me-2" aria-hidden="true"></i>
            <input
              class="input-field"
              maxlength="100"
              size="40"
              type="email"
              autocomplete="off"
              placeholder="Your Email Address"
              type="text"
              placeholder="Username"
              name="email"
              id="input2"
              required
            />
          </div>
          <div class="input-container p-3">
            <input
              class="input-field"
              maxlength="100"
              size="40"
              autocomplete="off"
              type="text"
              placeholder="Your Problem Is related To?"
              name="topic"
              id="input3"
              required
            />
          </div>
          <div class="input-container p-3">
            <input
              class="input-field"
              maxlength="500"
              size="40"
              autocomplete="off"
              placeholder="Explain Your Problem"
              type="text"
              name="problem"
              id="input4"
              required
            />
          </div>
          <button class="btn btn-success w-100 mt-3">Submit Problem</button>
        </div>
        <div class="col-md-4 mt-5 mt-md-0">
          <h3 class="fw-bold text-center text-light">Our Commitment</h3>
          <div class="account-history rounded-3" id="accss">
            <h5 class="text-center text-light">
              <br><br>
              We Will Fix Your Problem Within 24 Hours Of Submission.
            </h5>
          </div>
        </div>
      </form>
    </main>

    <!-- Bootstrap JS bundle -->
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
      crossorigin="anonymous"
    ></script>  
    <script>
    alert("Your Problem Was Submitted, We Will Take Action Within 24 Hours");
    </script>
    </body>
</html>

    `)
});
app.get("/freeGenerator", (req, res) => {
    res.sendFile(__dirname+"/public/generator.html");
});
app.post("/freeGenerator", (req, res) => {
    acc.find({}, (err, accs) => {
        if(err) {
            res.end("Sorry But Your Request Was Not Fullfilled");     // Improvement
        }
        else {
            var i = accs.length;
            var ran = (Math.random() * (i-1));
            ran = ran.toFixed(0);
            var ourUser = accs[ran];
            var email = ourUser['email'];
            console.log("yes");
            var password = ourUser['pass'];
            res.end(`
            <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Alt Generator</title>
    <!-- Bootstrap CDN -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
      crossorigin="anonymous"
    />
    <!-- FontAwesome Icon cdn -->
    <link
      rel="stylesheet"
      href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
      integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
      crossorigin="anonymous"
    />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/style.css" />
  </head>
  <body onload="loadBody()">
    <!-- Navbar start here -->
    <nav class="navbar navbar-expand-lg navbar-dark shadow">
      <div class="container">
        <a class="navbar-brand fs-3 fw-bold" href="#">Alt-Generator</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav ms-auto text-center">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/dashboard"
                >Dashbaord</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/freeGenerator">Generators</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/aboutUs">About Us</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/login">Login/Sign Up</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- Navbar end here -->
    <main
      id="generate-field"
      class="container d-flex justify-content-center mt-5"
    >
      <div class="generator row justify-content-between w-100 rounded-3 p-3">
        <div class="col-md-7">
          <div class="title">
            <h4 class="fw-bold text-light text-center">
              Free Minecraft Account
            </h4>
            <i
              class="fas fa-exchange-alt ms-4"
              style="font-size: 2em; color: #fff"
            ></i>
          </div>
          <div class="input-container p-3">
            <i class="fas fa-user ico me-2" aria-hidden="true"></i>
            <input
              class="input-field"
              maxlength="100"
              size="40"
              readonly="readonly"
              autocomplete="off"
              value="Steve"
              type="text"
              placeholder="Username"
              id="input1"
              name="name"
            />
            <button title="Copy Username"  onclick="copy1()" class="copy-button" type="button">
              <i class="fas fa-copy" aria-hidden="true"></i>
            </button>
          </div>
          <div class="input-container p-3">
            <i class="fas fa-envelope ico ico me-2" aria-hidden="true"></i>
            <input
              class="input-field"
              maxlength="100"
              size="40"
              readonly="readonly"
              autocomplete="off"
              value="${email}"
              type="text"
              placeholder="Username"
              name="name"
              id="input2"
            />
            <button title="Copy Username"  onclick="copy2()" class="copy-button" type="button">
              <i class="fas fa-copy" aria-hidden="true"></i>
            </button>
          </div>
          <div class="input-container p-3">
            <i class="fas fa-lock ico ico me-2" aria-hidden="true"></i>
            <input
              class="input-field"
              maxlength="100"
              size="40"
              readonly="readonly"
              autocomplete="off"
              value="${password}"
              type="text"
              placeholder="Username"
              name="name"
              id="input3"
            />
            <button title="Copy Username"  onclick="copy3()" class="copy-button" type="button">
              <i class="fas fa-copy" aria-hidden="true"></i>
            </button>
          </div>
          <div class="input-container p-3">
            <i class="fas fa-database ico ico me-2" aria-hidden="true"></i>
            <input
              class="input-field"
              maxlength="100"
              size="40"
              readonly="readonly"
              autocomplete="off"
              value="${email}:${password}"
              type="text"
              placeholder="Username"
              name="name"
              id="input4"
            />
            <button title="Copy Username" onclick="copy4()" class="copy-button" type="button">
              <i class="fas fa-copy" aria-hidden="true"></i>
            </button>
          </div>
          <button class="btn btn-success w-100 mt-3" onclick="reloadPage()">Refresh</button>
        </div>
        <div class="col-md-4 mt-5 mt-md-0">
          <h3 class="fw-bold text-center text-light">Account History</h3>
          <div class="account-history rounded-3">
            <h5 class="text-center text-light">
              Generate accounts to see them here!
            </h5>
          </div>
        </div>
      </div>
    </main>

    <!-- Bootstrap JS bundle -->
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
      crossorigin="anonymous"
    ></script>
    <script>
    function loadBody() {
        var accsarr = JSON.parse(localStorage.getItem("lastGenerate"));
        if(accsarr===null) {
          accsarr = [];
          localStorage.setItem("lastGenerate", JSON.stringify(accsarr));
        }
        var reqs = localStorage.getItem("today-num");
        if(reqs>=15) {
          alert("Your Per Day Generating Limit Reached!, You Cannot Generate More Accounts!");
          window.location.href="/dashboard";
        }
      document.getElementById("input1").disabled = "true";
      document.getElementById("input2").disabled = "true";
      document.getElementById("input3").disabled = "true";
      document.getElementById("input4").disabled = "true";
      }
      function generate() {
        loadBody();
        var reqs = localStorage.getItem("today-num");
        if(reqs<=14) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        console.log("sended!");
  };
  xhttp.open("POST", "/freeGenerator", true);
  xhttp.send();
} else {
  alert("Your Per Day Generating Limit Reached!, You Cannot Generate More Accounts!");
}
      }
var todayNum = localStorage.getItem("today-num");
todayNum++;
localStorage.setItem("today-num", todayNum);
var totalNum = localStorage.getItem("total-num");
totalNum++;
localStorage.setItem("total-num", totalNum);
function reloadPage() {
    window.location.href="/freeGenerator";
}
function copy1() {
     
    navigator.clipboard.writeText("Steve");
    alert("Copied!");
  }
  function copy2() {
    alert("Copied!");
    navigator.clipboard.writeText("${email}");
  }
  function copy3() {
    alert("Copied!");
    navigator.clipboard.writeText("${password}");
  }
  function copy4() {
    alert("Copied!");
    navigator.clipboard.writeText("${email}:${password}");d
  }
var arr = JSON.parse(localStorage.getItem("lastGenerate"));
console.log(arr);
arr.push("${email}:${password}");
localStorage.setItem("lastGenerate", JSON.stringify(arr));
    </script>
  </body>
</html>

            `);
            console.log("yes2");
        }
    });
});
app.get("/aboutUs", (req, res) => {
    res.sendFile(__dirname+"/public/aboutUs.html");
});
app.post("/resetPassword", (req, res) => {
    var data = req.body.email;
    signup.find({email: data}, (err, user) => {
        if(user.length==1) {
            var Password = user[0]['password'];
            var mailopt = {
                from : "educationalmirchi@gmail.com",
                to : ""+data+"",
                subject : "Your Lost Password",
                text : `Your Password Is ${Password}, Remember It. ~ From Minecraft Als Generator`
            }
            emailsender.sendMail(mailopt, (err, info) => {
                if(err) {
                    res.end("Sorry But Something Went Wrong!");
                }
                else {
                    res.end(`
                    <!doctype html>
<html class="no-js" lang="">

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Minecraft Alts</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Favicon -->
    <link rel="shortcut icon" type="image/x-icon" href="img/favicon.png">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/bootstrap-rtl.min.css">
    <!-- Fontawesome CSS -->
    <link rel="stylesheet" href="css/fontawesome-all.min.css">
    <!-- Flaticon CSS -->
    <link rel="stylesheet" href="font/flaticon.css">
    <!-- Google Web Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">
    <!-- Custom CSS -->
    <style>
        html {
  height: 100%;
}
body {
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  height: 100%;
  line-height: 1.7;
  vertical-align: baseline;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  color: #646464;
  background-color: #fff;
}
p {
  margin: 0 0 20px 0;
  color: #646464;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 400;
  font-family: 'Roboto', sans-serif;
  margin: 0 0 20px 0;
  color: #111;
}
h1,
h2 {
  line-height: 1.2;
}
h3,
h4,
h5,
h6 {
  line-height: 1.4;
}
h1 {
  font-size: 36px;
}
@media only screen and (max-width: 1199px) {
  h1 {
    font-size: 34px;
  }
}
@media only screen and (max-width: 991px) {
  h1 {
    font-size: 32px;
  }
}
@media only screen and (max-width: 767px) {
  h1 {
    font-size: 30px;
  }
}
h2 {
  font-size: 28px;
}
@media only screen and (max-width: 1199px) {
  h2 {
    font-size: 26px;
  }
}
@media only screen and (max-width: 991px) {
  h2 {
    font-size: 24px;
  }
}
@media only screen and (max-width: 767px) {
  h2 {
    font-size: 22px;
  }
}
h3 {
  font-size: 22px;
}
@media only screen and (max-width: 991px) {
  h3 {
    font-size: 20px;
  }
}
@media only screen and (max-width: 767px) {
  h3 {
    font-size: 18px;
  }
}
h4 {
  font-size: 20px;
}
@media only screen and (max-width: 991px) {
  h4 {
    font-size: 18px;
  }
}
@media only screen and (max-width: 767px) {
  h4 {
    font-size: 16px;
  }
}
h5 {
  font-size: 18px;
}
@media only screen and (max-width: 991px) {
  h5 {
    font-size: 16px;
  }
}
/*=======================================================================
    Default Style
=========================================================================*/
a {
  text-decoration: none;
}
a:active,
a:hover,
a:focus {
  text-decoration: none;
}
a:active,
a:hover,
a:focus {
  outline: 0 none;
}
img {
  max-width: 100%;
  height: auto;
}
ul {
  list-style: outside none none;
  margin: 0;
  padding: 0;
}
.fxt-content-between {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
@media only screen and (max-width: 767px) {
  .fxt-none-767 {
    display: none !important;
  }
}
@media only screen and (max-width: 991px) {
  .fxt-none-991 {
    display: none !important;
  }
}
/*========================================================================
    Template Animation
=========================================================================*/
.fxt-template-animation {
  position: relative;
  z-index: 1;
  width: 100%;
  opacity: 0;
  overflow: hidden;
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
.fxt-template-animation .fxt-transformY-50 {
  opacity: 0;
  -webkit-transform: translateY(50px);
  -ms-transform: translateY(50px);
  transform: translateY(50px);
}
.loaded.fxt-template-animation {
  opacity: 1;
}
.loaded.fxt-template-animation .fxt-transformY-50 {
  -webkit-transform: translateY(0);
  -ms-transform: translateY(0);
  transform: translateY(0);
  opacity: 1;
  -webkit-transition: all 1s ease-in-out;
  -o-transition: all 1s ease-in-out;
  transition: all 1s ease-in-out;
}
.loaded.fxt-template-animation .fxt-transition-delay-1 {
  -webkit-transition-delay: 0.1s;
  -o-transition-delay: 0.1s;
  transition-delay: 0.1s;
}
.loaded.fxt-template-animation .fxt-transition-delay-2 {
  -webkit-transition-delay: 0.2s;
  -o-transition-delay: 0.2s;
  transition-delay: 0.2s;
}
.loaded.fxt-template-animation .fxt-transition-delay-3 {
  -webkit-transition-delay: 0.3s;
  -o-transition-delay: 0.3s;
  transition-delay: 0.3s;
}
.loaded.fxt-template-animation .fxt-transition-delay-4 {
  -webkit-transition-delay: 0.4s;
  -o-transition-delay: 0.4s;
  transition-delay: 0.4s;
}
.loaded.fxt-template-animation .fxt-transition-delay-5 {
  -webkit-transition-delay: 0.5s;
  -o-transition-delay: 0.5s;
  transition-delay: 0.5s;
}
.loaded.fxt-template-animation .fxt-transition-delay-6 {
  -webkit-transition-delay: 0.6s;
  -o-transition-delay: 0.6s;
  transition-delay: 0.6s;
}
.loaded.fxt-template-animation .fxt-transition-delay-7 {
  -webkit-transition-delay: 0.7s;
  -o-transition-delay: 0.7s;
  transition-delay: 0.7s;
}
.loaded.fxt-template-animation .fxt-transition-delay-8 {
  -webkit-transition-delay: 0.8s;
  -o-transition-delay: 0.8s;
  transition-delay: 0.8s;
}
.loaded.fxt-template-animation .fxt-transition-delay-9 {
  -webkit-transition-delay: 0.9s;
  -o-transition-delay: 0.9s;
  transition-delay: 0.9s;
}
.loaded.fxt-template-animation .fxt-transition-delay-10 {
  -webkit-transition-delay: 1s;
  -o-transition-delay: 1s;
  transition-delay: 1s;
}
.loaded.fxt-template-animation .fxt-transition-delay-11 {
  -webkit-transition-delay: 1.1s;
  -o-transition-delay: 1.1s;
  transition-delay: 1.1s;
}
.loaded.fxt-template-animation .fxt-transition-delay-12 {
  -webkit-transition-delay: 1.2s;
  -o-transition-delay: 1.2s;
  transition-delay: 1.2s;
}
.loaded.fxt-template-animation .fxt-transition-delay-13 {
  -webkit-transition-delay: 1.3s;
  -o-transition-delay: 1.3s;
  transition-delay: 1.3s;
}
.loaded.fxt-template-animation .fxt-transition-delay-14 {
  -webkit-transition-delay: 1.4s;
  -o-transition-delay: 1.4s;
  transition-delay: 1.4s;
}
.loaded.fxt-template-animation .fxt-transition-delay-15 {
  -webkit-transition-delay: 1.5s;
  -o-transition-delay: 1.5s;
  transition-delay: 1.5s;
}
.loaded.fxt-template-animation .fxt-transition-delay-16 {
  -webkit-transition-delay: 1.6s;
  -o-transition-delay: 1.6s;
  transition-delay: 1.6s;
}
.loaded.fxt-template-animation .fxt-transition-delay-17 {
  -webkit-transition-delay: 1.7s;
  -o-transition-delay: 1.7s;
  transition-delay: 1.7s;
}
.loaded.fxt-template-animation .fxt-transition-delay-18 {
  -webkit-transition-delay: 1.8s;
  -o-transition-delay: 1.8s;
  transition-delay: 1.8s;
}
.loaded.fxt-template-animation .fxt-transition-delay-19 {
  -webkit-transition-delay: 1.9s;
  -o-transition-delay: 1.9s;
  transition-delay: 1.9s;
}
.loaded.fxt-template-animation .fxt-transition-delay-20 {
  -webkit-transition-delay: 2s;
  -o-transition-delay: 2s;
  transition-delay: 2s;
}

/*========================================================================
    Login/Register Layout
=========================================================================*/
.fxt-template-layout18 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  min-height: 100vh;
  z-index: 1;
  padding: 15px;
}
.fxt-template-layout18:before {
  content: "";
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  left: 0;
  top: 0;
  position: absolute;
  z-index: -1;
}
.fxt-template-layout18 .fxt-checkbox-area {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-bottom: 30px;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
.fxt-template-layout18 .fxt-content {
  max-width: 600px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 80px 80px 60px;
}
@media only screen and (max-width: 767px) {
  .fxt-template-layout18 .fxt-content {
    padding: 70px 60px 50px;
  }
}
@media only screen and (max-width: 575px) {
  .fxt-template-layout18 .fxt-content {
    padding: 60px 40px 40px;
  }
}
@media only screen and (max-width: 479px) {
  .fxt-template-layout18 .fxt-content {
    padding: 50px 20px 30px;
  }
}
.fxt-template-layout18 .fxt-header {
  text-align: center;
  margin-bottom: 50px;
}
.fxt-template-layout18 .fxt-logo {
  display: block;
  margin-bottom: 100px;
  margin-left: auto;
  margin-right: auto;
  max-width: 40vw;
}
@media only screen and (max-width: 991px) {
  .fxt-template-layout18 .fxt-logo {
    margin-bottom: 80px;
  }
}
@media only screen and (max-width: 767px) {
  .fxt-template-layout18 .fxt-logo {
    margin-bottom: 60px;
  }
}
@media only screen and (max-width: 575px) {
  .fxt-template-layout18 .fxt-logo {
    margin-bottom: 40px;
  }
}
.fxt-template-layout18 .fxt-form p {
  font-size: 20px;
  color: #fff;
}
@media only screen and (max-width: 767px) {
  .fxt-template-layout18 .fxt-form p {
    text-align: center;
  }
}
.fxt-template-layout18 .fxt-form .form-group {
  position: relative;
  z-index: 1;
}
.fxt-template-layout18 .fxt-form .form-group .field-icon {
  position: absolute;
  z-index: 1;
  left: 19px;
  bottom: 18px;
  font-size: 14px;
  color: #bebebe;
}
.fxt-template-layout18 .fxt-form .form-group .field-icon:before {
  padding: 17px 10px;
}
.fxt-template-layout18 .fxt-form .form-control {
  min-height: 50px;
  -webkit-box-shadow: none;
  box-shadow: none;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 10px 15px;
  background-color: transparent;
  color: #fff;
}
.fxt-template-layout18 .fxt-form input::-webkit-input-placeholder {
  color: #bebebe;
  font-size: 18px;
  font-weight: 300;
}
.fxt-template-layout18 .fxt-form input::-moz-placeholder {
  color: #bebebe;
  font-size: 18px;
  font-weight: 300;
}
.fxt-template-layout18 .fxt-form input:-moz-placeholder {
  color: #bebebe;
  font-size: 18px;
  font-weight: 300;
}
.fxt-template-layout18 .fxt-form input:-ms-input-placeholder {
  color: #bebebe;
  font-size: 18px;
  font-weight: 300;
}
.fxt-template-layout18 .fxt-btn-fill {
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  display: inline-block;
  font-size: 17px;
  font-weight: 500;
  -webkit-box-shadow: none;
  box-shadow: none;
  outline: none;
  border: 0;
  color: #fff;
  border-radius: 3px;
  background-color: #1fbe66;
  padding: 10px 36px;
  margin-bottom: 10px;
  width: 100%;
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
.fxt-template-layout18 .fxt-btn-fill:hover {
  background-color: #17a156;
  border-color: #17a156;
}
.fxt-template-layout18 .fxt-btn-fill:focus {
  outline: none;
}
.fxt-template-layout18 .switcher-text {
  color: #d4d4d4;
  text-decoration: underline;
  font-size: 15px;
  margin-bottom: 5px;
  display: block;
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
.fxt-template-layout18 .switcher-text:hover {
  color: #ffffff;
}
.fxt-template-layout18 .switcher-text2 {
  color: #d4d4d4;
  text-decoration: underline;
  font-size: 15px;
  display: inline-block;
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
.fxt-template-layout18 .switcher-text2.inline-text {
  margin-right: 3px;
}
.fxt-template-layout18 .switcher-text2:hover {
  color: #ffffff;
}
.fxt-template-layout18 .fxt-style-line {
  overflow: hidden;
  text-align: center;
}
.fxt-template-layout18 .fxt-style-line h3 {
  text-align: center;
  font-weight: 300;
  margin-bottom: 30px;
  font-size: 20px;
  color: #a4a4a4;
  display: inline-block;
  position: relative;
  padding: 0 25px;
  z-index: 1;
}
.fxt-template-layout18 .fxt-style-line h3:before {
  display: inline-block;
  content: "";
  height: 1px;
  width: 100%;
  background-color: #a4a4a4;
  left: 100%;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  position: absolute;
  z-index: 1;
}
.fxt-template-layout18 .fxt-style-line h3:after {
  display: inline-block;
  content: "";
  height: 1px;
  width: 100%;
  background-color: #a4a4a4;
  right: 100%;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  position: absolute;
  z-index: 1;
}
.fxt-template-layout18 ul.fxt-socials {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-right: -5px;
  margin-left: -5px;
  margin-bottom: 20px;
}
.fxt-template-layout18 ul.fxt-socials li {
  max-width: 100%;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 33.33333%;
  flex: 0 0 33.33333%;
  padding-left: 5px;
  padding-right: 5px;
  margin-bottom: 10px;
}
@media only screen and (max-width: 575px) {
  .fxt-template-layout18 ul.fxt-socials li {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 50%;
    flex: 0 0 50%;
  }
}
@media only screen and (max-width: 350px) {
  .fxt-template-layout18 ul.fxt-socials li {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 100%;
    flex: 0 0 100%;
  }
}
.fxt-template-layout18 ul.fxt-socials li a {
  border-radius: 2px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: flex-start;
  -ms-flex-pack: flex-start;
  justify-content: flex-start;
  font-size: 14px;
  height: 45px;
  color: #ffffff;
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
.fxt-template-layout18 ul.fxt-socials li a i {
  border-radius: 2px 0 0 2px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  width: 45px;
  height: 45px;
}
.fxt-template-layout18 ul.fxt-socials li a span {
  height: 100%;
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-facebook a {
  background-color: #3b5998;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-facebook a i {
  background-color: #4867aa;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-facebook a:hover {
  background-color: #5676bb;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-twitter a {
  background-color: #00acee;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-twitter a i {
  background-color: #33ccff;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-twitter a:hover {
  background-color: #3dc5f3;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-google a {
  background-color: #CC3333;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-google a i {
  background-color: #db4437;
}
.fxt-template-layout18 ul.fxt-socials li.fxt-google a:hover {
  background-color: #e75042;
}
.fxt-template-layout18 .checkbox {
  padding-right: 5px;
  margin-left: 30px;
  margin-bottom: 5px;
}
.fxt-template-layout18 .checkbox label {
  padding-right: 20px;
  color: #b9b9b9;
  margin-bottom: 0;
  font-size: 15px;
  position: relative;
}
.fxt-template-layout18 .checkbox label:before {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  top: 4px;
  right: 0;
  margin-right: -5px;
  border: 1px solid;
  border-color: #dcdcdc;
  border-radius: 2px;
  background-color: transparent;
  -webkit-transition: border 0.15s ease-in-out, color 0.15s ease-in-out;
  -o-transition: border 0.15s ease-in-out, color 0.15s ease-in-out;
  transition: border 0.15s ease-in-out, color 0.15s ease-in-out;
}
.fxt-template-layout18 .checkbox label:after {
  position: absolute;
  margin-right: -20px;
  padding-right: 3px;
  font-size: 10px;
  color: #555555;
}
.fxt-template-layout18 .checkbox input[type="checkbox"] {
  display: none;
}
.fxt-template-layout18 .checkbox input[type="checkbox"]:checked + label::after {
  font-family: 'Font Awesome 5 Free';
  content: "\f00c";
  font-weight: 900;
  color: #ffffff;
  right: 15px;
  top: 4px;
}
.fxt-template-layout18 .checkbox input[type="checkbox"]:checked + label::before {
  background-color: #1fbe66;
  border-color: #1fbe66;
}
.fxt-template-layout18 .fxt-footer {
  text-align: center;
}
.fxt-template-layout18 .fxt-footer p {
  color: #b6b6b6;
}
    </style>
</head>

<body>
    <section class="fxt-template-animation fxt-template-layout18" data-bg-image="img/figure/bg2.png">
        <div class="fxt-content">
            <div class="fxt-header">
                <a href="login.html" class="fxt-logo"><img src="img/logo.gif" alt="Logo" width="100" height="100"></a>
            </div>
            <div class="fxt-form">
                <p>Recover your password</p>
                <form method="POST">
                    <div class="form-group">
                        <div class="fxt-transformY-50 fxt-transition-delay-1">
                            <input type="email" id="email" class="form-control" name="email" placeholder="Email"
                                required="required">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="fxt-transformY-50 fxt-transition-delay-4">
                            <button type="submit" class="fxt-btn-fill">Send Me Email</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="fxt-footer">
                <div class="fxt-transformY-50 fxt-transition-delay-9">
                    <p><a href="/signUp" class="switcher-text2 inline-text">Register</a> ?Don't have an account
                    </p>
                </div>
            </div>
        </div>
    </section>
    <!-- jquery-->
    <script src="js/jquery-3.5.0.min.js"></script>
    <!-- Popper js -->
    <script src="js/popper.min.js"></script>
    <!-- Bootstrap js -->
    <script src="js/bootstrap.min.js"></script>
    <!-- Imagesloaded js -->
    <script src="js/imagesloaded.pkgd.min.js"></script>
    <!-- Validator js -->
    <script src="js/validator.min.js"></script>
    <!-- Custom Js -->
    <script src="js/main.js"></script>
<script>
alert("Mail has been Sent to the given email!");
</script>
</body>

</html>
                    `)
                }
            })
        }
    })
})