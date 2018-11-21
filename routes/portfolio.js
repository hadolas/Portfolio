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


// EDIT ROUTE
router.get("/portfolio/:id/edit", middlewareObject.isLoggedIn, function(req, res) {
   Project.findById(req.params.id, function(err, result){
       if(err){
           console.log(err);
       } else {
           res.render("editProject", {project:result});
       }
   }); 
});


// UPDATE ROUTE
router.put("/portfolio/:id", middlewareObject.isLoggedIn, function(req, res){
    Project.findByIdAndUpdate(req.params.id, req.body.project, function(err, result){
        if(err){
            console.log(err);
            res.redirect("/");
        } else {
            res.redirect("/portfolio/"+req.params.id);
        }
    });
});


// DESTROY ROUTE
router.delete("/portfolio/:id", function(req, res){
   Project.findByIdAndRemove(req.params.id, function(err){
       if(err){
           console.log(err);
       } else {
           res.redirect("/#portfolio");
       }
   }); 
});

module.exports = router;