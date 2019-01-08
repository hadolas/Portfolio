var express = require("express"),
    router = express.Router(),
    Project = require("../models/project"),
    middlewareObject = require("../middleware"),
    multer = require("multer"),
    cloudinary = require("cloudinary"),
    sanitizeHtml = require("sanitize-html");

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
            return res.redirect("back");
        }
        req.body.project.image = result.secure_url;
        req.body.project.imageId = result.public_id;
        // create and save newly created project to DB
        // req.body.project.post = sanitizeHtml(req.body.project.post);
        
        // req.body.project.post = sanitizeHtml(req.body.project.post, {
        //     allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ])
        // });        
        req.body.project.post = sanitizeHtml(req.body.project.post, {
            allowedTags: ['strong', 'em', 'img', 'p', 'a', 'div'],
            allowedAttributes: {
                'a':['href'],
                'img': ['src']
            },
            allowedClasses:{
                'p': ['caption']
            }
        });
        Project.create(req.body.project, function(err, project){
            if(err){
                req.flash("project_error", "Something went wrong. Project could not be added to portfolio.");
            } else {
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
router.put("/portfolio/:id", middlewareObject.isLoggedIn, upload.single('image'), function(req, res){
    req.body.project.post = sanitizeHtml(req.body.project.post, {
        allowedTags: ['strong', 'em', 'img', 'p', 'a', 'div', 'h2', 'h3', 'h4', 'br', 'ul', 'li'],
        allowedAttributes: {
            'a':['href'],
            'img': ['src']
        },
        allowedClasses:{
            'p': ['caption'],
            'div': ['width50']
        }
    });
    Project.findById(req.params.id, async function(err, project){
        if(err){
            req.flash("project_update_error", "Something went wrong. Could not update project.")
        } else {
            if(req.file){
                try {
                    await cloudinary.v2.uploader.destroy(project.imageId)
                    var result = await cloudinary.v2.uploader.upload(req.file.path)
                    project.imageId = result.public_id;
                    project.image = result.secure_url;
                } catch(err) {
                    req.flash("project_update_error", "Something went wrong. Could not update project.")
                    return res.redirect("/portfolio/"+req.params.id);
                }
            }
            project.title = req.body.project.title;
            project.github = req.body.project.github;
            project.summary = req.body.project.summary;
            project.post = req.body.project.post;
            project.save();
            req.flash("project_update_success", "Project updated!");
        }
        res.redirect("/portfolio/"+req.params.id);
    });
});


// DESTROY ROUTE
router.delete("/portfolio/:id", middlewareObject.isLoggedIn, function(req, res){
    Project.findById(req.params.id, async function(err, project){
        if(err){
            req.flash("project_error", "Something went wrong. Project not deleted.");
            return res.redirect("/#portfolio");
        } 
        try {
            await cloudinary.v2.uploader.destroy(project.imageId);
            project.remove();
            req.flash("project_success", "Project deleted.");
            res.redirect("/#portfolio");
        } catch(err) {
            req.flash("project_error", "Something went wrong. Project not deleted.")
            return res.redirect("/#portfolio");
        }
   }); 
});

module.exports = router;