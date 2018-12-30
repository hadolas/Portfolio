var express = require("express"),
    router = express.Router(),
    Project = require("../models/project"),
    middlewareObject = require("../middleware"),
    multer = require("multer"),
    cloudinary = require("cloudinary");

var storage = multer.diskStorage({
   filename: function(req, file, callback){
       console.log(file);
       callback(null, Date.now() + file.originalname);
   }
});

var checkUploadIsImage = function(req, file, callback){
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return callback(new Error("Only image files can be uploaded."), false);
    }
    callback(null, true);
};

var upload = multer({storage:storage, fileFilter:checkUploadIsImage});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// NEW route
router.get("/portfolio/new", middlewareObject.isLoggedIn, function(req, res){
    res.render("newProject.ejs");
});

// CREATE route
router.post("/portfolio", middlewareObject.isLoggedIn, upload.single("image"), function(req, res){
    cloudinary.v2.uploader.upload(req.file.path, function(err, result){
        if(err){
            console.log(err)
            return res.redirect("back");
        }
        console.log(result);
        req.body.project.image = result.secure_url;
        // create and save newly created project to DB
        Project.create(req.body.project, function(err, project){
            if(err){
                req.flash("project_error", "Something went wrong. Project could not be added to portfolio.")
                console.log(err);
            } else {
                console.log(project);
                req.flash("project_success", "Successfully added project to portfolio!!");
            }
            res.redirect("/#portfolio");
        }); 
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
            req.flash("project_update_error", "Something went wrong. Could not update project.")
        } else {
            console.log("updated");
            req.flash("project_update_success", "Project updated!");
            // res.redirect("/portfolio/"+req.params.id);
        }
        res.redirect("/portfolio/"+req.params.id);
    });
});


// DESTROY ROUTE
router.delete("/portfolio/:id", middlewareObject.isLoggedIn, function(req, res){
   Project.findByIdAndRemove(req.params.id, function(err){
       if(err){
           console.log(err);
           req.flash("project_error", "Something went wrong. Project not deleted.");
       } else {
           req.flash("project_success", "Project deleted.");
       }
       res.redirect("/#portfolio");
   }); 
});

module.exports = router;