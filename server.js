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
        pass : "Shaguftanaz@1234"
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
    <link rel="shortcut icon" type="image/x-icon" href="IMG/favicon.png">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="CSS/bootstrap-rtl.min.css">
    <!-- Fontawesome CSS -->
    <link rel="stylesheet" href="CSS/fontawesome-all.min.css">
    <!-- Flaticon CSS -->
    <link rel="stylesheet" href="font/flaticon.css">
    <!-- Google Web Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="CSS/loginSystem.css">
</head>

<body>
    <section class="fxt-template-animation fxt-template-layout18" data-bg-image="IMG/figure/bg1.png">
        <div class="fxt-content">
            <div class="fxt-header">
                <a href="/login" class="fxt-logo"><img src="IMG/logo.gif" alt="Logo" width="100" height="100"></a>
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
    <script src="JS/jquery-3.5.0.min.js"></script>
    <!-- Popper js -->
    <!-- <script src="js/popper.min.js"></script> -->
    <!-- Bootstrap js -->
    <script src="JS/bootstrap.min.js"></script>
    <!-- Imagesloaded js -->
    <script src="JS/imagesloaded.pkgd.min.js"></script>
    <!-- Validator js -->
    <!-- <script src="js/validator.min.js"></script> -->
    <!-- Custom Js -->
    <script src="JS/main.js"></script>
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
    <link rel="shortcut icon" type="image/x-icon" href="IMG/favicon.png">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="CSS/bootstrap-rtl.min.css">
    <!-- Fontawesome CSS -->
    <link rel="stylesheet" href="CSS/fontawesome-all.min.css">
    <!-- Flaticon CSS -->
    <link rel="stylesheet" href="font/flaticon.css">
    <!-- Google Web Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="CSS/loginSystem.css">
</head>

<body>
    <section class="fxt-template-animation fxt-template-layout18" data-bg-image="IMG/figure/bg1.png">
        <div class="fxt-content">
            <div class="fxt-header">
                <a href="/login" class="fxt-logo"><img src="IMG/logo.gif" alt="Logo" width="100" height="100"></a>
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
    <script src="JS/jquery-3.5.0.min.js"></script>
    <!-- Popper js -->
    <!-- <script src="js/popper.min.js"></script> -->
    <!-- Bootstrap js -->
    <script src="JS/bootstrap.min.js"></script>
    <!-- Imagesloaded js -->
    <script src="JS/imagesloaded.pkgd.min.js"></script>
    <!-- Validator js -->
    <!-- <script src="js/validator.min.js"></script> -->
    <!-- Custom Js -->
    <script src="JS/main.js"></script>
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
                `<!doctype html>
<html class="no-js" lang="">

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Minecraft Alts Gen</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Favicon -->
    <link rel="shortcut icon" type="image/x-icon" href="IMG/favicon.png">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="CSS/bootstrap-rtl.min.css">
    <!-- Fontawesome CSS -->
    <link rel="stylesheet" href="CSS/fontawesome-all.min.css">
    <!-- Flaticon CSS -->
    <link rel="stylesheet" href="font/flaticon.css">
    <!-- Google Web Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="CSS/loginSystem.css">
</head>

<body>
    <section class="fxt-template-animation fxt-template-layout18" data-bg-image="IMG/figure/bg.jpg">
        <div class="fxt-content">
            <div class="fxt-header">
                <a href="/login" class="fxt-logo"><img src="IMG/logo.gif" alt="Logo" width="100" height="100"></a>
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
            </ul> -->
            <div class="fxt-footer">
                <div class="fxt-transformY-50 fxt-transition-delay-9">
                    <p><a href="/signup" class="switcher-text2 inline-text">Register</a> ?Don't have an account
                    </p>
                </div>
            </div>
        </div>
    </section>


    <!-- jquery-->
    <script src="JS/jquery-3.5.0.min.js"></script>
    <!-- Popper js -->
    <!-- <script src="js/popper.min.js"></script> -->
    <!-- Bootstrap js -->
    <script src="JS/bootstrap.min.js"></script>
    <!-- Imagesloaded js -->
    <script src="JS/imagesloaded.pkgd.min.js"></script>
    <!-- Validator js -->
    <!-- <script src="js/validator.min.js"></script> -->
    <!-- Custom Js -->
    <script src="JS/main.js"></script>
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
    <link rel="shortcut icon" type="image/x-icon" href="IMG/favicon.png">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="CSS/bootstrap-rtl.min.css">
    <!-- Fontawesome CSS -->
    <link rel="stylesheet" href="CSS/fontawesome-all.min.css">
    <!-- Flaticon CSS -->
    <link rel="stylesheet" href="font/flaticon.css">
    <!-- Google Web Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="CSS/loginSystem.css">
</head>

<body>
    <section class="fxt-template-animation fxt-template-layout18" data-bg-image="IMG/figure/bg.jpg">
        <div class="fxt-content">
            <div class="fxt-header">
                <a href="/login" class="fxt-logo"><img src="IMG/logo.gif" alt="Logo" width="100" height="100"></a>
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
            </ul> -->
            <div class="fxt-footer">
                <div class="fxt-transformY-50 fxt-transition-delay-9">
                    <p><a href="/signup" class="switcher-text2 inline-text">Register</a> ?Don't have an account
                    </p>
                </div>
            </div>
        </div>
    </section>


    <!-- jquery-->
    <script src="JS/jquery-3.5.0.min.js"></script>
    <!-- Popper js -->
    <!-- <script src="js/popper.min.js"></script> -->
    <!-- Bootstrap js -->
    <script src="JS/bootstrap.min.js"></script>
    <!-- Imagesloaded js -->
    <script src="JS/imagesloaded.pkgd.min.js"></script>
    <!-- Validator js -->
    <!-- <script src="js/validator.min.js"></script> -->
    <!-- Custom Js -->
    <script src="JS/main.js"></script>
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
    <link rel="shortcut icon" type="image/x-icon" href="IMG/favicon.png">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="CSS/bootstrap-rtl.min.css">
    <!-- Fontawesome CSS -->
    <link rel="stylesheet" href="CSS/fontawesome-all.min.css">
    <!-- Flaticon CSS -->
    <link rel="stylesheet" href="font/flaticon.css">
    <!-- Google Web Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="CSS/loginSystem.css">
</head>

<body>
    <section class="fxt-template-animation fxt-template-layout18" data-bg-image="IMG/figure/bg2.png">
        <div class="fxt-content">
            <div class="fxt-header">
                <a href="/login" class="fxt-logo"><img src="IMG/logo.gif" alt="Logo" width="100" height="100"></a>
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
                    <p><a href="/signup" class="switcher-text2 inline-text">Register</a> ?Don't have an account
                    </p>
                </div>
            </div>
        </div>
    </section>
    <!-- jquery-->
    <script src="JS/jquery-3.5.0.min.js"></script>
    <!-- Popper js -->
    <!-- <script src="JS/popper.min.js"></script> -->
    <!-- Bootstrap js -->
    <script src="JS/bootstrap.min.js"></script>
    <!-- Imagesloaded js -->
    <script src="JS/imagesloaded.pkgd.min.js"></script>
    <!-- Validator js -->
    <!-- <script src="JS/validator.min.js"></script> -->
    <!-- Custom Js -->
    <script src="JS/main.js"></script>
    <script>
    alert("Sorry But Something Went Wrong");
    window.location.href="/resetPassword";
    </body>
    </html>
    
                    `);
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
    <link rel="shortcut icon" type="image/x-icon" href="IMG/favicon.png">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="CSS/bootstrap-rtl.min.css">
    <!-- Fontawesome CSS -->
    <link rel="stylesheet" href="CSS/fontawesome-all.min.css">
    <!-- Flaticon CSS -->
    <link rel="stylesheet" href="font/flaticon.css">
    <!-- Google Web Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="CSS/loginSystem.css">
</head>

<body>
    <section class="fxt-template-animation fxt-template-layout18" data-bg-image="IMG/figure/bg2.png">
        <div class="fxt-content">
            <div class="fxt-header">
                <a href="/login" class="fxt-logo"><img src="IMG/logo.gif" alt="Logo" width="100" height="100"></a>
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
                    <p><a href="/signup" class="switcher-text2 inline-text">Register</a> ?Don't have an account
                    </p>
                </div>
            </div>
        </div>
    </section>
    <!-- jquery-->
    <script src="JS/jquery-3.5.0.min.js"></script>
    <!-- Popper js -->
    <!-- <script src="JS/popper.min.js"></script> -->
    <!-- Bootstrap js -->
    <script src="JS/bootstrap.min.js"></script>
    <!-- Imagesloaded js -->
    <script src="JS/imagesloaded.pkgd.min.js"></script>
    <!-- Validator js -->
    <!-- <script src="JS/validator.min.js"></script> -->
    <!-- Custom Js -->
    <script src="JS/main.js"></script>
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
