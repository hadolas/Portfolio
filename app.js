var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/portfolio");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));

// Project Schema
var projectSchema = new mongoose.Schema({
    title: String,
    image: String,
    summary: String
});

// Compile Project Schema into Model
var Project = mongoose.model("Project", projectSchema);


// INDEX route
app.get("/", function(req, res){
    // get all projects from DB
    Project.find({}, function(err, projects){
       if(err){
           console.log(err);
       } else {
           res.render("index", {projects:projects});
       }
    });
});

// NEW route
app.get("/portfolio/new", function(req, res){
    res.render("newProject.ejs");
})

// CREATE route
app.post("/", function(req, res){
    // get data from newProject form
    var title = req.body.title;
    var image = req.body.image;
    var summary = req.body.summary;
    var newProject = {title:title, image:image, summary:summary};
    // create and save newly created project to DB
    Project.create(newProject, function(err, project){
        if(err){
            console.log(err);
        } else {
            console.log(project);
            res.redirect("/#portfolio");     
        }
    });
});

// SHOW route
app.get("/portfolio/:id", function(req, res) {
   res.render("show"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Portfolio server running");
});