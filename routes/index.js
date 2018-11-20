var express = require("express");
var router = express.Router();
var Project = require("../models/project");
var User = require("../models/user");
var passport = require("passport");

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
})

module.exports = router;