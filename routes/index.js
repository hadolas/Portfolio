var express = require("express");
var router = express.Router();
var Project = require("../models/project");
var User = require("../models/user");
var passport = require("passport");
var nodemailer = require("nodemailer");

// INDEX route
router.get("/", function(req, res){
    // get all projects from DB
    Project.find({}, function(err, projects){
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
router.post("/send", function(req, res){

    var output = "<p>You have a new contact request.</p>"+
        "<h3>Details:</h3>"+
        "<ul>"+
            "<li>Name: "+ req.body.email.name +"</li>"+
            "<li>Email: "+ req.body.email.email +"</li>"+
        "</ul>"+
        "<h3>Message: "+ "</h3>" +
        "<p>"+req.body.email.message + "</p>";
    
    var transporter = nodemailer.createTransport({
        service: "Gmail",
        auth : {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });
    
    var mailOptions = {
        to: process.env.EMAIL,
        from: '"Portfolio Contact" <process.env.EMAIL>',
        subject: "Contact Request from Portfolio",
        html: output
    }
    
    // BACK-END EMAIL VALIDATION
    var regex= /.+@.+/;
    var match = regex.exec(req.body.email.email);
    
    Project.find({}, function(err, projects) {
        if(err){
            console.log(err);
        } else {
            // If the email DOESN'T match the regex then:
            if(!match){
                console.log("Message NOT sent due to INVALID EMAIL ADDRESS");
            } else {
            // If the email DOES match the regex then: 
                transporter.sendMail(mailOptions, function(err){
                    if(err){
                        return console.log("Message NOT sent due to ERROR");
                    }
                    console.log("Message Sent");
                });
            }
        }
        res.render("index", {projects:projects});
    });
});

module.exports = router;