var express = require("express");
var router = express.Router();
var Project = require("../models/project");
var middlewareObject = require("../middleware")


// NEW route
router.get("/portfolio/new", middlewareObject.isLoggedIn, function(req, res){
    res.render("newProject.ejs");
});

// CREATE route
router.post("/portfolio", middlewareObject.isLoggedIn, function(req, res){
    // create and save newly created project to DB
    Project.create(req.body.project, function(err, project){
        if(err){
            console.log(err);
        } else {
            console.log(project);
            res.redirect("/#portfolio");     
        }
    });
});

// SHOW route
router.get("/portfolio/:id", function(req, res) {
    // find Project by id
    Project.findById(req.params.id, function(err, result){
        if(err){
            console.log(err);
        } else {
            res.render("show", {project:result});
        }
    });
});

module.exports = router;