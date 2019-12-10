var express = require("express");
var router = express.Router();
var Project = require("../models/project");
var User = require("../models/user");
var passport = require("passport");
var API_KEY = process.env.API_KEY;
var DOMAIN = process.env.DOMAIN;
var mailgun = require('mailgun-js')({
    apiKey: API_KEY, 
    domain: DOMAIN,
    host: "api.eu.mailgun.net"
});
var middlewareObject = require("../middleware");

// INDEX route
router.get("/", function(req, res){
    // get all projects from DB
    Project.find({}).sort({"_id":-1}).exec(function(err, projects){
       if(err){
           console.log(err);
       } else {
           res.render("index", {projects:projects});
       }
    });
});

//================
// AUTH ROUTES
//================

// REGISTER ROUTE
// router.get("/register", function(req,res){
//     res.render("register");
// });

// router.post("/register", function(req, res){
//     var newUser = new User({
//         username: req.body.username
//     });
//     User.register(newUser, req.body.password, function(err, user){
//         if(err){
//             console.log(err);
//             return res.render("register");
//         }
//         passport.authenticate("local")(req, res, function(){
//             res.redirect("/");
//         });
//     });
// });


// LOGIN ROUTES
router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
   successRedirect: "/",
   failureRedirect: "/login"
}),
    function(req, res){
    // res.send("Logging you in...........");
});


// LOGOUT ROUTE
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

// CONTACT FORM ROUTE
router.post("/send", middlewareObject.checkEmailValidity, function(req, res){
    var output = "<p>You have a new contact request.</p>"+
        "<h3>Details:</h3>"+
        "<ul>"+
            "<li>Name: "+ req.body.email.name +"</li>"+
            "<li>Email: "+ req.body.email.email +"</li>"+
        "</ul>"+
        "<h3>Message: "+ "</h3>" +
        "<p>"+req.body.email.message + "</p>";

    
    var mailOptions = {
        to: process.env.EMAIL_TO,
        from: 'Portfolio Contact <'+process.env.EMAIL_FROM+'>',
        subject: "Contact Request from Portfolio by " + req.body.email.name,
        html: output
    }
    
    mailgun.messages().send(mailOptions, function(err, body){
        if(err){
            console.log("Message NOT sent due to ERROR");
            console.log(err);
            req.flash("email_error", "Message not sent due to error.");
        } else {
            console.log("Message sent"); 
            console.log(body);
            req.flash("email_success", "Message sent!");
        }
        res.redirect("/#contact");
    });
});

module.exports = router;